function Location(_x, _y) {
    this.x = _x;
    this.y = _y;
}

Location.prototype.getX = function () {
    return this.x;
};

Location.prototype.getY = function () {
    return this.y;
};

module.exports = Location;
