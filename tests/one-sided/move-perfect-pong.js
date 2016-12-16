/**
 * Created by s730823 on 12/15/2016.
 */
var FakeClient = require("../fake-client.js");
var helper = require("../testing-helper.js");

(function(){
    var client = new FakeClient("first"+Math.random());

    client.getSocket().on("message",function(msg){
        obj = JSON.parse(msg);
        if(obj.msg == "ballMove"){
            client.getSocket().send(JSON.stringify({
                msg:"paddleMove",
                object: obj.object.x
            }));
        }
    });
    var functions = [
        function () {
            client.quickChooseGame("Pong", true);
        },
        function(){
            client.sendScreenSizeMessage(100*Math.random(),200);
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
