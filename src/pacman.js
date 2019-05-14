module.exports = function(axis, ord, size, movable, game){

        this.x = axis;
        this.y = ord;
        this.game = game;
        this.size = size;
        this.movable = movable;
        this.image = document.getElementById('pacman');
        this.canvasX = this.x * this.size;
        this.canvasY = this.y * this.size;
        this.speedX = 0;
        this.speedY = 0;
    

    this.moveUp = function(){
        this.speedY = -1;
    }

    this.moveLeft = function(){
        this.speedX = -1;
    }

    this.moveRight = function(){
        this.speedX = 1;
    }

    this.moveDown = function(){
        this.speedY = 1;
    }

    this.stopX = function(){
        this.speedX = 0;
    }

    this.stopY = function(){
        this.speedY = 0;
    }

    this.draw = function(ctx){
        ctx.drawImage(
            this.image,
            this.canvasX,
            this.canvasY,
            this.size,
            this.size
        );
    }

    this.update = function(deltaTime){
        if(this.game.paths[(this.y-1) * this.game.dimension + this.x].movable == 1 && this.speedY < 0){
            this.y += this.speedY;
            this.stopX();
		}
		
		if(this.game.paths[(this.y) * this.game.dimension + this.x-1].movable == 1 && this.speedX < 0){
            this.x += this.speedX;
            this.stopY();
		}
		
		if(this.game.paths[(this.y+1) * this.game.dimension + this.x].movable == 1 && this.speedY > 0){
            this.y += this.speedY;
            this.stopX();
		}
		
		if(this.game.paths[(this.y) * this.game.dimension + this.x+1].movable == 1 && this.speedX > 0){
            this.x += this.speedX;
            this.stopY();
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
