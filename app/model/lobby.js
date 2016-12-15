var Config = require("../config");
var sender = require("../service/socket-messenger.js");
var gameInfo = require("../service/game-list.js");
var out = new (require("../debug.js"))(3);

function Lobby(user, gameSelection) {
    var me = this;
    this.players = [];
    this.players.push(user);
    this.gameType = gameSelection;
    this.game = null;
    this.numReady = 0;
    initGameFromSelection(gameSelection);

    this.isPublic = true;
    this.getObject = function () {
        var playerStringArr = [];
        this.players.forEach(function (player) {
            playerStringArr.push(player.getUserName());
        });
        return {
            gameType: this.gameType,
            players: playerStringArr
        }
    };
    user.setLobby(this);


    function initGameFromSelection(selection){
        gameInfo.gameList.forEach(function(game){
            if(game.getName === selection){
                var construct = game.getConstructor();
                me.game = new construct();
            }
        });
    }
}

Lobby.prototype.addPlayer = function (otherPlayer) {
    if (!this.isFull()) {
        this.players.push(otherPlayer);
        otherPlayer.setLobby(this);
        console.log("Set " + otherPlayer.getUserName() + " to a lobby");
        this.sendLobbyMessage();
    }else{
      console.log("tried to add to a full lobby");
    }
};

Lobby.prototype.sendLobbyMessage = function () {
    var getObject = this.getObject();
    this.players.forEach(function (player) {
        sender.sendPayload(player.getUserSocket(), "lobby", getObject);
    });
};

Lobby.prototype.isFull = function () {
    switch (this.gameType) {
        case "Pong":
            return this.players.length >= Config.PONG_MAX_NUM_PLAYERS;
        case "Tron":
            return this.players.length >= Config.TRON_MAX_NUM_PLAYERS;
    }
};
Lobby.prototype.broadcastChat = function (username, message) {
    this.players.forEach(function (player) {
        sender.sendPayload(player.getUserSocket(), "lobbyChat", {
            playerName: username,
            message: message
        });
    })
};
Lobby.prototype.broadcastReady = function(name){
    this.numReady++;
    this.players.forEach(function(player){
        sender.sendPayload(player.getUserSocket(), "playerReady", name);
    });
    if(this.numReady == this.players.length && this.isFull()){
        if(this.game){
            this.game.init(this.players);
            this.game.begin();
        }else{
            console.log("GAME WAS NULL");
        }
    }
};
Lobby.prototype.disconnect = function(user){
    var before = this.players.length;
    if(this.game) {
        this.game.disconnect(user);
    }
    this.players = this.players.filter(function(player){
       return player != user;
    });
    out.log("Lobby removed " + (before - this.players.length) + " players.",2);
    this.sendLobbyMessage();
};
Lobby.prototype.contains = function(name){
    this.players.forEach(function(player){
        if(player.getUserName() === name){
            return true;
        }
    });
    return false;
};

/* -------------------
 Getters and Setters
 ------------------- */

Lobby.prototype.getGameType = function () {
    return this.gameType;
};

Lobby.prototype.getLobbyType = function () {
    return this.isPublic;
};

Lobby.prototype.makePrivate = function () {
    this.isPublic = false;
};

Lobby.prototype.makePublic = function () {
    this.isPublic = true;
};

module.exports = Lobby;
