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
        this.speedY = -1;
    }

    moveLeft(){
        this.speedX = -1;
    }

    moveRight(){
        this.speedX = 1;
    }

    moveDown(){
        this.speedY = 1;
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
        if(this.game.paths[(this.y-1) * this.game.dimension + this.x].movable == 1 && this.speedY < 0){
			this.y += this.speedY;
		}
		
		if(this.game.paths[(this.y) * this.game.dimension + this.x-1].movable == 1 && this.speedX < 0){
			this.x += this.speedX;
		}
		
		if(this.game.paths[(this.y+1) * this.game.dimension + this.x].movable == 1 && this.speedY > 0){
			this.y += this.speedY;
		}
		
		if(this.game.paths[(this.y) * this.game.dimension + this.x+1].movable == 1 && this.speedX > 0){
			this.x += this.speedX;
		}
        
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