var Stage = function (game) {
    var s = {
        game:game,

    };
    // 初始化
    var paddle = Paddle(game);
    var ball = Ball(game);
    var score = 0;
    blocks = loadLevel(1,game);

    //event 事件注册+自动判断调用
    game.registerAction('a', function () {
        paddle.moveLeft();
    });

    game.registerAction('d', function () {
        paddle.moveRight();
    });
    game.registerAction('f', function () {
        ball.fire();
    });

    s.draw  = function () {
        game.ctx.clearRect(0,0,400,300);
/*        game.ctx.fillStyle = "#123";
        game.ctx.fillRect(0, 0, 400, 300)*/
        game.drawImage(paddle);
        game.drawImage(ball);
        blocks.forEach(function (block) {
            if(block.alive){
                game.drawImage(block);
            }
        });
        game.ctx.fillText('分数' + score, 10, 290);
        // console.log(score);
    };

    s.update = function () {
        if(game.paused){
            return
        }
        ball.move();
        // 判断blocks相撞
        blocks.forEach(function (block) {
            // 修复 bug： 死亡 直接return
            if(!block.alive){
                return
            }
            if( block.collide(ball)){
                block.lives-- ;
                block.kill();
                //反弹
                ball.reflect();
                score += 100;
            }
        });

        if (paddle.collide(ball)) {
            //反弹
            ball.reflect();
        }
        //判断游戏结束
        if(ball.y > paddle.y ){
            // 跳转到游戏结束的场景
            var end = new ScenceEnd(game);
            game.replaceStage(end);
        }
    };
    // mouse event
    var canMove = false;
    game.canvas.addEventListener('mousedown',function (e) {
        var x = e.offsetX;
        var y = e.offsetY;

        //判断是否点击到了球 100 200
        log(x,y);
        log(ball.hasPoint(x,y));
        if(ball.hasPoint(x,y)){
            canMove = true;
            log('click');
        }
    });

    var move =  function (e) {
        if(!canMove || !game.paused){
            return
        }
        ball.x = e.offsetX - 20;
        ball.y = e.offsetY - 20;
        game.drawImage(ball);

    }
    game.canvas.addEventListener('mousemove',move);
    game.canvas.addEventListener('mouseup', function (e) {
        canMove = false;
    });

    return s;
}