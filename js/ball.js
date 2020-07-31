import collision from './js/collision'

export default class Ball{
    constructor(game){
        this.image=document.getElementById('img_ball');
        this.reset();
        this.size=5;
        this.gameWidth=game.gameWidth;
        this.gameHeight=game.gameHeight;
        this.game=game;
    }
    reset(){
        this.position={x:10,y:400};
        this.speed={x:2,y:-2};
    }
    draw(ctx){
        ctx.drawImage(this.image,this.position.x,this.position.y,this.size,this.size);
    }
    update(dt){
        this.position.x+=this.speed.x;
        this.position.y+=this.speed.y;
        if(this.position.x+this.size>this.gameWidth || this.position.x<0) this.speed.x=-this.speed;
        if(this.position.y<0) this.speed.y=-this.speed;
        if(this.position.y+this.size>this.gameHeight){
            this.game,lives--;
            this.reset();
        }
        if(collision(this,this.game.paddle)){
                this.speed.y=-this.speed.y;
            }
    }
}