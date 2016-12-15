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
    ];
    helper.printAllMessages(client.getSocket());
    helper.executeInOrderWithDelay(functions);


}());