(function () {
    'use strict';

    var fs = require('fs');

    // you'll probably load configuration from config
    var cfg = {
        ssl: true,
        port: 12345,
        ssl_key: '../sadc-game-library-server/cert/ia.key',
        ssl_cert: '../sadc-game-library-server/cert/ia.crt'
    };

    var httpServ = (cfg.ssl) ? require('https') : require('http');

    var WebSocketServer = require('ws').Server;

    var app = null;

    // dummy request processing
    var processRequest = function (req, res) {
        res.writeHead(200);
        res.end('All glory to WebSockets!\n');
    };

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

    // passing or reference to web server so WS would knew port and SSL capabilities
    var wss = new WebSocketServer({server: app});

    wss.on('connection', function (wsConnect) {
        console.log("connection established with client!");
        var stusLoc = 0;
        var otherLoc = 0;

        wsConnect.on('message', function (message) {
            //name:x
            if(message.startsWith("stus")){
                stusLoc = message.substring(message.indexOf(":")+1,message.length);
                otherLoc = 375-stusLoc;
                wsConnect.send("Paddle:"+otherLoc);
            }
            console.log("Client: " + message);
        });
        var paddleX = 0.0;
        var paddleY = 0.0;
        var ballX = 0.0;
        var ballY = 0.0;
        var xChangeBy = 3;
        var yChangeBy = 3;
        wsConnect.send("Server: Suh dood, you're connected to the server!");
       // setInterval(function(){
        //    wsConnect.send("Paddle:"+paddleX+","+paddleY);
         //   paddleX += 1;
       // },100);
        setInterval(function(){
            wsConnect.send("Ball:"+ballX+","+ballY);
            ballX += xChangeBy;
            ballY += yChangeBy;
            if(ballX < 0 || ballX > 375)xChangeBy = -xChangeBy;
            if(ballY < 20 || ballY > 647){
                if(Math.abs(ballX - stusLoc) < 25){
                    yChangeBy = - yChangeBy;
                }
            }
            if(ballY < 0 || ballY > 667){
                ballX = 180;
                ballY = 333;
            }
        },1000/60)
    });

}());