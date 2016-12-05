(function(){
    var WebSocket = require('ws');

    var port = 443;
    var local = "wss://localhost:"+port;
    var remote = "wss://45.33.28.57:"+port;

    var address = local;

    function connect(){
        var socket = new WebSocket(address,{rejectUnauthorized:false});
        socket.on('message',function(event){
            console.log("recieved message: " + event);
            if(event.includes("Games")){
                socket.send("Choose:Pong");
                socket.send("Choose:Pong");
                socket.send("Choose:Pong");
            }
        })
    }
    connect();
}());