// 定义 Paddle 对象
function Paddle(game) {
    // 判断 x 在 x1  x2之间
    var aInb = function (x, x1, x2) {
        return x >= x1 && x <= x2;
    };

    var o = game.imageByName('paddle');
    o.x = 100;
    o.y = 200;
    o.step = 5;
    o.moveLeft = function () {
        this.x -= this.step;
        this.x = Math.max(0, this.x);
    }
    o.moveRight = function () {
        this.x += this.step;
        this.x = Math.min(310, this.x);
    }
    o.collide = function (ball) {
        // 判断相交
        var self = o;
        if(aInb(ball.x, self.x, self.x + self.w )||aInb(self.x, ball.x, ball.x  + ball.w)){
            if(aInb(ball.y, self.y, self.y + self.h )||aInb(self.y, ball.y, ball.y + ball.h)){
                return true
            }
        }
        return false;
    }


    return o;
};