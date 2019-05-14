module.exports = function (axis, ord, size, type, game){
    var collider = require('./collisionDetect.js');

        this.x = axis;
        this.y = ord;
        this.game = game;
        this.size = size;
        this.type = type;
        this.markedToDeleted = false;

        this.canvasX = this.x * this.size + this.size / 6;
        this.canvasY = this.y * this.size + this.size / 6;

        if(this.type === 1){
            this.image = document.getElementById('coin');
        }
        else{
            this.image = document.getElementById('cherries');
        }

    this.draw = function(ctx){
        ctx.drawImage(
            this.image,
            this.canvasX,
            this.canvasY,
            this.size/2,
            this.size/2
        );
    }

    this.update = function(deltaTime){
        //console.log(this.game.pacman.position)
        if(collider.detectCollisionCoin(this, this.game.pacman)){
            if(this.type == 1){
                this.game.score += 1;
            }
            else {
                this.game.score += 10;
            }
            this.markedToDeleted = true;
        }
    }
}