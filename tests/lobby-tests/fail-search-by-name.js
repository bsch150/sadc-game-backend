

var FakeClient = require("../fake-client.js");
var helper = require("../testing-helper.js");

(function(){
  var first = new FakeClient("one");

  var expectedOne = [
      "{\"msg\":\"games\",\"object\":[\"Pong\",\"Tron\"]}",
      "{\"msg\":\"error\",\"object\":\"No available games for that username.\"}"
  ];

  first.expect(expectedOne);

  var functions = [
    function () {
      first.sendUsername("testUser");
    },
    function () {
      first.joinByUsername("SomeNameThatDoesntExist");
    },
    function () {
      console.log("Tests done.");
      first.close();
    }
  ];
  helper.executeInOrderWithDelay(functions);
}());
