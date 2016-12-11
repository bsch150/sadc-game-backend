var WebSocket = require('ws');
var helper = require("./testing-helper.js");
var config = require("./testing-config.js")

function FakeClient(name) {
    var name = name;
    var socket = helper.getSocket(config.address, {rejectUnauthorized: false});

    this.getSocket = function () {
        return socket;
    };
    this.getName = function () {
        return name;
    }
}

FakeClient.prototype.connect = function () {
    this.getSocket().onopen = function () {
        console.log("open!");
    }
};

FakeClient.prototype.sendUsername = function () {
    helper.sendUsername(this.getSocket(), this.getName());
};

FakeClient.prototype.chooseGame = function (game, isPublic) {
    helper.sendGameSelect(this.getSocket(), game, isPublic);
};

FakeClient.prototype.sendChat = function (message) {
    helper.sendChat(this.getSocket(), message);
};

FakeClient.prototype.joinByUsername = function (username) {
  helper.sendSearchByUsername(this.getSocket(),username);
};

FakeClient.prototype.printAllMessages = function(){
    helper.printAllMessages(this.getSocket());
};

FakeClient.prototype.expect = function(strings){
  var counter = 0;
  var name = this.getName();
  this.getSocket().on("message",function(incoming){
    if(incoming != strings[counter]){
      console.log("Test failed for " + name + ", expected:\n\t" + strings[counter] + "\nrecieved:\n\t" + incoming);
    }
    counter++;
  })
}

FakeClient.prototype.close = function () {
  this.getSocket().close();
};

FakeClient.prototype.quickChooseGame = function (gameType, publicBool) {
  helper.quickChooseGame(this,gameType,publicBool);
};

module.exports = FakeClient;
