(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports.bfs = function(ghost, pacman, paths){
    var queue = [];
    var solution = [];

    queue.push({
        x : ghost.x,
        y : ghost.y,
        track : [[ghost.x, ghost.y]]
    });

    // console.log(queue);

    while(queue.length > 0){
        //console.log(queue.length);
        var trial = queue.shift();
        var xnow = trial.x;
        var ynow = trial.y;
        var tracer = trial.track;

        var dest = [[xnow + 1, ynow],
            [xnow-1, ynow],
            [xnow, ynow-1],
            [xnow, ynow+1]
        ];

        for(var i = 0; i <dest.length;i++){
            if(paths[dest[i][1] * 20 + dest[i][0]].movable == 0){
                continue;
            }

            var exist = false;
            for(var j=0;j<tracer.length;j++){
                if(tracer[j][0] == dest[i][0] && tracer[j][1] == dest[i][1]){
                    exist = true;
                    break;
                }
            }   
            if(exist) continue;

            var candidate = tracer.slice(0);
            candidate.push(dest[i]);

            if(!(dest[i][0] == pacman.x && dest[i][1] == pacman.y)){
                queue.push({
                    x : dest[i][0],
                    y : dest[i][1],
                    track : candidate
                });
            }
            else{
                solution.push(candidate);
            }
            
        }
    }
    var min =40;
    var minInd = 0;
    for(var i = 0; i < solution.length; i++){
        if(solution[i].length < min){
            min = solution[i].length;
            minInd = i;
        }
    }

    return solution[minInd];
}

module.exports.dijkstra =  function (ghost, pacman, dimension, path){
    if(ghost.x == pacman.x && ghost.y == pacman.y){
        return 0;
        //game selesai, tidak usah dilanjutkan
    }
    else{
        var possible = [
            [ghost.x, ghost.y - 1],
            [ghost.x + 1, ghost.y],
            [ghost.x, ghost.y + 1],
            [ghost.x - 1, ghost.y]          
        ];

        var distance = 100000;
        var index = 0;

        for(var i =0; i< possible.length;i++){
            //console.log(possible[i][0] * dimension + possible[i][1]);
            if(path[possible[i][0] * dimension + possible[i][1]].movable != 0){
                var possibleDistance = Math.abs(pacman.x - possible[i][0]) + Math.abs(pacman.y - possible[i][1]);
                if(possibleDistance < distance){
                    distance = possibleDistance;
                    index = i;
                }
            }
        }

        return index+1;
    }
}
},{}],2:[function(require,module,exports){
module.exports.detectCollisionWall = function (stc, dnm){
    let botStc = stc.y + stc.size;
    let topStc = stc.y;
    let lefStc = stc.x;
    let rigStc = stc.x + stc.size;
    let botDnm = Math.round(dnm.y + dnm.size);
    let topDnm = Math.round(dnm.y);
    let lefDnm = Math.round(dnm.x);
    let rigDnm = Math.round(dnm.x + dnm.size);

    //console.log(botStc+ " " + topStc + " " + lefStc + " " + rigStc);
    //console.log(botDnm+ " " + topDnm + " " + lefDnm + " " + rigDnm);
    if(botDnm >= topStc){
        //console.log("top");
        return 1;
    }
    else if(topDnm <= botStc){
        //console.log("bot");
        return 3;
    }
    else if(lefDnm <= rigStc){
        //console.log("rig");
        return 2;
    }
    else if(rigDnm >= lefStc){
        //console.log("lef");
        return 4;
    }
    else{
        return 0;
    }
}

module.exports.detectCollisionCoin = function (stc, dnm){
    return (stc.x == dnm.x && stc.y == dnm.y);
}
},{}],3:[function(require,module,exports){
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
},{"./collisionDetect.js":2}],4:[function(require,module,exports){
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
},{"./inputHandler.js":7,"./maps.js":8}],5:[function(require,module,exports){
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
},{"./algortihm.js":1}],6:[function(require,module,exports){
var Game = require('./game.js');

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 600;
const GAME_HEIGHT = 600;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const DEFAULT_SIZE = 20;

ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);

let game = new Game(GAME_WIDTH, GAME_HEIGHT, DEFAULT_SIZE);
game.start();

var fps = 10;

function gameLoop(currentTime){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    game.update(currentTime);
    game.draw(ctx);

    setTimeout(gameLoop, 1000/fps);
}

gameLoop();
},{"./game.js":4}],7:[function(require,module,exports){
module.exports = function(pacman){
        document.addEventListener('keydown', (event)=>{
            switch(event.keyCode){
                case 87 : //key W 
                    pacman.moveUp();
                    break;
                case 65 : //key A
                    pacman.moveLeft();
                    break;
                case 83 : //key S
                    pacman.moveDown();
                    break;
                case 68 : //key D
                    pacman.moveRight();
                    break;
            }
        });
/*
        document.addEventListener('keyup', (event)=>{
            switch(event.keyCode){
                case 87 : //key W 
                    if(pacman.speedY < 0) pacman.stopY();
                    break;
                case 65 : //key A
                    if(pacman.speedX < 0) pacman.stopX();
                    break;
                case 83 : //key S
                    if(pacman.speedY > 0) pacman.stopY();
                    break;
                case 68 : //key D
                    if(pacman.speedX > 0) pacman.stopX();
                    break;
            }
        });*/
}
},{}],8:[function(require,module,exports){
var Path = require('./path.js');
var Pacman = require('./pacman.js');
var Ghost = require('./ghost.js');
var Food = require('./food.js');

module.exports.buildMap = function (game, map, size){
    let paths = [];
    let chara = [];
    let foods = [];
    let rets = [];

    map.forEach((row, rowIndex) => {
        row.forEach((element, colIndex) => {
            
            if(element == 1){
                paths.push(new Path(colIndex, rowIndex, size, 0, game));
            }
            else if(element == 0){
                foods.push(new Food(colIndex, rowIndex, size, 1, game));
                paths.push(new Path(colIndex, rowIndex, size, 1, game));
            }
            else if(element == 2){
                foods.push(new Food(colIndex, rowIndex, size, 2, game));
                paths.push(new Path(colIndex, rowIndex, size, 1, game));
            }
            else if(element == 3){
                paths.push(new Path(colIndex, rowIndex, size, 1, game));
                chara.push(new Ghost(colIndex, rowIndex, size, 1, game));
            }
            else if(element == 4){
                paths.push(new Path(colIndex, rowIndex, size, 1, game));
                rets.push(new Pacman(colIndex, rowIndex, size, 1, game));
            }
        });
    });
    
    rets.push(chara);
    rets.push(paths);
    rets.push(foods);

    return rets;
}

module.exports.map1 = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,3,0,0,0,0,0,0,0,0,0,0,0,1,0,1,3,0,0,1],
    [1,0,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,0,0,1],
    [1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,1,0,2,1],
    [1,1,1,1,1,1,1,1,0,1,0,0,1,0,0,0,0,0,0,1],
    [1,2,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1],
    [1,0,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0,0,0,1],
    [1,0,1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,0,4,0,0,1,1,0,0,0,0,0,1],
    [1,0,1,0,0,0,1,0,0,0,1,0,0,1,2,0,0,0,0,1],
    [1,0,1,0,2,0,1,1,1,0,1,0,0,1,0,1,1,1,1,1],
    [1,0,1,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,0,1],
    [1,0,1,0,0,0,1,0,1,1,1,0,0,1,0,0,0,1,0,1],
    [1,0,1,0,0,0,1,0,0,0,1,0,0,1,0,1,1,1,0,1],
    [1,0,1,0,0,0,1,1,0,0,1,0,0,1,0,1,0,1,0,1],
    [1,0,1,0,0,0,1,0,0,1,1,0,0,1,0,1,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];
},{"./food.js":3,"./ghost.js":5,"./pacman.js":9,"./path.js":10}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
module.exports = function(axis, ord, size, movable, game){
    
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
    

    this.draw = function(ctx){
        ctx.drawImage(
            this.image,
            this.x * this.size,
            this.y * this.size,
            this.size,
            this.size
        );
    }

    this.update = function(deltaTime){
        
    }
}
},{}]},{},[6]);
