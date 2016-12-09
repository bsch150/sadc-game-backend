var Config = require("../config");
var sender = require("../service/socket-messenger.js");

function Lobby(user, gameSelection) {
    this.players = [];
    this.players.push(user);
    this.gameType = gameSelection;
    this.getObject = function(){
        var playerStringArr = [];
        this.players.forEach(function(player){
            playerStringArr.push(player.getUserName());
        });
        return {
            gameType: this.gameType,
            players: playerStringArr
        }
    };
    user.setLobby(this);
}

Lobby.prototype.addPlayer = function (otherPlayer) {
    if (!this.isFull()) {
        this.players.push(otherPlayer);
        otherPlayer.setLobby(this);
    }
};



Lobby.prototype.sendLobbyMessage = function(){
    var getObject = this.getObject();
    this.players.forEach(function(player){
        sender.sendPayload(player.getUserSocket(),"lobby",getObject);
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
Lobby.prototype.broadcastChat = function(username, message){
    this.players.forEach(function(player){
        sender.sendPayload(player.getUserSocket(),"lobbyChat",{
            playerName: username,
            message: message
        });
    })
};

module.exports = Lobby;