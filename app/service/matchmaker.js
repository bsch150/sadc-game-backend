var gamesInfo = require("./game-list.js");
var Registry = require("./socket-register.js");
var User = require("../model/user.js");
var Lobby = require("../model/lobby.js");
var sender = require("./socket-messenger.js");
var manager = require("./running-games-manager.js");

function MatchMaker() {
    var publicLobbyPool = [];
    var privateLobbyPool = [];
    var playerPool = [];

    this.getPublicLobbyPool = function () {
      return publicLobbyPool;
    }

    this.getPlayerPool = function () {
      return playerPool;
    }
    this.getPrivateLobbyPool = function () {
      return privateLobbyPool;
    }
}

MatchMaker.prototype.addToPlayerPool = function (player) {
    this.getPlayerPool().forEach(function (playerInPool) {
        if (playerInPool.getUserName() == player.getUserName()) {
            return false;
        }
    });
    this.getPlayerPool().push(player);
    return true;
};

MatchMaker.prototype.joinLobbyByGameType = function (user, gameSelection, isPublic) {
    var match;

    if (isPublic) {
      handlePublicLobbyJoin(this.getPublicLobbyPool(),user,gameSelection);
    }
    else {
        var newLobby = new Lobby(user, gameSelection);
        sender.sendPayload(user.getUserSocket(), "lobby", newLobby.getObject());
        this.getPrivateLobbyPool().push(newLobby);
    }
};

MatchMaker.prototype.searchPrivateLobbiesByUsername = function (username) {
  var retLobby = null;
  this.getPrivateLobbyPool().forEach(function(lobby){
    lobby.players.forEach(function(player){
      console.log(player.getUserName() + " -> " + username);
      if(player.getUserName() === username){
        retLobby = lobby;
      }
    });
  });
  return retLobby
};

module.exports = MatchMaker;



function handlePublicLobbyJoin(publicLobbyPool,user,gameSelection){
  var matchFound = false;
  console.log("processing " + user.getUserName());
  publicLobbyPool.forEach(function (lobby) {
    if (lobby.gameType === gameSelection && !lobby.isFull()) {
      lobby.addPlayer(user);
      console.log("Added " + user.getUserName() + " to " + lobby.getObject());
      matchFound = true;
      match = lobby;
    }
  });
  if (!matchFound) {
    var newLobby = new Lobby(user, gameSelection);
    publicLobbyPool.push(newLobby);
    sender.sendPayload(user.getUserSocket(), "lobby", newLobby.getObject());
  } else {
    publicLobbyPool= publicLobbyPool.filter(function (lobby) {
      return (lobby !== match) || !lobby.isFull();
    })
  }
}
