import Game from './js/game'

let canvas=document.getElementById("gameScreen");
let ctx=canvas.getContext("2d");
const Game_Width=800;
const Game_Height=600;

let game=new Game(Game_Width,Game_Height);

paddle.draw(ctx);

let lastTime=0;
function gameLoop(timestamp){//This function is used for the movement of the paddle
    let dt=timestamp-lastTime;
    lastTime=timestamp;
    game.update(dt);
    game.draw(ctx);
    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
