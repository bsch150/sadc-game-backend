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

function sendGames(socket,waitingQueue){
    socket.send(buildGamesString(waitingQueue));
    Registry.registerMessagePrefix(socket,"Choose",chooseGame)
}

function countOpenGamesForName(name,waitingQueue){
    var ret = 0;
    waitingQueue.forEach(function(elem){
        if(elem.getGameType() === name){
            ret += 1;
        }
    });
    return ret;
}

function buildGamesString(waitingQueue){
    var names = gamesInfo.gameNames;
    var ret = "Games:[";
    names.forEach(function(name){
        ret += name + "-" + countOpenGamesForName(name,waitingQueue)+",";
    });
    return ret + "]";

}

MatchMaker.prototype.addConnection = function(socket){
    console.log("adding connection");
    this.connections.push(socket);
    sendGames(socket,this.waitingQueue);

};

module.exports = MatchMaker;