
var FakeClient = require("../fake-client.js");
var helper = require("../testing-helper.js");

(function(){
  var first = new FakeClient("one");
  var second = new FakeClient("two");

  var expectedOne = [
      "{\"msg\":\"games\",\"object\":[\"Pong\",\"Tron\"]}",
      "{\"msg\":\"lobby\",\"object\":{\"gameType\":\"Tron\",\"players\":[\"one\"]}}",
      "{\"msg\":\"lobby\",\"object\":{\"gameType\":\"Tron\",\"players\":[\"one\",\"two\"]}}",
      "{\"msg\":\"lobbyChat\",\"object\":{\"playerName\":\"one\",\"message\":\"Hello two\"}}",
      "{\"msg\":\"lobbyChat\",\"object\":{\"playerName\":\"two\",\"message\":\"Hello one\"}}"
  ];
  var expectedTwo = [
      "{\"msg\":\"games\",\"object\":[\"Pong\",\"Tron\"]}",
      "{\"msg\":\"lobby\",\"object\":{\"gameType\":\"Tron\",\"players\":[\"one\",\"two\"]}}",
      "{\"msg\":\"lobbyChat\",\"object\":{\"playerName\":\"one\",\"message\":\"Hello two\"}}",
      "{\"msg\":\"lobbyChat\",\"object\":{\"playerName\":\"two\",\"message\":\"Hello one\"}}"
  ];
  first.expect(expectedOne);
  second.expect(expectedTwo);

  var functions = [
    function () {
      first.quickChooseGame("Tron",false);
    },
    function () {
      second.sendUsername();
    },
    function () {
      second.joinByUsername("one");
    },
    function () {
      first.sendChat("Hello two");
    },
    function () {
      second.sendChat("Hello one");
    },
    function () {
      console.log("Tests done.");
      first.close();
      second.close();
    }
  ];
  helper.executeInOrderWithDelay(functions);
}());
