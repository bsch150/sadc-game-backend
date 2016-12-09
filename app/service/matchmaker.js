var gamesInfo = require("./game-list.js");
var Registry = require("./socket-register.js");
var User = require("../model/user.js");
var Lobby = require("../model/lobby.js");
var sender = require("./socket-messenger.js");
var manager = require("./running-games-manager.js");

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
    var match;
    this.lobbyPool.forEach(function (lobby) {
        if (lobby.gameType === gameSelection) {
            user.getUserSocket().send("Found another player! Joining lobby.");
            lobby.addPlayer(user);
            matchFound = true;
            //TODO: send message to both players

            lobby.sendLobbyMessage();
            manager.push(lobby);
            match = lobby;
        }
    });
    if (!matchFound) {
        user.getUserSocket().send("Could not find another player. Creating new lobby.");
        var newLobby = new Lobby(user, gameSelection);
        this.lobbyPool.push(newLobby);

        sender.sendPayload(user.getUserSocket(),"lobby",newLobby.getObject());
    }else{
        this.lobbyPool = this.lobbyPool.filter(function(lobby){
            return (lobby !== match) || !lobby.isFull();
        })
    }
};

module.exports = MatchMaker;