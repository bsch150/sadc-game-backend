/**
 * Created by s730823 on 12/8/2016.
 */
var FakeClient = require("../../fake-client.js");

(function () {
    var first = new FakeClient("one");
    var second = new FakeClient("two");
    var expectedOne = [
      "{\"msg\":\"games\",\"object\":[\"Pong\",\"Tron\"]}",
      "{\"msg\":\"lobby\",\"object\":{\"gameType\":\"Pong\",\"players\":[\"one\"]}}",
      "{\"msg\":\"lobbyChat\",\"object\":{\"playerName\":\"one\",\"message\":\"Test one\"}}"
    ];
    var expectedTwo = [
      "{\"msg\":\"games\",\"object\":[\"Pong\",\"Tron\"]}",
      "{\"msg\":\"lobby\",\"object\":{\"gameType\":\"Pong\",\"players\":[\"two\"]}}",
      "{\"msg\":\"lobbyChat\",\"object\":{\"playerName\":\"two\",\"message\":\"Test two\"}}"
    ];
    first.expect(expectedOne);
    second.expect(expectedTwo);


    first.quickChooseGame("Pong", false);
    setTimeout(function () {
        second.quickChooseGame("Pong", false);
    }, 400);

    setTimeout(function () {
        first.sendChat("Test one");
    }, 800);
    setTimeout(function () {
        second.sendChat("Test two");
    }, 1200);
    setTimeout(function(){
      console.log("Tests done");
      first.close();
      second.close();
    },1600);

}());
