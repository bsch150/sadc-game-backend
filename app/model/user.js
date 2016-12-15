var ReactionRegister = require("../service/reaction-register.js");
var out = new (require("../debug.js"))(3);
var LobbyNullException = require("../exceptions/lobby-null.js");
var LobbyPublicAttributeException = require("../exceptions/lobby-public-attribute");
var sender = require("../service/socket-messenger.js");
var Mapper = require("./user-helper/dimension-mapper.js");

function User(socket, matchMaker) {
    var userReference = this;

    var reactionRegister = new ReactionRegister(socket);
    var userName = null;
    var userSocket = socket;
    userSocket.onclose = function(test){
        out.log(userName + " disconnected.",3);
        if(lobby){
            lobby.disconnect(userReference);
        }
    };
    var lobby = null;

    expectUsername();

    function setLobbyState() {
        var chatReact = {
            msg: "lobbyChat",
            reactFunction: sendChat
        };
        var readyReact = {
            msg: "playerReady",
            reactFunction: reactReady
        };
        reactionRegister.addReaction(chatReact);
        reactionRegister.addReaction(readyReact);

    }

    function sendChat(msg) {
        if (lobby) {
            lobby.broadcastChat(userName, msg);
        }
    }

    function reactReady(readyName){
        if(lobby){
            lobby.broadcastReady(readyName);
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
      out.log(userName + " expecting playerSearch",3);
      var playerSearchReaction = {
        msg: "playerSearch",
        reactFunction: function (searchName) {
          var retLobby = matchMaker.searchPrivateLobbiesByUsername(searchName);
          if(retLobby){
            retLobby.addPlayer(userReference);
            reactionRegister.removeReactionByMsg("playerSearch");
            reactionRegister.removeReactionByMsg("gameSelection");
            setLobbyState();
          }else{
            sender.sendPayload(userSocket,"error","No available games for that username.");
          }
        }
      };
      reactionRegister.addReaction(playerSearchReaction);
    }

    function expectSelectGame() {
        out.log(userName + " expecting select game",3);
        var gameSelectionReaction = {
            msg: "gameSelection",
            reactFunction: function (gameSelection){
                out.log("gameSelection " + typeof gameSelection,3);
                matchMaker.joinLobbyByGameType(userReference, gameSelection.gameName, gameSelection.isPublic);
                if (!lobby) {
                  out.log("Failed at " + userName,0);
                    throw new LobbyNullException();
                }
                else {
                    if (gameSelection.isPublic) {
                        lobby.makePublic();
                    }
                    else if (!gameSelection.isPublic) {
                        lobby.makePrivate();
                    }
                    else {
                        throw new LobbyPublicAttributeException();
                    }
                }

                reactionRegister.removeReactionByMsg("gameSelection");
                reactionRegister.removeReactionByMsg("playerSearch");
                setLobbyState();
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
    this.addReaction = function (reaction) {
        reactionRegister.addReaction(reaction);
    };
    this.removeReaction = function(string){
        reactionRegister.removeReactionByMsg(string);
    };
    this.mapper = null;
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
User.prototype.setScreenSize = function(w,h){
    this.mapper = new Mapper(w,h);
};


module.exports = User;
