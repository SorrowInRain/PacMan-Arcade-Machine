import InputHandler from "./inputHandler.js";
import Pacman from "./pacman.js";
import Ghost from "./ghost.js";
import Path from "./path.js";
import {buildMap, map1} from "./maps.js";

export default class Game{
    constructor(gameWidth, gameHeight, defaultSize){
        this.width = gameWidth;
        this.height = gameHeight;
        this.dimension = map1.length;
        this.size = gameWidth / map1.length;
        this.gameObject = [];
        this.score = 0;
        this.running = true;
    }

    start(){
        this.gameObject = buildMap(this, map1, this.size);
        this.pacman = this.gameObject[0];
        new InputHandler(this.pacman);
        this.ghost = this.gameObject[1];
        this.paths = this.gameObject[2];
        this.foods = this.gameObject[3];
        console.log(this.ghost);
    }

    end(){
        this.running = false;
    }

    update(deltaTime){
        if(this.running){
            this.pacman.update(deltaTime);
            this.paths.forEach(object => object.update(deltaTime));
            this.foods.forEach(object => object.update(deltaTime));
            this.ghost.forEach(object => object.update(deltaTime));
            this.foods = this.foods.filter(object => !object.markedToDeleted);
        }
    }

    draw(ctx){      
        this.paths.forEach(object => object.draw(ctx));
        this.ghost.forEach(object => object.draw(ctx));
        this.foods.forEach(object => object.draw(ctx));
        this.pacman.draw(ctx);

        ctx.font = " 60px Impact";
        ctx.strokeText("Score : " + this.score, 620, 60, 160);
    }
}