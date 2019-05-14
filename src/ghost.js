module.exports = function (axis, ord, size, movable, game){
    var algo = require('./algortihm.js');
        this.x = axis;
        this.y = ord;
        this.game = game;
        this.size = size;
        this.movable = movable;
        this.image = document.getElementById('ghost');
        this.canvasX = this.x * this.size;
        this.canvasY = this.y * this.size;
        this.direction = 5;

        //this.direction = bfs(this, this.game.pacman, this.game.paths);

    this.moveUp = function(){
        if(this.game.paths[(this.y-1) * this.game.dimension + this.x].movable == 1)
            this.y--;
    }

    this.moveLeft = function(){
        if(this.game.paths[(this.y) * this.game.dimension + this.x-1].movable == 1)
            this.x--;
    }

    this.moveRight = function(){
        if(this.game.paths[(this.y) * this.game.dimension + this.x+1].movable == 1)
            this.x++;
    }

    this.moveDown = function(){
        if(this.game.paths[(this.y+1) * this.game.dimension + this.x].movable == 1)
            this.y++;
    }

    this.stopX = function(){
        this.x += 0;
    }

    this.stopY = function(){
        this.y += 0;
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
        this.direction = algo.dijkstra(this, this.game.pacman, this.game.dimension, this.game.paths);
        // console.log(this.direction);
        switch(this.direction){
            case 0 : this.game.end(); break;
            case 1 : this.moveUp(); break;
            case 2 : this.moveRight(); break;
            case 3 : this.moveDown(); break;
            case 4 : this.moveLeft(); break;
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