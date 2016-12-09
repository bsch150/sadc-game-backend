var GameList = require("../service/game-list.js");
var MatchMaker = require('../service/matchmaker.js');
var User = require("../model/user.js");
var SocketMessenger = require("../service/socket-messenger.js");
var HttpServerCreator = require("./http-server-helper.js");




function GameServer() {
    var matchMaker = new MatchMaker();
    init();

    function init() {
        var wss = HttpServerCreator.createWebSocketServer();
        wss.on('connection', reactToConnection);
    }

    function reactToConnection(wsConnect) {
        matchMaker.addToPlayerPool(new User(wsConnect, matchMaker));
        SocketMessenger.sendGameList(wsConnect, GameList.gameNames);
    }
}

module.exports = GameServer;