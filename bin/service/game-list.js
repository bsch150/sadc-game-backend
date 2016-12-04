var gameList = [
    require("../sockets/pong-socket.js")
];
var gameNames = getNames();

function getNames(){
    var ret = [];
    for(var i = 0; i < gameList.length;i++){
        var toPush = new gameList[i]().name;
        ret.push(toPush);
    }
    return ret;
}

module.exports = {gameList,gameNames};