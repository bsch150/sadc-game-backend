var sender = require("../service/socket-messenger.js");

function TronGame(){
    this.callbackFunction = null;
    this.users = null;
    this.ball = null;
    this.bikes = [];

    this.gameWidth = 600;
    this.gameHeight = 1600;
}

function startTron(ball,users){
    function step(){
        //TODO: update all bikes
        ball.update();
        users.forEach(function(user){
            sender.sendPayload(user.getUserSocket(), "ballMove", {
                x: ball.x,
                y: ball.y
            });
        });
    }
    setInterval(step,16);
}

function broadcastBikeMovement(users, bike, name, width){
    users.forEach(function(user){
        var xToSend = !(user.getUserName() === users[1].getUserName()) ? paddle.x : width - paddle.x;
        sender.sendPayload(user.getUserSocket(),"paddleMove",{
            playerName: name,
            location: xToSend
        });
    });
}

/*----------Begin general game methods--------------*/

TronGame.prototype.init = function(users){
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
            broadcastBikeMovement(tempThis.users,tempThis.paddles[0],tempThis.users[0].getUserName(),tempThis.gameWidth);
        }
    };

    this.users[0].addReaction(paddleReactionOne);
    var paddleReactionTwo = {
        msg: "paddleMove",
        reactFunction: function (x) {
            tempThis.paddles[1].x = tempThis.gameWidth - x;
            broadcastBikeMovement(tempThis.users,tempThis.paddles[1],tempThis.users[1].getUserName(),tempThis.gameWidth);
        }
    };

    this.users[1].addReaction(paddleReactionTwo);
};

TronGame.prototype.begin = function(){
    var tempThis = this;
    this.users.forEach(function(user) {
        setTimeout(function () {
            sender.sendPayload(user.getUserSocket(), "countdown", "3");
            setTimeout(function () {
                sender.sendPayload(user.getUserSocket(), "countdown", "2");
                setTimeout(function () {
                    sender.sendPayload(user.getUserSocket(), "countdown", "1");
                    setTimeout(function(){
                        sender.sendPayload(user.getUserSocket(), "countdown", "0");
                        startTron(tempThis.ball,tempThis.users);
                    },1000);
                }, 1000);
            }, 1000);
        }, 1000);
    });
};

TronGame.prototype.setFinishCallback = function(callbackFunction){
    this.callbackFunction = callbackFunction;
};

/*----------End general game methods--------------*/


function getConstructor(){
    return TronSocket;
}

module.exports = {
    getName: "Tron",
    getConstructor: getConstructor
};