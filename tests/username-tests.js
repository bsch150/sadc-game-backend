/**
 * Created by s730823 on 12/8/2016.
 */
var FakeClient = require("./fake-client.js");
var helper = require("./testing-helper.js");

(function(){
    var client = new FakeClient("usernameTestNAme");
    helper.quickChooseGame(client,"Pong");
}());