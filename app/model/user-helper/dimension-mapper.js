/**
 * Created by s730823 on 12/15/2016.
 */
function Mapper(width,height){
    this.width = width;
    this.height = height;
}

Mapper.prototype.mapXFromMeToGiven = function(value,newScale){
    var ratio = (value / this.width);
    return ratio * newScale;
};

Mapper.prototype.mapYFromMeToGiven = function(value,newScale){
    var ratio = (value / this.height);
    return ratio * newScale;
};

Mapper.prototype.mapXFromGivenToMe = function(value,oldScale){
    var ratio = value / oldScale;
    return ratio * this.width;
};
Mapper.prototype.mapYFromGivenToMe = function(value,oldScale){
    var ratio = value / oldScale;
    return ratio * this.height;
};

module.exports = Mapper;