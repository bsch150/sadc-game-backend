/**
 * Created by s730823 on 12/14/2016.
 */

function Ball(screenHeight, screeenWidth, paddles){
    this.gameHeight = screenHeight;
    this.gameWidth = screeenWidth;
    this.x = screeenWidth / 2;
    this.y = screenHeight / 2;
    this.paddles = paddles;
    this.ballWidth = 10;

    this.velocities = [
        0,0
    ];
}

Ball.prototype.update = function(){
    this.x += this.velocities[0];
    this.y += this.velocities[1];
    if(this.x - (this.ballWidth / 2) < 0 || this.x + (this.ballWidth / 2) > this.gameWidth){
        this.velocities[0] = -this.velocities[0];
    }

    if(this.y - (this.ballWidth / 2) < 0){
        var paddle = this.paddles[0];
        if(this.x < paddle.x + (paddle.width /2) && this.x > paddle.x - (paddle.width / 2)){
            this.velocities[1] = - this.velocities[1];
        }
    } else if(this.y + (this.ballWidth / 2) > this.gameHeight){
        var paddle = this.paddles[1];
        if(this.x < paddle.x + (paddle.width /2) && this.x > paddle.x - (paddle.width / 2)){
            this.velocities[1] = - this.velocities[1];
        }
    }
};

module.exports = Ball;
