var gameList = [
    require("../games/pong.js"),
    require("../games/tron.js")
];
var gameNames = getNames();

function getNames(){
    var ret = [];
    for(var i = 0; i < gameList.length;i++){
        var toPush = gameList[i];
        console.log(toPush.getName);
        ret.push(toPush.getName);
    }
    return ret;
}

module.exports = {
    gameList: gameList,
    gameNames: gameNames
};