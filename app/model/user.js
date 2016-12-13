var ReactionRegister = require("../service/reaction-register.js");
var Debug = require("../debug.js");
var LobbyNullException = require("../exceptions/lobby-null.js");
var LobbyPublicAttributeException = require("../exceptions/lobby-public-attribute");
var sender = require("../service/socket-messenger.js");

function User(socket, matchMaker) {
    var userReference = this;

    var reactionRegister = new ReactionRegister(socket);
    var userName = null;
    var userSocket = socket;
    var lobby = null;

    expectUsername();

    function setChatState() {
        var react = {
            msg: "lobbyChat",
            reactFunction: sendChat
        };
        reactionRegister.addReaction(react);
    }

    function sendChat(msg) {
        if (lobby) {
            lobby.broadcastChat(userName, msg);
        }
    }

    function expectUsername() {
        var usernameReaction = {
            msg: "username",
            reactFunction: function (username) {
                userReference.setUsername(username);
                reactionRegister.removeReactionByMsg("username");
                expectSelectGame();
                expectPlayerSearch();
            }
        };
        reactionRegister.addReaction(usernameReaction);
    }

    function expectPlayerSearch() {
      console.log("Expecting playerSearch");
      var playerSearchReaction = {
        msg: "playerSearch",
        reactFunction: function (searchName) {
          var retLobby = matchMaker.searchPrivateLobbiesByUsername(searchName);
          if(retLobby){
            retLobby.addPlayer(userReference);
            reactionRegister.removeReactionByMsg("playerSearch");
            reactionRegister.removeReactionByMsg("gameSelection");
            setChatState();
          }else{
            sender.sendPayload(userSocket,"error","No available games for that username.");
          }
        }
      };
      reactionRegister.addReaction(playerSearchReaction);
    }

    function expectSelectGame() {
        var gameSelectionReaction = {
            msg: "gameSelection",
            reactFunction: function (gameSelection) {
                matchMaker.joinLobbyByGameType(userReference, gameSelection.gameName, gameSelection.public);
                if (!lobby) {
                  console.log("Failed at " + userName);
                    throw new LobbyNullException();
                }
                else {
                    if (gameSelection.public) {
                        lobby.makePublic();
                    }
                    else if (!gameSelection.public) {
                        lobby.makePrivate();
                    }
                    else {
                        throw new LobbyPublicAttributeException();
                    }
                }

                reactionRegister.removeReactionByMsg("gameSelection");
                reactionRegister.removeReactionByMsg("playerSearch");
                setChatState();
            }
        };

        reactionRegister.addReaction(gameSelectionReaction);
    }

    this.setLobby = function (_lobby) {
        lobby = _lobby;
    };

    this.setUsername = function (username) {
        userName = username;
    };

    this.getUserName = function () {
        return userName;
    };

    this.getUserSocket = function () {
        return userSocket;
    };
}

User.prototype.getUserName = function () {
    return this.getUserName();
};

User.prototype.getUserSocket = function () {
    return this.getUserSocket();
};
User.prototype.setLobby = function (lobby) {
    this.setLobby(lobby);
};


module.exports = User;
