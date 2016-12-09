var gamesInfo = require("./game-list.js");
var Registry = require("./socket-register.js");
var User = require("../model/user.js");
var Lobby = require("../model/lobby.js");
var sender = require("./socket-messenger.js");
var manager = require("./running-games-manager.js");

function MatchMaker() {
    this.publicLobbyPool = [];
    this.privateLobbyPool = [];
    this.playerPool = [];
}

function getLobbies() {
    //TODO: build object that contains open lobbies by gameType
}

MatchMaker.prototype.addToPlayerPool = function (player) {
    this.playerPool.forEach(function (playerInPool) {
        if (playerInPool.getUserName() == player.getUserName()) {
            return false;
        }
    });
    this.playerPool.push(player);
    return true;
};

MatchMaker.prototype.joinLobbyByGameType = function (user, gameSelection, isPublic) {
    var matchFound = false;
    var match;

    if (isPublic) {
        //TODO: CLEAN THIS UP!!!
        this.publicLobbyPool.forEach(function (lobby) {
            if (lobby.gameType === gameSelection) {
                user.getUserSocket().send("Found another player! Joining lobby.");
                lobby.addPlayer(user);
                matchFound = true;

                lobby.sendLobbyMessage();
                manager.push(lobby);
                match = lobby;
            }
        });
        if (!matchFound) {
            user.getUserSocket().send("Could not find another player. Creating new lobby.");
            var newLobby = new Lobby(user, gameSelection);
            this.publicLobbyPool.push(newLobby);

            sender.sendPayload(user.getUserSocket(), "lobby", newLobby.getObject());
        } else {
            this.publicLobbyPool = this.publicLobbyPool.filter(function (lobby) {
                return (lobby !== match) || !lobby.isFull();
            })
        }
    }
    else {
        var newLobby = new Lobby(user, gameSelection);
        sender.sendPayload(user.getUserSocket(), "lobby", newLobby.getObject());
        this.privateLobbyPool.push(newLobby);
    }


};

module.exports = MatchMaker;