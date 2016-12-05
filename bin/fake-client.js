(function(){
    var WebSocket = require('ws');

    var port = 443;
    var local = "wss://localhost:"+port;
    var remote = "wss://45.33.28.57:"+port;

    var address = local;

    function connect(){
        var socket = new WebSocket(address,{rejectUnauthorized:false});
        socket.onopen = function(){
            socket.send(JSON.stringify({msg:"username",username:"testUSer"}));
        };
        socket.on('message',function(event){
            var jsonEvent = JSON.parse(event);
            console.log("recieved message: " + jsonEvent.msg);
            if(event.includes("Games")){
                socket.send("Choose:Pong");
                socket.send("Choose:Pong");
                socket.send("Choose:Pong");
            }
        })
    }
    connect();
}());