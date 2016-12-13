/**
 * Created by s730823 on 12/13/2016.
 */
var FakeClient = require("../fake-client.js");
var helper = require("../testing-helper.js");

(function(){
    var first = new FakeClient("one");
    var second = new FakeClient("two");

    var expectedOne = [
        "{\"msg\":\"games\",\"object\":[\"Pong\",\"Tron\"]}",
        "{\"msg\":\"lobby\",\"object\":{\"gameType\":\"Pong\",\"players\":[\"one\"]}}",
        "{\"msg\":\"lobby\",\"object\":{\"gameType\":\"Pong\",\"players\":[\"one\",\"two\"]}}",
        "{\"msg\":\"playerReady\",\"object\":\"one\"}",
        "{\"msg\":\"playerReady\",\"object\":\"two\"}",
        "{\"msg\":\"countdown\",\"object\":\"3\"}",
        "{\"msg\":\"countdown\",\"object\":\"2\"}",
        "{\"msg\":\"countdown\",\"object\":\"1\"}"
    ];
    var expectedTwo = [
        "{\"msg\":\"games\",\"object\":[\"Pong\",\"Tron\"]}",
        "{\"msg\":\"lobby\",\"object\":{\"gameType\":\"Pong\",\"players\":[\"one\",\"two\"]}}",
        "{\"msg\":\"playerReady\",\"object\":\"one\"}",
        "{\"msg\":\"playerReady\",\"object\":\"two\"}",
        "{\"msg\":\"countdown\",\"object\":\"3\"}",
        "{\"msg\":\"countdown\",\"object\":\"2\"}",
        "{\"msg\":\"countdown\",\"object\":\"1\"}"
    ];
    first.expect(expectedOne);
    second.expect(expectedTwo);

    var functions = [
        function(){
            first.quickChooseGame("Pong",true);
        },
        function(){
            second.quickChooseGame("Pong",true);
        },
        function(){
            first.sendReadyMessage();
        },
        function(){
            second.sendReadyMessage();
        },
        function(){

            console.log("Tests done.");
        }
    ];
    helper.executeInOrderWithDelay(functions);
}());