import Game from "./game.js";

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