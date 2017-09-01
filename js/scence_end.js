var endScence = function (game) {

    var s = {
        game:game,

    };

    s.draw  = function () {
        log('draw end');
        game.ctx.clearRect(0,0,400,300);
        game.ctx.font="20px Georgia";
        game.ctx.fillText('游戏结束',100,250);

    };

    s.update = function () {

    };


    return s;
}