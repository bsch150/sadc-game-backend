var Config = require("../config");

function Lobby(user, gameSelection) {
    this.players = [];
    this.players.push(user);
    this.gameType = gameSelection;
}

Lobby.prototype.addPlayer = function (otherPlayer) {
    if (!this.isFull()) {
        this.players.push(otherPlayer);
    }
};

Lobby.prototype.isFull = function () {
    switch (this.gameType) {
        case "Pong":
            return this.players.length >= Config.PONG_MAX_NUM_PLAYERS;
        case "Tron":
            return this.players.length >= Config.TRON_MAX_NUM_PLAYERS;
    }
};

module.exports = Lobby;