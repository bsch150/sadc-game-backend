
var FakeClient = require("../../fake-client.js");
var helper = require("../../testing-helper.js");

(function(){
    var first = new FakeClient("one");
    var second = new FakeClient("two");
    var third = new FakeClient("three");
    var fourth = new FakeClient("four");

    var expectedOne = [
        "{\"msg\":\"games\",\"object\":[\"Pong\",\"Tron\"]}",
        "{\"msg\":\"lobby\",\"object\":{\"gameType\":\"Pong\",\"players\":[\"one\"]}}",
        "{\"msg\":\"lobby\",\"object\":{\"gameType\":\"Pong\",\"players\":[\"one\",\"two\"]}}",
        "{\"msg\":\"lobbyChat\",\"object\":{\"playerName\":\"one\",\"message\":\"Hello all\"}}",
        "{\"msg\":\"lobbyChat\",\"object\":{\"playerName\":\"two\",\"message\":\"Hello all two\"}}"
    ];
    var expectedTwo = [
        "{\"msg\":\"games\",\"object\":[\"Pong\",\"Tron\"]}",
        "{\"msg\":\"lobby\",\"object\":{\"gameType\":\"Pong\",\"players\":[\"one\",\"two\"]}}",
        "{\"msg\":\"lobbyChat\",\"object\":{\"playerName\":\"one\",\"message\":\"Hello all\"}}",
        "{\"msg\":\"lobbyChat\",\"object\":{\"playerName\":\"two\",\"message\":\"Hello all two\"}}"
    ];
    var expectedThree = [
        "{\"msg\":\"games\",\"object\":[\"Pong\",\"Tron\"]}",
        "{\"msg\":\"lobby\",\"object\":{\"gameType\":\"Pong\",\"players\":[\"three\"]}}",
        "{\"msg\":\"lobby\",\"object\":{\"gameType\":\"Pong\",\"players\":[\"three\",\"four\"]}}",
        "{\"msg\":\"lobbyChat\",\"object\":{\"playerName\":\"three\",\"message\":\"Hello all three\"}}"
    ];
    var expectedFour = [
        "{\"msg\":\"games\",\"object\":[\"Pong\",\"Tron\"]}",
        "{\"msg\":\"lobby\",\"object\":{\"gameType\":\"Pong\",\"players\":[\"three\",\"four\"]}}",
        "{\"msg\":\"lobbyChat\",\"object\":{\"playerName\":\"three\",\"message\":\"Hello all three\"}}",
    ];
    first.expect(expectedOne);
    second.expect(expectedTwo);
    third.expect(expectedThree);
    fourth.expect(expectedFour);

    var functions = [
        function () {
            first.quickChooseGame("Pong",true);
        },
        function () {
            second.quickChooseGame("Pong",true);
        },
        function () {
            third.quickChooseGame("Pong",true);
        },
        function () {
            fourth.quickChooseGame("Pong",true);
        },
        function () {
            first.sendChat("Hello all");
        },
        function () {
            second.sendChat("Hello all two");
        },
        function () {
            third.sendChat("Hello all three")  ;
        },
        function () {
            console.log("Tests done.");
            first.close();
            second.close();
            third.close();
            fourth.close();
        }
    ];
    helper.executeInOrderWithDelay(functions);
}());
