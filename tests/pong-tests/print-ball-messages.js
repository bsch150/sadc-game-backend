/**
 * Created by s730823 on 12/15/2016.
 */
var FakeClient = require("../fake-client.js");
var helper = require("../testing-helper.js");

(function(){
    var one = new FakeClient("one");
    var two = new FakeClient("two");

    helper.printAllMessages(one.getSocket());

    var functions = [
        function(){
            one.quickChooseGame("Pong",true);
        },
        function(){
            two.quickChooseGame("Pong",true);
        },
        function(){
            one.sendReadyMessage();
        },
        function(){
            two.sendReadyMessage();
        },
        function(){
            setTimeout(function(){
                one.close();
                two.close();
            },200)
        }
    ];
    helper.executeInOrderWithDelay(functions);
}());
