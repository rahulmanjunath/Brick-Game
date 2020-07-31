export function collision(ball,gameOb){
    let botball=ball.position.y+ball.size;
    let topball=ball.position.x;
    let topOb=gameOb.position.y;
    let botOb=gameOb.position.y+gameOb.height;
    let lOb=gameOb.position.x;
    let rOb=gameOb.position.x+gameOb.width;
    if(botball>=topOb
       && topball<=botOb
       && ball.position.x>=lOb
       && ball.position.x+ball.size<=rOb){
            return true;
        }
    else
        return false;
}