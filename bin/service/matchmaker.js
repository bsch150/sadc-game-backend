var Match = require("../model/match.js");
var gamesInfo = require("./game-list.js");
var Registry = require("./socket-register.js");
var User = require("../model/user.js");

function MatchMaker() {
    this.connectedUsers = [];
    this.waitingQueue = [];
}

function chooseGame(response) {
    console.log("choose game called with " + response);
}

function sendGames(socket, waitingQueue) {
    var before = buildGamesObject(waitingQueue);
    console.log("before: " + before);
    var obj = JSON.stringify(buildGamesObject(waitingQueue));
    console.log("sending " + obj);
    socket.send(obj);
}

function countOpenGamesForName(name, waitingQueue) {
    var ret = 0;
    waitingQueue.forEach(function (elem) {
        if (elem.getGameType() === name) {
            ret += 1;
        }
    });
    return ret;
}

function buildGamesObject(waitingQueue) {
    var names = gamesInfo.gameNames;
    var list = [];
    names.forEach(function (name) {
        list.push({gameName: name, numOfLobbies: 50});//countOpenGamesForName(name,waitingQueue)});
    });
    return {msg: "games", object: list};

}

MatchMaker.prototype.addUser = function (socket) {

};

module.exports = MatchMaker;