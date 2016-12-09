var WebSocket = require('ws');
var helper = require("./testing-helper.js");
var config = require("./testing-config.js")

function FakeClient(name) {
    var name = name;
    var socket = helper.getSocket(config.address, {rejectUnauthorized: false});
    helper.printAllMessages(socket);

    this.getSocket = function(){return socket;}
    this.getName = function(){return name;}
}

FakeClient.prototype.connect = function(){
    this.getSocket().onopen = function () {
        console.log("open!");
    }
};

FakeClient.prototype.sendUsername = function(){
    helper.sendUsername(this.getSocket(),this.getName());
};

FakeClient.prototype.chooseGame = function(game){
    helper.sendGameSelect(this.getSocket(),game);
};

FakeClient.prototype.sendChat = function(message){
    helper.sendChat(this.getSocket(),message);
}

module.exports = FakeClient;