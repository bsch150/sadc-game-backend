var GameList = require("../service/game-list.js");
var MatchMaker = require('../service/matchmaker.js');
var User = require("../model/user.js");
var SocketMessenger = require("../service/socket-messenger.js");
var HttpServerCreator = require("./http-server-helper.js");
var out = new (require("../debug.js"))(0);




function GameServer() {
    var matchMaker = new MatchMaker();
    init();
    out.log("Initializing server... ", 5);

    function init() {
        var wss = HttpServerCreator.createWebSocketServer();
        wss.on('connection', reactToConnection);
    }

    function reactToConnection(wsConnect) {
        out.log("New connection made.", 3);
        matchMaker.addToPlayerPool(new User(wsConnect, matchMaker));
        SocketMessenger.sendGameList(wsConnect, GameList.gameNames);
    }
}

module.exports = GameServer;