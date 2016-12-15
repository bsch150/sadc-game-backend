var sender = require("../service/socket-messenger.js");
var out = new (require("../debug.js"))(0);
var Location = require("../../games/tron/location.js");

function TronGame() {
    this.callbackFunction = null;
    this.users = null;
    this.bikes = [];

    this.numHorizontalCells = 32;
    this.numVerticalCells = 76;

    /*
        getSpawnObject: takes a playerNumber (1-4),
                        returns a spawn object used for initializing game
    */
    this.getSpawnObject = function(playerNumber) {
        switch(playerNumber) {
            case 1:
                return {
                    startLocation: new Location(this.numHorizontalCells/4,
                                                this.numVerticalCells/4),
                    startDirection: "right"
                };
                break;
            case 2:
                return {
                    startLocation: new Location(this.numHorizontalCells - (this.numHorizontalCells/4),
                                                this.numVerticalCells/4),
                    startDirection: "down"
                };
                break;
            case 3:
                return {
                    startLocation: new Location(this.numHorizontalCells - (this.numHorizontalCells/4),
                                                this.numVerticalCells - (this.numVerticalCells/4)),
                    startDirection: "left"
                };
                break;
            case 4:
                return {
                    startLocation: new Location(this.numHorizontalCells,
                                                this.numVerticalCells - (this.numVerticalCells/4)),
                    startDirection: "up"
                };
                break;
        }
    }
}

function startTron() {
    function step() {
        broadcastBikeMovement();
    }
    setInterval(step, 16);
}

function broadcastBikeMovement() {
    this.users.forEach(function (user) {
        this.bikes.forEach(function (bike) {
            sender.sendPayload(user.getUserSocket(), "bikeMove", {
                playerName: bike.getUserName(),
                location: bike.getLocation()
            });
        });
    });
}

/*----------Begin general game methods--------------*/

TronGame.prototype.init = function (users) {
    var tempThis = this;
    this.users = users;

    //TODO: Initialize the bikes starting location and direction

    //TODO: Write a loop that sets "changeDirection" reactions for each player
    var directionChangeReaction = {
        msg: "directionChange",
        reactFunction: function (direction) {
            //TODO: set the direction
            broadcastBikeMovement(tempThis.users, tempThis.paddles[0], tempThis.users[0].getUserName(), tempThis.gameWidth);
        }
    };

};

TronGame.prototype.countdownAndStart = function () {
    var tempThis = this;
    this.users.forEach(function (user) {
        setTimeout(function () {
            sender.sendPayload(user.getUserSocket(), "countdown", "3");
            setTimeout(function () {
                sender.sendPayload(user.getUserSocket(), "countdown", "2");
                setTimeout(function () {
                    sender.sendPayload(user.getUserSocket(), "countdown", "1");
                    setTimeout(function () {
                        sender.sendPayload(user.getUserSocket(), "countdown", "0");
                        startTron();
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
    });
};

TronGame.prototype.disconnect = function (user) {
    if (this.users) {
        var before = this.users.length;
        this.users = this.users.filter(function (userInList) {
            return userInList.getUserName() != user.getUserName();
        });
        out.log("Lobby removed " + (before - this.users.length) + " players.", 2);
    }
};

TronGame.prototype.setFinishCallback = function (callbackFunction) {
    this.callbackFunction = callbackFunction;
};

/*----------End general game methods--------------*/


function getConstructor() {
    return TronSocket;
}

module.exports = {
    getName: "Tron",
    getConstructor: getConstructor
};