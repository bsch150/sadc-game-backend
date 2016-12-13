function PongSocket(){
    this.name = "Pong"
}

function getConstructor(){
    return PongSocket;
}

module.exports = {
    getName: "Pong",
    getConstructor: getConstructor
};