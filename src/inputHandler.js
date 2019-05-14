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