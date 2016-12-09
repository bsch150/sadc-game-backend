(function () {
    var WebSocket = require('ws');

    var port = 443;
    var local = "wss://172.19.23.46:" + port;
    var remote = "wss://45.33.28.57:" + port;

    var address = local;

    function connect() {
        var socket = new WebSocket(address, {rejectUnauthorized: false});
        socket.onopen = function () {
            console.log("Sending username");
            socket.send(JSON.stringify({msg: "username", object: "testUSer"}));

            //setTimeout(null, 1000);
            var gameRequest = {
                msg: "gameSelection",
                object: "Tron"
            };
            console.log("sending selection");
            socket.send(JSON.stringify(gameRequest));
        };

        socket.on("message", function (arg) {
            console.log("Server: " + arg);
        });
    }

    connect();


}());