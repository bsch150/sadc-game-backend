function InvalidTronDirection() {
    this.name = "InvalidTronDirection";
    this.message = "An invalid direction was given to a Bike. Must be up, down, left, or right.";
    this.toString = function() {
        return this.name + ": " + this.message;
    };
}

module.exports =  InvalidTronDirection;