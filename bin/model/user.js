var ReactionRegister = require("../service/reaction-register.js");
var Debug = require("../debug.js");

function User(socket, matchMaker) {
    Debug.print("initializing user");
    var reactionRegister = new ReactionRegister(socket);

    var userReference = this;

    var userName = null;
    var userSocket = socket;
    var lobby = null;

    this.getUserName = function() {
        return userName;
    };

    this.getUserSocket = function() {
        return userSocket;
    };

    initializeReactions();

    function initializeReactions() {
        var usernameReaction = {
            msg: "username",
            reactFunction: setUsername
        };

        var gameSelectionReaction = {
            msg: "gameSelection",
            reactFunction: handleGameSelection
        };

        reactionRegister.addReaction(gameSelectionReaction);
        reactionRegister.addReaction(usernameReaction);
    }

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

    function setUsername(_username) {
        Debug.print("setting username: " + _username);
        reactionRegister.removeReactionByMsg("username");
        userName = _username;
    }

    function handleGameSelection(gameSelection) {
        Debug.print("gameSelection reaction function is getting called.");
        matchMaker.joinGame(userReference, gameSelection);
        reactionRegister.removeReactionByMsg("gameSelection");
        setChatState();

    }


    this.setLobby = function(_lobby){
        lobby = _lobby;
    }
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