
var FakeClient = require("../fake-client.js");

(function(){
  var first = new FakeClient("one");
  var second = new FakeClient("two");

  var expectedOne = [
      "{\"msg\":\"games\",\"object\":[\"Pong\",\"Tron\"]}",
      "{\"msg\":\"lobby\",\"object\":{\"gameType\":\"Tron\",\"players\":[\"one\"]}}",
      "{\"msg\":\"lobbyChat\",\"object\":{\"playerName\":\"two\",\"message\":\"Hello one\"}}"
  ];
  var expectedTwo = [
      "{\"msg\":\"games\",\"object\":[\"Pong\",\"Tron\"]}",
      "{\"msg\":\"lobby\",\"object\":{\"gameType\":\"Pong\",\"players\":[\"one\"]}}",
      "{\"msg\":\"lobbyChat\",\"object\":{\"playerName\":\"one\",\"message\":\"Test one\"}}"
  ];
  first.expect(expectedOne);
  second.expect(expectedTwo);


  first.quickChooseGame("Tron",false);
  setTimeout(function() {
    second.joinByUsername("one");
    setTimeout(function(){
      first.sendChat("Hello two");
      second.sendChat("Hello one");
      setTimeout(function () {
        console.log("Tests done.");
        first.close();
        second.close();
      },1200);
    },800);
  },400);
}());
