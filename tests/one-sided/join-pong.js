/**
 * Created by s730823 on 12/14/2016.
 */

var FakeClient = require("../fake-client.js");
var helper = require("../testing-helper.js");

(function(){
    var client = new FakeClient("Bryan");
    var functions = [
        function(){
            client.quickChooseGame("Pong",true);
        },
        function(){
            client.sendChat("Hello big nerd");
        },
        function(){
            client.sendChat("Hello again");
        },
        function(){
            client.sendChat("Hello again 2");
        },
        function(){
            client.sendChat("Hello again 3");
        },
        function(){
          client.sendScreenSizeMessage(200,300);
        },
        function(){
            client.sendReadyMessage();
        },
        function(){
            var funcs = [];
            var x = 100;
            var slope = 5;
            for(var i = 0; i < 1000;i++){
                if(x > 308 || x < 25){
                    slope = -slope;
                }
                x += slope;
                console.log("x = " + x);
                funcs.push(function(){
                    client.sendPaddleMessage(x)
                });
            }
            setTimeout(function(){
                helper.executeInOrderWithDelay(funcs);
            },20000);
        }
    ];
    helper.printAllMessages(client.getSocket());
    helper.executeInOrderWithDelay(functions);


}());