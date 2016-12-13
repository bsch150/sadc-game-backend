var sender = require("../service/socket-messenger.js");

function PongSocket(){
    this.callbackFunction = null;
    this.users = null;
}

function startPong(){

}

/*----------Begin general game methods--------------*/

PongSocket.prototype.init = function(users){
    this.users = users;
};

PongSocket.prototype.begin = function(){
    this.users.forEach(function(user) {
        setTimeout(function () {
            sender.sendPayload(user.getUserSocket(), "countdown", "3");
            setTimeout(function () {
                sender.sendPayload(user.getUserSocket(), "countdown", "2");
                setTimeout(function () {
                    sender.sendPayload(user.getUserSocket(), "countdown", "1");
                    setTimeout(function(){
                        startPong();
                    },1000);
                }, 1000);
            }, 1000);
        }, 1000);
    });
};

PongSocket.prototype.setFinishCallback = function(callbackFunction){
    this.callbackFunction = callbackFunction;
};

/*----------End general game methods--------------*/


function getConstructor(){
    return PongSocket;
}

module.exports = {
    getName: "Pong",
    getConstructor: getConstructor
};