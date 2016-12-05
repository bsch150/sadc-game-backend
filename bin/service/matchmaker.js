var Match = require("../model/match.js");
var gamesInfo = require("./game-list.js");
var Registry = require("./socket-register.js");

function MatchMaker(){
    this.connections  = [];
    this.waitingQueue = [];

}

function chooseGame(response){
    console.log("choose game called with " + response);
}

function sendGames(socket){
    socket.send(gamesInfo.getGamesListMessage());
    Registry.registerMessagePrefix("Choose",chooseGame)
}

MatchMaker.prototype.addConnection = function(socket){
    console.log("adding connection");
    this.connections.push(socket);
    sendGames(socket);

};

module.exports = MatchMaker;