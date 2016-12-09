/**
 * Created by s730823 on 12/8/2016.
 */
var FakeClient = require("./fake-client.js");
var helper = require("./testing-helper.js");

(function (){
    var first = new FakeClient("one");
    var second = new FakeClient("two");

    helper.quickChooseGame(first,"Pong");
    setTimeout(function(){
        helper.quickChooseGame(second,"Pong");
    },400)

    setTimeout(function(){
        first.sendChat("Test one");
    },800);
    setTimeout(function(){
        second.sendChat("Test two");
    },1200);
}());