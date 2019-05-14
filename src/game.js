module.exports = function (gameWidth, gameHeight, defaultSize){
    var map = require('./maps.js');
    var InputHandler = require('./inputHandler.js');

        this.width = gameWidth;
        this.height = gameHeight;
        this.dimension = map1.length;
        this.size = gameWidth / map1.length;
        this.gameObject = [];
        this.score = 0;
        this.running = true;

    this.start = function(){
        this.gameObject = map.buildMap(this, map.map1, this.size);
        this.pacman = this.gameObject[0];
        new InputHandler(this.pacman);
        this.ghost = this.gameObject[1];
        this.paths = this.gameObject[2];
        this.foods = this.gameObject[3];
        
    }

    this.end = function(){
        this.running = false;
    }

    this.update = function(deltaTime){
        if(this.running){
            this.pacman.update(deltaTime);
            this.paths.forEach(object => object.update(deltaTime));
            this.foods.forEach(object => object.update(deltaTime));
            this.ghost.forEach(object => object.update(deltaTime));
            this.foods = this.foods.filter(object => !object.markedToDeleted);
        }
    }

    this.draw = function(ctx){      
        this.paths.forEach(object => object.draw(ctx));
        this.ghost.forEach(object => object.draw(ctx));
        this.foods.forEach(object => object.draw(ctx));
        this.pacman.draw(ctx);

        ctx.font = " 60px Impact";
        ctx.strokeText("Score : " + this.score, 620, 60, 160);
    }
}