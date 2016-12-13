function PongSocket(){
    this.callbackFunction = null;
}

/*----------Begin general game methods--------------*/

PongSocket.prototype.init = function(userOne,userTwo){

};

PongSocket.prototype.begin = function(){

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