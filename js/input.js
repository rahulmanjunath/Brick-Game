import Paddle from "./paddle";
import Game from "./game";

export default class InputHandler{
    constructor(paddle,game){
        document.addEventListener('keydown',(event)=>{//To do something when the keyboard is pressed
            //alert(event.keyCode);-->Gives different codes or numbers for different keys
            switch(event.keyCode){
                case 37:
                    paddle.moveLeft();
                    break;
                case 39:
                    paddle.moveRight();
                    break;
            }
        });
        document.addEventListener('keyup',(event)=>{//To do something after removing finger from key
            switch(event.keyCode){
                case 37:
                    if(paddle.speed<0) paddle.stop();
                    break;
                case 39:
                    if(paddle.speed>0) paddle.stop();
                    break;
                case 27:
                    game.pause();
                    break;
                case 32:
                    game.start();
                    break;
            }
        });
    }
}