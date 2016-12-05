(function () {
    'use strict';

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