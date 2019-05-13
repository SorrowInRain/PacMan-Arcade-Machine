export function detectCollisionWall(stc, dnm){
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

export function detectCollisionCoin(stc, dnm){
    return (stc.x == dnm.x && stc.y == dnm.y);
}