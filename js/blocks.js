// 表砖块
function Block(position,game) {
    //position [0, 0, lives] 格式
    var p = position;
    var aInb = function (x, x1, x2) {
        return x >= x1 && x <= x2;
    };
    var o = game.imageByName('blocks');
    log(o.w);
    o.x = p[0];
    o.y = p[1];
    o.alive = true;
    o.lives = p[2] || 1;
    o.kill = function () {
        console.log(o.lives);
        if(o.lives === 0){
            o.alive = false;
        }
    }
    o.react = function (ball) {
        ball.y *= -1;
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
    };
    return o;
}