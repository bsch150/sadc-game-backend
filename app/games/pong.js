var sender = require("../service/socket-messenger.js");
var Ball = require("./pong-helper/ball.js");
var Paddle = require("./pong-helper/paddle.js");


function PongGame(){
    this.callbackFunction = null;
    this.users = null;
    this.ball = null;
    this.paddles = [];

    this.gameWidth = 600;
    this.gameHeight = 1600;
}

function startPong(){
    function step(){

    }
    setInterval(step,16);
}

function broadcastPaddleMovement(users, paddle, name, width){
    users.forEach(function(user){
        var xToSend = !(user.getUserName() === users[1].getUserName()) ? paddle.x : width - paddle.x;
        sender.sendPayload(user.getUserSocket(),"paddleMove",{
            playerName: name,
            location: xToSend
        });
    });
}

/*----------Begin general game methods--------------*/

PongGame.prototype.init = function(users){
    var tempThis = this;
    this.users = users;
    this.paddles = [
        new Paddle(),
        new Paddle()
    ];
    this.ball = new Ball(this.gameHeight, this.gameWidth, this.paddles);

    var paddleReactionOne = {
        msg: "paddleMove",
        reactFunction: function (x) {
            tempThis.paddles[0].x = x;
            broadcastPaddleMovement(tempThis.users,tempThis.paddles[0],tempThis.users[0].getUserName(),tempThis.gameWidth);
        }
    };

    this.users[0].addReaction(paddleReactionOne);
    var paddleReactionTwo = {
        msg: "paddleMove",
        reactFunction: function (x) {
            tempThis.paddles[1].x = tempThis.gameWidth - x;
            broadcastPaddleMovement(tempThis.users,tempThis.paddles[1],tempThis.users[1].getUserName(),tempThis.gameWidth);
        }
    };

    this.users[1].addReaction(paddleReactionTwo);
};

PongGame.prototype.begin = function(){
    this.users.forEach(function(user) {
        setTimeout(function () {
            sender.sendPayload(user.getUserSocket(), "countdown", "3");
            setTimeout(function () {
                sender.sendPayload(user.getUserSocket(), "countdown", "2");
                setTimeout(function () {
                    sender.sendPayload(user.getUserSocket(), "countdown", "1");
                    setTimeout(function(){
                        sender.sendPayload(user.getUserSocket(), "countdown", "0");
                        startPong();
                    },1000);
                }, 1000);
            }, 1000);
        }, 1000);
    });
};

PongGame.prototype.setFinishCallback = function(callbackFunction){
    this.callbackFunction = callbackFunction;
};

/*----------End general game methods--------------*/


function getConstructor(){
    return PongGame;
}

module.exports = {
    getName: "Pong",
    getConstructor: getConstructor
};