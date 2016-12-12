

var FakeClient = require("../../fake-client.js");
var helper = require("../../testing-helper.js");

(function(){
  var first = new FakeClient("one");
  var second = new FakeClient("two");
  var third = new FakeClient("three");
  var fourth = new FakeClient("four");

  var expectedOne = [
      "{\"msg\":\"games\",\"object\":[\"Pong\",\"Tron\"]}",
      "{\"msg\":\"lobby\",\"object\":{\"gameType\":\"Tron\",\"players\":[\"one\"]}}",
      "{\"msg\":\"lobby\",\"object\":{\"gameType\":\"Tron\",\"players\":[\"one\",\"two\"]}}",
      "{\"msg\":\"lobby\",\"object\":{\"gameType\":\"Tron\",\"players\":[\"one\",\"two\",\"three\"]}}",
      "{\"msg\":\"lobby\",\"object\":{\"gameType\":\"Tron\",\"players\":[\"one\",\"two\",\"three\",\"four\"]}}",
      "{\"msg\":\"lobbyChat\",\"object\":{\"playerName\":\"one\",\"message\":\"Hello all\"}}",
      "{\"msg\":\"lobbyChat\",\"object\":{\"playerName\":\"two\",\"message\":\"Hello all two\"}}"
  ];
  var expectedTwo = [
      "{\"msg\":\"games\",\"object\":[\"Pong\",\"Tron\"]}",
      "{\"msg\":\"lobby\",\"object\":{\"gameType\":\"Tron\",\"players\":[\"one\",\"two\"]}}",
      "{\"msg\":\"lobby\",\"object\":{\"gameType\":\"Tron\",\"players\":[\"one\",\"two\",\"three\"]}}",
      "{\"msg\":\"lobby\",\"object\":{\"gameType\":\"Tron\",\"players\":[\"one\",\"two\",\"three\",\"four\"]}}",
      "{\"msg\":\"lobbyChat\",\"object\":{\"playerName\":\"one\",\"message\":\"Hello all\"}}",
      "{\"msg\":\"lobbyChat\",\"object\":{\"playerName\":\"two\",\"message\":\"Hello all two\"}}"
  ];
  var expectedThree = [
      "{\"msg\":\"games\",\"object\":[\"Pong\",\"Tron\"]}",
      "{\"msg\":\"lobby\",\"object\":{\"gameType\":\"Tron\",\"players\":[\"one\",\"two\",\"three\"]}}",
      "{\"msg\":\"lobby\",\"object\":{\"gameType\":\"Tron\",\"players\":[\"one\",\"two\",\"three\",\"four\"]}}",
      "{\"msg\":\"lobbyChat\",\"object\":{\"playerName\":\"one\",\"message\":\"Hello all\"}}",
      "{\"msg\":\"lobbyChat\",\"object\":{\"playerName\":\"two\",\"message\":\"Hello all two\"}}"
  ];
  var expectedFour = [
      "{\"msg\":\"games\",\"object\":[\"Pong\",\"Tron\"]}",
      "{\"msg\":\"lobby\",\"object\":{\"gameType\":\"Tron\",\"players\":[\"one\",\"two\",\"three\",\"four\"]}}",
      "{\"msg\":\"lobbyChat\",\"object\":{\"playerName\":\"one\",\"message\":\"Hello all\"}}",
      "{\"msg\":\"lobbyChat\",\"object\":{\"playerName\":\"two\",\"message\":\"Hello all two\"}}"
  ];
  first.expect(expectedOne);
  second.expect(expectedTwo);
  third.expect(expectedThree);

  var functions = [
    function () {
      first.quickChooseGame("Tron",true);
    },
    function () {
      second.quickChooseGame("Tron",true);
    },
    function () {
      third.quickChooseGame("Tron",true);
    },
    function () {
      fourth.quickChooseGame("Tron",true);
    },
    function () {
      first.sendChat("Hello all");
    },
    function () {
      second.sendChat("Hello all two");
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
