var Match = require("../model/match.js")
var gamesInfo = require("game-list.js")

function MatchMaker(){
    this.connections  = [];
    this.waitingQueue = [];
}

MatchMaker.prototype.addConnection(type, playerName){
    console.log("adding connection");
    this.connections.push(connect);
    for(var i = 0; i < gamesInfo.gameList.length; i++){
        if(gamesInfo.gameNames[i] == type){
            var match = new Match(new gamesInfo.gameList[i](), playerName);
            waitingQueue.push(match);
        }
    }
}

module.exports = MatchMaker;