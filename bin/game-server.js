function GameServer(){
    var fs = require('fs');
    var MatchMaker = require('./service/matchmaker.js');
    var gameList = require("./service/game-list.js");
    var config = require('./config');
    var matchMaker = new MatchMaker();

    var httpServ = (config.sslEnabled) ? require('https') : require('http');

    function reactToConnection(wsConnect){
        console.log("reacting to connection");
        matchMaker.addConnection(wsConnect);
        /*wsConnect.on("message",function(message){
            if(message.includes("Choose")){
                var chosen = message.substring(message.indexOf(":") + 1,message.length);
                console.log("chosen : " +  chosen);
            }
        })*/
    }

    function processRequest(req,res){
        res.writeHead(200);
        res.end("what?");
    }

    function createWebSocketServer(){
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

    function init(){
        console.log("init");
        var wss = createWebSocketServer();
        wss.on('connection',reactToConnection);
    }
    init();
}

GameServer.prototype.test = function(){
    console.log("test");
};


module.exports = GameServer;