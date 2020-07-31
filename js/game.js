import Paddle from './js/paddle'
import InputHandler from './js/input'
import Ball from './js/ball'
import Brick from './js/brick'
import {buildLevel,level1,level2} from './js/levels'

const Game_State={
    PAUSED:0,
    RUNNING:1,
    MENU:2,
    OVER:3,
    NEXT:4,
    WIN:5
}

export default class Game{
    constructor(gameWidth,gameHeight){
        this.gameWidth=gameWidth;
        this.gameHeight=gameHeight;
        this.gameObj=[];
        this.lives=3;
        this.bricks=[];
        this.levels=[level1,level2];
        this.noLevels=2;
        this.curLevel=0;
        this.gamestate=Game_State.MENU;
        this.paddle=new Paddle(this);//This is used to create the paddle
        new InputHandler(this.paddle,this);
        this.ball =new Ball(this);
    }
    start(){
        if(this.noLevels===this.curLevel) this.gamestate=Game_State.WIN;
        if(this.gamestate!==Game_State.MENU || this.gamestate!==Game_State.NEXT) return;
        this.bricks=buildLevel(this,this.levels[this.curLevel]);
        this.ball.reset();
        this.gameObj=[this.paddle,this.ball];
        this.gamestate=Game_State.RUNNING;
    }
    update(dt){
        if(this.lives===0) Game_State.OVER;
        if(this.gamestate===Game_State.PAUSED || this.gamestate===Game_State.MENU || this.gamestate===Game_State.OVER) return;
        if(this.bricks.length===0){
            this.curLevel++;
            this.gamestate=Game_State.NEXT;
            this.start(this.curLevel);
        } 
        [...this.gameObj,...this.bricks].forEach(ob=> ob.update(dt));
        this.bricks=this.bricks.filter(bricks=> bricks.markedforDeletion);
    }
    draw(ctx){
        [...this.gameObj,...this.bricks].forEach(ob=> ob.draw(ctx));
        if(this.gamestate==Game_State.MENU){
            ctx.fillRect(0,0,this.gameWidth,this.gameHeight);
            ctx.fillSpace='rgba(0,0,0,1)';
            ctx.font='30px Arial';
            ctx.fillStyle='white';
            ctx.textAlign='center';
            ctx.fillText("Press SPACEBAR to START",this.gameWidth/2,this.gameHeight/2);
        }
        if(this.gamestate==Game_State.PAUSED){
            ctx.fillRect(0,0,this.gameWidth,this.gameHeight);
            ctx.fillSpace='rgba(0,0,0,5)';
            ctx.font='30px Arial';
            ctx.fillStyle='white';
            ctx.textAlign='center';
            ctx.fillText("Paused",this.gameWidth/2,this.gameHeight/2);
        }
        if(this.gamestate===Game_State.OVER){
            ctx.fillRect(0,0,this.gameWidth,this.gameHeight);
            ctx.fillSpace='rgba(0,0,0,5)';
            ctx.font='30px Arial';
            ctx.fillStyle='white';
            ctx.textAlign='center';
            ctx.fillText("Game Over",this.gameWidth/2,this.gameHeight/2);
        }
        if(this.gamestate===Game_State.WIN){
            ctx.fillRect(0,0,this.gameWidth,this.gameHeight);
            ctx.fillSpace='rgba(0,0,0,1)';
            ctx.font='30px Arial';
            ctx.fillStyle='white';
            ctx.textAlign='center';
            ctx.fillText("YOU WIN!!",this.gameWidth/2,this.gameHeight/2);
        }
    }
    pause(){
        if(this.gamestate===Game_State.PAUSED) this.gamestate=Game_State.RUNNING;
        else{
            this.gamestate=Game_State.PAUSED;
        }
    }
}