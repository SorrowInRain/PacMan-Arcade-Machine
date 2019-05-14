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