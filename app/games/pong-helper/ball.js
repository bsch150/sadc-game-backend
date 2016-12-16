/**
 * Created by s730823 on 12/14/2016.
 */
var out = new (require("../../debug.js"))(0);

function Ball(screenHeight, screeenWidth, paddles){
    this.gameHeight = screenHeight;
    this.gameWidth = screeenWidth;
    this.x = screeenWidth / 2;
    this.y = screenHeight / 2;
    this.paddles = paddles;
    this.ballWidth = 2.2;
    this.updateCounter = 0;

    var initSpeed = 1;

    this.velocities = [
        initSpeed,initSpeed
    ];

    this.makeSpeedFaster = function(){
        var increase = 1.1;
        this.velocities[0] *= increase;
        this.velocities[1] *= increase;
    }
    this.resetVelocities = function(){
        this.velocities = [
            initSpeed,initSpeed
        ];
    }
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
    var distanceY = Math.abs(paddle.y - y);

    var xDist = Math.abs(x - paddle.x);
    out.log("xDist = " + xDist + " yDist " + distanceY,3);
    return (distanceY < paddle.height + ballWidth) &&
        (xDist < paddle.width);
}

Ball.prototype.update = function(){
    this.updateCounter++;
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
        this.makeSpeedFaster();
        out.log("ball bounced off player 1",3);
    }else if(shouldBounceOffPaddle(this.x,this.y,this.ballWidth,this.paddles[1],this.gameHeight)){
        this.velocities[1] = -(this.velocities[1]);
        this.makeSpeedFaster();
        out.log("ball bounced off player 2",3);
    }
    out.log("Ball: " + this.x + ", " + this.y,5);
    return null;
};

module.exports = Ball;
