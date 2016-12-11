/**
 * Created by s730823 on 12/8/2016.
 */
var FakeClient = require("../fake-client.js");
var helper = require("../testing-helper.js");

(function () {
    var first = new FakeClient("one");
    var second = new FakeClient("two");

    first.setExpectedMessages([
      ["Pong","Tron"],
      {
        gameType: "Pong",
        players: ["one"]
      }
    ]);
    first.registerExpected();

    helper.quickChooseGame(first, "Pong", false);
    setTimeout(function () {
        helper.quickChooseGame(second, "Pong", false);
    }, 400);

    setTimeout(function () {
        first.sendChat("Test one");
    }, 800);
    setTimeout(function () {
        second.sendChat("Test two");
    }, 1200);

}());
