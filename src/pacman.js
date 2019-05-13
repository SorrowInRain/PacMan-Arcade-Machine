export default class Pacman{
    constructor(axis, ord, size, movable, game){
        this.x = axis;
        this.y = ord;
        this.game = game;
        this.size = size;
        this.movable = movable;
        this.image = document.getElementById('coin');
        this.canvasX = this.x * this.size;
        this.canvasY = this.y * this.size;
        this.speedX = 0;
        this.speedY = 0;
    }

    moveUp(){
        if(this.game.paths[(this.y-1) * this.game.dimension + this.x].movable == 1)
            this.speedY = -1;
        else
            this.speedY = 0;
    }

    moveLeft(){
        if(this.game.paths[(this.y) * this.game.dimension + this.x-1].movable == 1)
            this.speedX = -1;
        else
            this.speedX = 0;
    }

    moveRight(){
        if(this.game.paths[(this.y) * this.game.dimension + this.x+1].movable == 1)
            this.speedX = 1;
        else
            this.speedX = 0;
    }

    moveDown(){
        if(this.game.paths[(this.y+1) * this.game.dimension + this.x].movable == 1)
            this.speedY = 1;
        else
            this.speedY = 0;
    }

    stopX(){
        this.speedX = 0;
    }

    stopY(){
        this.speedY = 0;
    }

    draw(ctx){
        ctx.drawImage(
            this.image,
            this.canvasX,
            this.canvasY,
            this.size,
            this.size
        );
    }

    update(deltaTime){
        this.x += this.speedX;
        this.y += this.speedY;
        
        if(this.x <= 0){
            this.x = 0;
        }
        if(this.x >= 30){
            this.x = 30;
        }
        if(this.y <= 0){
            this.y = 0;
        }
        if(this.y >= 30){
            this.y = 30;
        }

        this.canvasX = this.x * this.size;
        this.canvasY = this.y * this.size;
    }
}