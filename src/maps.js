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