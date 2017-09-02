class ScenceTitle extends GuaScence {
    constructor(game) {
        super(game);

    }
    draw(){
        this.game.ctx.clearRect(0,0,400,300);
        this.game.ctx.font="20px Georgia";
        this.game.ctx.fillText('按k开始游戏',130,150);
    }

}