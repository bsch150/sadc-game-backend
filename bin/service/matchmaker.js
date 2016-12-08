var gamesInfo = require("./game-list.js");
var Registry = require("./socket-register.js");
var User = require("../model/user.js");
var Lobby = require("../model/lobby.js");

function MatchMaker() {
    this.lobbyPool = [];
    this.playerPool = [];
}

function getLobbies() {
    //TODO: build object that contains open lobbies by gameType
}

MatchMaker.prototype.addToPlayerPool = function (player) {
    this.playerPool.forEach(function(playerInPool){
        if(playerInPool.getUserName() == player.getUserName()) {
            return false;
        }
    });
    this.playerPool.push(player);
    return true;
};

MatchMaker.prototype.joinGame = function (user, gameSelection) {
    var matchFound = false;
    this.lobbyPool.forEach(function (lobby) {
        if (lobby.gameType === gameSelection) {
            user.getUserSocket().send("Found another player! Joining lobby.");
            lobby.addPlayer(user);
            matchFound = true;
            //TODO: send message to both players
        }
    });
    if (!matchFound) {
        user.getUserSocket().send("Could not find another player. Creating new lobby.");
        this.lobbyPool.push(new Lobby(user, gameSelection))
    }
};

module.exports = MatchMaker;