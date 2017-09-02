class ScenceEnd extends GuaScence {
    constructor(game){
        super(game)

    }
    draw(){
        this.game.ctx.clearRect(0,0,400,300);
        this.game.ctx.font="20px Georgia";
        this.game.ctx.fillText('游戏结束 按k 重新开始',100,150);
    }

}