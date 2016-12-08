(function () {
    var WebSocket = require('ws');

    var port = 443;
    var local = "wss://localhost:" + port;
    var remote = "wss://45.33.28.57:" + port;

    var address = local;

    function connect() {
        var socket = new WebSocket(address, {rejectUnauthorized: false});
        socket.onopen = function () {
            socket.send(JSON.stringify({msg: "username", object: "testUSer"}));

            //setTimeout(null, 1000);
            var gameRequest = {
                msg: "gameSelection",
                object: "Tron"
            };
            socket.send(JSON.stringify(gameRequest));
        };

        socket.on("message", function (arg) {
            console.log("Server: " + arg);
        });
    }

    connect();


}());