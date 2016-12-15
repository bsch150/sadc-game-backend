var out = new (require("../debug.js"))(0);
var invalidTronDirection = require("../../exceptions/invalid-tron-direction.js");
var Location = require("../../games/tron/location.js");

function Bike(user, startX, startY, startDirection,
              numHorizontalCells, numVerticalCells) {

    this.userName = user.getUserName();
    this.isAlive = true;

    this.gameWidth = numHorizontalCells;
    this.gameHeight = numVerticalCells;

    this.location = new Location(startX, startY);
    this.direction = startDirection;
    this.occupiedCells = [];

    /*
     updateLocation: returns true if success, false if unable to move
     */
    this.updateLocation = function () {
        switch (this.direction) {
            case "up":
                if (this.location.getY() > 0) {
                    this.location = new Location(this.location.getX(), this.location.getY() - 1);
                    return true;
                } else {
                    return false;
                }
                break;
            case "down":
                if (this.location.getY() < numVerticalCells) {
                    this.location = new Location(this.location.getX(), this.location.getY() + 1);
                    return true;
                } else {
                    return false;
                }
                break;
            case "left":
                if (this.location.getX() > 0) {
                    this.location = new Location(this.location.getX() - 1, this.location.getY());
                    return true;
                } else {
                    return false;
                }
                break;
            case "right":
                if (this.location.getX() < numHorizontalCells) {
                    this.location = new Location(this.location.getX() + 1, this.location.getY());
                    return true;
                } else {
                    return false;
                }
                break;
        }
    }
}

Bike.prototype.update = function () {
    //TODO: update "x" and "y" based on direction

    //TODO: update isAlive

    //TODO: push last location into occupiedCells if(isAlive==true)
    this.occupiedCells.push(this.location);
};

Bike.prototype.changeDirection = function (newDirection) {
    switch (newDirection) {
        case "up" || "down" || "left" || "right":
            this.direction = newDirection;
            break;
        default:
            throw new invalidTronDirection();
            break;
    }
};

Bike.prototype.getLocation = function () {
    return this.location;
};

Bike.prototype.getUserName = function () {
    return this.userName;
};

module.exports = Bike;
