function Match(socket, firstPlayer){
    this.socket = socket;
    this.playerOne = firstPlayer;
    this.playerTwo = null;
}

Match.prototype.setSecondPlayer = function(otherPlayer){
    playerTwo = otherPlayer;
};

module.exports = Match;