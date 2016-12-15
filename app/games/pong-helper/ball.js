/**
 * Created by s730823 on 12/14/2016.
 */
var out = new (require("../../debug.js"))(3);

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
function shouldResetBottom(y,ballWidth,gameHeight){
    return y + ballWidth> gameHeight;
}
function shouldResetTop(y,ballWidth,gameHeight){
    return y - ballWidth < 0 ;
}

function shouldBounceOffPaddle(x,y,ballWidth,paddle,gameHeight){
    return ((y - ballWidth < paddle.height && y - ballWidth > 0) ||
        ((y + ballWidth > gameHeight - paddle.height) && (y + ballWidth < gameHeight))) &&
        ((x < paddle.x + (paddle.width / 2)) && x > paddle.x - (paddle.width / 2));
}
function inZoneToBounce(){}

Ball.prototype.update = function(){
    this.x += this.velocities[0];
    this.y += this.velocities[1];
    if(shouldBounceWall(this.x,this.ballWidth,this.gameWidth)){
        this.velocities[0] = -(this.velocities[0]);
    }
    if(shouldResetBottom(this.y,this.ballWidth,this.gameHeight)){
        return "point one";
    }else if(shouldResetTop(this.y,this.ballWidth,this.gameHeight)) {
        return "point two";
    }else if(shouldBounceOffPaddle(this.x,this.y,this.ballWidth,this.paddles[0],this.gameHeight)){
        this.velocities[1] = -(this.velocities[1]);
        out.log("ball bounced off player 1",3);
    }else if(shouldBounceOffPaddle(this.x,this.y,this.ballWidth,this.paddles[1],this.gameHeight)){
        this.velocities[1] = -(this.velocities[1]);
        out.log("ball bounced off player 2",3);
    }
    out.log("Ball: " + this.x + ", " + this.y,5);
    return null;
};

module.exports = Ball;
