function GameServer(){
    var fs = require('fs');
    var MatchMaker = require('./service/matchmaker.js');
    var gameList = require("./service/game-list.js");
    var matchMaker = new MatchMaker();
    var cfg = {
        ssl: true,
        port: 443,
        ssl_key: './cert/ia.key',
        ssl_cert: './cert/ia.crt'
    };

    var httpServ = (cfg.ssl) ? require('https') : require('http');

    function reactToConnection(wsConnect){
        console.log("reacting to connection");
        wsConnect.send("welcome to the server");
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
        if (cfg.ssl) {
            console.log("Attempting to start server");
            app = httpServ.createServer({

                // providing server with  SSL key/cert
                key: fs.readFileSync(cfg.ssl_key),
                cert: fs.readFileSync(cfg.ssl_cert)

            }, processRequest).listen(cfg.port);
            console.log("Server listening on port: " + cfg.port);

        } else {
            app = httpServ.createServer(processRequest).listen(cfg.port);
            console.log("Server listening on port: " + cfg.port);
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
}


module.exports = GameServer;