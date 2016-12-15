var WebSocket = require('ws');
var helper = require("./testing-helper.js");
var config = require("./testing-config.js")

function FakeClient(name) {
    var name = name;
    var socket = helper.getSocket(config.address, {rejectUnauthorized: false});

    this.exactlyExpected = false;
    this.expected = [];
    this.messagesRecieved = 0;
    this.waitFor = -1;
    this.waitForCallback = null;

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
FakeClient.prototype.sendReadyMessage = function(){
  helper.sendReadyMessage(this.getSocket(),this.getName());
};
FakeClient.prototype.sendPaddleMessage = function(location){
  helper.sendPaddleMessage(this.getSocket(),location);
};

FakeClient.prototype.printAllMessages = function(){
    helper.printAllMessages(this.getSocket());
};

FakeClient.prototype.expect = function(strings){
    var name = this.getName();
    var tempThis = this;
    this.expected = strings;
    this.getSocket().on("message",function(incoming){
        var expected = strings[tempThis.messagesRecieved];
        if(incoming != expected){
            console.log("Test failed for " + name + ", expected:\n\t" +
                (typeof expected == "undefined" ? "nothing" : expected) +
                "\nrecieved:\n\t" +
                incoming +
                "\n------------------------"
            );
        }
        if(tempThis.messagesRecieved == tempThis.waitFor && tempThis.waitForCallback){
            tempThis.waitForCallback();
        }else{
        }
        tempThis.messagesRecieved++;
    })
};

FakeClient.prototype.close = function () {
    if(this.messagesRecieved < this.expected.length){
        console.log(this.getName() + " did not receive enough messages, expected and did not receive: ");
        for(var i = this.messagesRecieved; i < this.expected.length; i++){
            console.log("\t"+this.expected[i]);
        }
    }
    this.getSocket().close();
};

FakeClient.prototype.quickChooseGame = function (gameType, publicBool) {
    helper.quickChooseGame(this,gameType,publicBool);
};

FakeClient.prototype.waitForExpectedIndex = function(index,callBack){
    this.waitFor = index;
    this.waitForCallback = callBack;
};

module.exports = FakeClient;
