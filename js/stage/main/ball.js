// 定义 ball 对象
function Ball(game) {
    var o = game.imageByName('ball');

    o.x = 120;
    o.y = 160;
    o.stepX = 5;
    o.stepY = -5;
    o.fired = false;


    o.move = function () {
        if (o.fired) {
            // log("move");
            // 控制弹球在框里 不出界
            if (o.x < 0 || (o.x + o.w) > 400) {
                o.stepX *= -1;
            }

            if (o.y < 0 || (o.y + o.h) > 300) {
                o.stepY *= -1;
            }
            // 结算位置
            o.x += o.stepX;
            o.y += o.stepY;
        }
    };
    o.fire = function () {
        o.fired = true;
    };
    o.reflect = function () {
        o.stepY *= -1;
    };
    o.hasPoint = function (x, y) {
        return (x >= o.x && x <= o.x + o.w) && (y >= o.y && y <= o.y + o.h)
    }
    return o;
};