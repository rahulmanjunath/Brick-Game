import collision from './js/collision'

export default class Brick{
    constructor(game,position){
        this.image=document.getElementById('img_brick');
        this.position=position;
        this.width=80;
        this.height=24;
        this.game=game;
        this.markedforDeletion=false;
    }
    update(){
        if(collision(this.game.ball,this)){
            this.game.ball.speed.y=-this.game.ball.speed.y;
            this.markedforDeletion=true;
        }
    }
    draw(){
        ctx.drawImage(this.image,this.position.x,this.position.y,this.width,this.height);
    }
}