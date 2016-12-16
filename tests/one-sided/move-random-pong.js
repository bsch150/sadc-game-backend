/**
 * Created by s730823 on 12/15/2016.
 */
var FakeClient = require("../fake-client.js");
var helper = require("../testing-helper.js");

(function(){
    var client = new FakeClient("second");
    var x = 100;
    var left = true;
    client.getSocket().on("message",function(msg){
       obj = JSON.parse(msg);
        if(obj.msg == "ballMove"){
            if(left)x += 5;
            else x -= 5;
            client.getSocket().send(JSON.stringify({
                msg:"paddleMove",
                object: x
            }));
            if(x > 100)left = false;
            if(x < 0)left = true;
        }
    });
    var functions = [
        function () {
            client.quickChooseGame("Pong", true);
        },
        function(){
            client.sendScreenSizeMessage(414,1000);
        },
        function () {
            client.sendChat("I am readying soon");
        },
        function() {
            client.sendReadyMessage();
        },
        function(){

        }
    ];
    helper.executeInOrderWithDelay(functions);
}());
