import {bfs, dijkstra} from "./algortihm.js";

export default class Ghost{
    constructor(axis, ord, size, movable, game){
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
    }

    moveUp(){
        if(this.game.paths[(this.y-1) * this.game.dimension + this.x].movable == 1)
            this.y--;
    }

    moveLeft(){
        if(this.game.paths[(this.y) * this.game.dimension + this.x-1].movable == 1)
            this.x--;
    }

    moveRight(){
        if(this.game.paths[(this.y) * this.game.dimension + this.x+1].movable == 1)
            this.x++;
    }

    moveDown(){
        if(this.game.paths[(this.y+1) * this.game.dimension + this.x].movable == 1)
            this.y++;
    }

    stopX(){
        this.x += 0;
    }

    stopY(){
        this.y += 0;
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
        this.direction = dijkstra(this, this.game.pacman, this.game.dimension, this.game.paths);
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