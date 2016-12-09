var config = require("../config.js");
var fs = require('fs');
var WebSocketServer = require('ws').Server;
var httpServ = (config.sslEnabled) ? require('https') : require('http');


function processRequest(req, res) {
    res.writeHead(200);
    res.end("what?");
}

function getKeyCertObject(){
    return {
        key: fs.readFileSync(config.sslKey),
        cert: fs.readFileSync(config.sslCert)
    };
}

var HttpServerCreator = {
    createWebSocketServer: function() {
    var app = config.sslEnabled ?
            httpServ.createServer(getKeyCertObject(), processRequest) :
            httpServ.createServer(processRequest);
        app.listen(config.serverPort);
        console.log("Server listening on port: " + config.serverPort);
        return new WebSocketServer({server: app});
    }
};

module.exports = HttpServerCreator;