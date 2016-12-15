var sender = require("../service/socket-messenger.js");
var Ball = require("./pong-helper/ball.js");
var Paddle = require("./pong-helper/paddle.js");
var out = new (require("../debug.js"))(3);

var FPS = 20;
var NUM_MILLIS_PER_MSG = 1000 / FPS;

function PongGame(){
    this.callbackFunction = null;
    this.users = null;
    this.ball = null;
    this.paddles = [];
    this.score = [0,0];

    this.gameWidth = 200;
    this.gameHeight = 600;
}

function broadcastBall(users, ball, gameHeight,gameWidth){
    sender.sendPayload(users[0].getUserSocket(), "ballMove", {
        x: users[0].mapper.mapXFromGivenToMe(ball.x, gameWidth),
        y: users[0].mapper.mapYFromGivenToMe(ball.y, gameHeight)
    });
    sender.sendPayload(users[1].getUserSocket(), "ballMove", {
        x: users[1].mapper.mapXFromGivenToMe(gameWidth - ball.x, gameWidth),
        y: users[1].mapper.mapYFromGivenToMe(gameHeight - ball.y, gameHeight)
    });
}

function resetBall(users, ball, score,gameHeight,gameWidth){
    out.log("Resetting ball, score is " + score[0] + " to " + score[1],3);
    ball.x = gameWidth / 2;
    ball.y = gameHeight / 2;
    broadcastBall(users, ball,gameHeight,gameWidth);
    countDownAndCallback(users,function(){
        startPong(ball,users,score,gameHeight,gameWidth);
    });
}

function startPong(ball,users,score, gameHeight,gameWidth){
    out.log("startPong()",3);
    function step(){
        var ballMsg = ball.update();
        if(ballMsg){
            if(ballMsg == "point one"){
                score[0]++;
            }else if(ballMsg == "point two"){
                score[1]++;
            }
            resetBall(users,ball,score,gameHeight,gameWidth);
        }else {
            try {
                broadcastBall(users,ball,gameHeight,gameWidth);
                setTimeout(step, NUM_MILLIS_PER_MSG);
            }
            catch (err) {
                out.log("Error in pong: " + err, 0);
            }
        }
    }
    step();
}

function countDownAndCallback(users, callback){
    out.log("countdown",3);
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
                    } catch (err) {
                        out.log("Error in pong: " + err, 0);
                    }
                }, 1000);
            }, 1000);
        }, 1000);
    });
    setTimeout(callback,3000);
}

function broadcastPaddleMovement(users, paddle, name, width){
    users.forEach(function(user){
        var xToSend = user.mapper.mapXFromGivenToMe(!(user.getUserName() === users[1].getUserName()) ? paddle.x : width - paddle.x,width);
        sender.sendPayload(user.getUserSocket(),"paddleMove",{
            playerName: name,
            location: xToSend
        });
    });
}

function limitPaddle(paddleX,min,max){
    return Math.min(Math.max(min,paddleX),max);
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
    sender.sendPayload(users[0].getUserSocket(),"gameDimensions",{
        paddleWidth: users[0].mapper.mapXFromGivenToMe(this.paddles[0].width,this.gameWidth),
        paddleHeight: users[0].mapper.mapYFromGivenToMe(this.paddles[0].height,this.gameHeight),
        ballRadius: users[0].mapper.mapXFromGivenToMe(this.ball.ballWidth,this.gameWidth)
    });
    sender.sendPayload(users[1].getUserSocket(),"gameDimensions",{
        paddleWidth: users[1].mapper.mapXFromGivenToMe(this.paddles[0].width,this.gameWidth),
        paddleHeight: users[1].mapper.mapYFromGivenToMe(this.paddles[0].height,this.gameHeight),
        ballRadius: users[1].mapper.mapXFromGivenToMe(this.ball.ballWidth,this.gameWidth)
    });

    var paddleReactionOne = {
        msg: "paddleMove",
        reactFunction: function (x) {
            var temp = tempThis.users[0].mapper.mapXFromMeToGiven(x,tempThis.gameWidth);
            tempThis.paddles[0].x = limitPaddle(temp,tempThis.paddles[0].width / 2,tempThis.gameWidth - (tempThis.paddles[0].width / 2));
            out.log("translated " + x + " to " + tempThis.paddles[0].x,5);
            broadcastPaddleMovement(tempThis.users,tempThis.paddles[0],tempThis.users[0].getUserName(),tempThis.gameWidth);
        }
    };

    this.users[0].addReaction(paddleReactionOne);
    var paddleReactionTwo = {
        msg: "paddleMove",
        reactFunction: function (x) {
            var temp = tempThis.gameWidth - tempThis.users[1].mapper.mapXFromMeToGiven(x,tempThis.gameWidth);
            tempThis.paddles[1].x = limitPaddle(temp,tempThis.paddles[0].width / 2,tempThis.gameWidth - (tempThis.paddles[0].width/2));
            out.log("translated " + x + " to " + tempThis.paddles[1].x,5);
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
        countDownAndCallback(tempThis.users,function(){startPong(tempThis.ball,tempThis.users,tempThis.score,tempThis.gameHeight,tempThis.gameWidth)})
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