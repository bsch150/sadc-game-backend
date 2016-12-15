function TronSocket(){
    this.name = "Tron"
}

function getConstructor(){
    return TronSocket;
}

module.exports = {
    getName: "Tron",
    getConstructor: getConstructor
};