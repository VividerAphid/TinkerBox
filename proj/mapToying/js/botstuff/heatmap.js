function returnHeatmap(map, owned, tries){

    for(let r = 0; r < owned.length; r++){
        owned[r].defense = 100;
    }
    let touched = owned.slice();
    let incoming = map.slice();
    let runs = 0;

    //Collect all heat values first before applying them all to avoid 0 planets
    //Figure out???
    while(runs < tries){
        for(let r = 0; r < touched.length; r++){
            let cons = touched[r].connections;
            let distributionVal = Math.floor(touched[r].defense / cons.length);
            for(let t = 0; t < cons.length; t++){
                incoming[cons[t]].defense += distributionVal;
            }
            touched[r].defense = 0;
        }
        for(let r = 0; r < incoming.length; r++){
            map[incoming[r].id].defense = incoming[r].defense;
        }
        touched = [];
        for(let x = 0; x < map.length; x++){
            if(map[x].defense > 0){
                touched.push(map[x]);
            }
        }
        runs++;
    }

    for(let r = 0; r < map.length; r++){
        if(map[r].defense > 0){
            let redVal = Math.round((map[r].defense / (Math.round(100/tries))) * 255);
            map[r].colour = "rgb(" + redVal + ", 0, 0)";
        }
    }
    for(let r = 0; r < owned.length; r++){
        owned[r].colour = "#0f0";
    }
 
    console.log(owned.sort((a, b) => a.defense - b.defense));
    return map;
}