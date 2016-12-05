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
    socket.send(JSON.stringify(buildGamesObject(waitingQueue)));
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

function buildGamesObject(waitingQueue){
    var names = gamesInfo.gameNames;
    var list = [];
    names.forEach(function(name){
        list.push({name:name,numLobbies:countOpenGamesForName(name,waitingQueue)});
    });
    return {msg:"games",object: {games:list}};

}

MatchMaker.prototype.addConnection = function(socket){
    var users = this.connectedUsers;
    sendGames(socket,this.waitingQueue);
    Registry.registerMessagePrefix(socket,"username",function(username){
        var user = new User(username.object,socket);
        users.push(user);
    })
};

module.exports = MatchMaker;