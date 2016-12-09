var ReactionRegister = require("../service/reaction-register.js");
var Debug = require("../debug.js");

function User(socket, matchMaker) {
    var reactionRegister = new ReactionRegister(socket);
    var userReference = this;
    var userName = null;
    var userSocket = socket;
    var lobby = null;

    expectUsername();

    function setChatState(){
        var react = {
            msg: "lobbyChat",
            reactFunction: sendChat
        };
        reactionRegister.addReaction(react);
    }
    function sendChat(msg){
        if(lobby){
            lobby.broadcastChat(userName,msg);
        }
    }

    function expectUsername(){
        var usernameReaction = {
            msg: "username",
            reactFunction: function(username){
                userReference.setUsername(username);
                reactionRegister.removeReactionByMsg("username");
                expectSelectGame();
            }
        };
        reactionRegister.addReaction(usernameReaction);
    }
    function expectSelectGame() {
        var userProxy = this;
        var gameSelectionReaction = {
            msg: "gameSelection",
            reactFunction: function(gameName){
                matchMaker.joinGame(userReference, gameName);
                reactionRegister.removeReactionByMsg("gameSelection");
                setChatState();
            }
        };

        reactionRegister.addReaction(gameSelectionReaction);
    }

    this.setLobby = function(_lobby){
        lobby = _lobby;
    }
    this.setUsername = function(username){
       userName = username;
    }
    this.getUserName = function() {
        return userName;
    };

    this.getUserSocket = function() {
        return userSocket;
    };
}

User.prototype.getUserName = function () {
    return this.getUserName();
};

User.prototype.getUserSocket = function () {
    return this.getUserSocket();
};
User.prototype.setLobby = function(lobby){
    this.setLobby(lobby);
};


module.exports = User;