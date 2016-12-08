var ReactionRegister = require("../service/reaction-register.js");
var Debug = require("../debug.js");

function User(socket, matchMaker) {
    Debug.print("initializing user");
    var reactionRegister = new ReactionRegister(socket);

    var userReference = this;

    var userName = null;
    var userSocket = socket;

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

    function setUsername(_username) {
        Debug.print("setting username: " + _username);
        userName = _username;
    }

    function handleGameSelection(gameSelection) {
        Debug.print("gameSelection reaction function is getting called.")
        matchMaker.joinGame(userReference, gameSelection);
    }

    function addReaction(reaction) {
        Debug.print("Reaction is getting added to register.");
        reactionRegister.addReaction(reaction);
    }

}

User.prototype.getUserName = function () {
    return this.getUserName();
};

User.prototype.getUserSocket = function () {
    return this.getUserSocket();
};


module.exports = User;