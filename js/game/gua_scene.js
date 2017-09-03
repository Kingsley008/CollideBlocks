/**
 * 进行对各种场景的功能抽象
 * */
class GuaScence {
    constructor(game) {
        this.game = game;
        // 完成初始化事件注册 k : 游戏开始
        game.registerAction('k', function () {
            var s = Stage(game);
            game.replaceStage(s);
        });
    }

    draw() {
        //  alert('一定要继承这个函数')
    }

    update() {

    }
}







