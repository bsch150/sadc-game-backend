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
        1,1
    ];
}

function shouldBounceWall(x, ballWidth, gameWidth){
    return x - (ballWidth / 2) < 0 || x + (ballWidth / 2) > gameWidth
}

//function shouldBouncePaddle(y,ballWidth,paddle)

Ball.prototype.update = function(){
    this.x += this.velocities[0];
    this.y += this.velocities[1];
    if(shouldBounceWall(this.x,this.ballWidth,this.gameWidth)){
        this.velocities[0] = -this.velocities[0];
    }

    if(this.y - (this.ballWidth / 2) < this.paddles[0].height && this.y - (this.ballWidth) > 0){
        var paddle = this.paddles[0];
        if(this.x < paddle.x + (paddle.width /2) && this.x > paddle.x - (paddle.width / 2)){
            this.velocities[1] = - this.velocities[1];
        }
    } else if(this.y + (this.ballWidth / 2) > this.gameHeight - this.paddles[0].height &&
    this.y + (this.ballWidth / 2) < this.gameHeight){
        var paddle = this.paddles[1];
        if(this.x < paddle.x + (paddle.width /2) && this.x > paddle.x - (paddle.width / 2)){
            this.velocities[1] = - this.velocities[1];
        }
    }
//    else if(this.y )
};

module.exports = Ball;
