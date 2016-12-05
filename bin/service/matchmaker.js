var Match = require("../model/match.js");
var gamesInfo = require("./game-list.js");
var Registry = require("./socket-register.js");
var User = require("../model/user.js");

function MatchMaker(){
    this.connectedUsers  = [];
    this.waitingQueue = [];
}

function chooseGame(response){
    console.log("choose game called with " + response);
}

function sendGames(socket,waitingQueue){
    socket.send(buildGamesString(waitingQueue));
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
    var users = this.connectedUsers;
    console.log("adding connection");
    sendGames(socket,this.waitingQueue);
    Registry.registerMessagePrefix(socket,"Username",function(username){
        var user = new User(username,socket);
        users.push(user);
        console.log("connectedUsers: " + users);
    })
};

module.exports = MatchMaker;