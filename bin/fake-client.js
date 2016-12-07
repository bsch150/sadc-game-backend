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
        };

        socket.on("message", function (arg) {
            console.log(arg);
        });
    }

    connect();


}());