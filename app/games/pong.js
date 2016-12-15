var sender = require("../service/socket-messenger.js");
var Ball = require("./pong-helper/ball.js");
var Paddle = require("./pong-helper/paddle.js");
var out = new (require("../debug.js"))(0);


function PongGame(){
    this.callbackFunction = null;
    this.users = null;
    this.ball = null;
    this.paddles = [];

    this.gameWidth = 414;
    this.gameHeight = 736;
}

function startPong(ball,users){
    function step(){
        ball.update();
        try {
            users.forEach(function(user){
                sender.sendPayload(user.getUserSocket(), "ballMove", {
                    x: ball.x,
                    y: ball.y
                });
            });
            setTimeout(step,16);
        }
        catch (err){
            out.log("Error in pong: " + err,0);
        }
    }
    step();
}

function countDownAndCallback(users, callback){
    users.forEach(function(user) {
        try {
            sender.sendPayload(user.getUserSocket(), "countdown", "3");
        } catch (err) {
            out.log("Error in pong: " + err, 0);
        }
        setTimeout(function () {
            try {
                sender.sendPayload(user.getUserSocket(), "countdown", "2");
            } catch (err) {
                out.log("Error in pong: " + err, 0);
            }
            setTimeout(function () {
                try {
                    sender.sendPayload(user.getUserSocket(), "countdown", "1");
                } catch (err) {
                    out.log("Error in pong: " + err, 0);
                }
                setTimeout(function () {
                    try {
                        sender.sendPayload(user.getUserSocket(), "countdown", "0");
                        callback();
                    } catch (err) {
                        out.log("Error in pong: " + err, 0);
                    }
                }, 1000);
            }, 1000);
        }, 1000);
    });
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
    var tempThis = this;
    this.users.forEach(function (user) {
        try {
            sender.sendPayload(user.getUserSocket(), "allReady", "");
        }catch(err){
            out.log("Error in pong: " + err,0);
        }
    });
    setTimeout(function(){
        countDownAndCallback(tempThis.users,function(){startPong(tempThis.ball,tempThis.users)})
    },5000);
};

PongGame.prototype.disconnect = function(user){
    if(this.users) {
        var before = this.users.length;
        this.users = this.users.filter(function (userInList) {
            return userInList.getUserName() != user.getUserName();
        });
        out.log("Lobby removed " + (before - this.users.length) + " players.", 2);
    }
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