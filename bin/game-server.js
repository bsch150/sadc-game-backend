function GameServer() {
    var config = require('./config');

    var fs = require('fs');
    var httpServ = (config.sslEnabled) ? require('https') : require('http');

    var GameList = require("./service/game-list.js");

    var MatchMaker = require('./service/matchmaker.js');
    var matchMaker = new MatchMaker();

    var User = require("./model/user.js");
    var SocketMessenger = require("./service/socket-messenger.js");

    function reactToConnection(wsConnect) {
        matchMaker.addToPlayerPool(new User(wsConnect, matchMaker));
        SocketMessenger.sendGameList(wsConnect, GameList.gameNames);
    }

    function processRequest(req, res) {
        res.writeHead(200);
        res.end("what?");
    }

    function createWebSocketServer() {
        var WebSocketServer = require('ws').Server;
        var app = null;
        if (config.sslEnabled) {
            console.log("Attempting to start server");
            app = httpServ.createServer({

                // providing server with  SSL key/cert
                key: fs.readFileSync(config.sslKey),
                cert: fs.readFileSync(config.sslCert)

            }, processRequest).listen(config.serverPort);
            console.log("Server listening on port: " + config.serverPort);

        } else {
            app = httpServ.createServer(processRequest).listen(config.serverPort);
            console.log("Server listening on port: " + config.serverPort);
        }
        return new WebSocketServer({server: app});
    }

    function init() {
        console.log("init");
        var wss = createWebSocketServer();
        wss.on('connection', reactToConnection);
    }

    init();
}

module.exports = GameServer;