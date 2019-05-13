import {detectCollisionWall} from "./collisionDetect.js";

export default class Path{
    constructor(axis, ord, size, movable, game){
        this.x = axis;
        this.y = ord;
        
        this.game = game;
        this.size = size;
        this.movable = movable;
        this.image;
        if(this.movable == 0){
            //wall
            this.image = document.getElementById('wall');
        }
        else if(this.movable == 1){
            this.image = document.getElementById('ground');
        }
    }

    draw(ctx){
        ctx.drawImage(
            this.image,
            this.x * this.size,
            this.y * this.size,
            this.size,
            this.size
        );
    }

    update(deltaTime){
        
    }
}