function returnChokePointHighlights(map){
    let chokes = [];
    let countedMap = [];
    for(let r = 0; r < map.length; r ++){
        let chokeCons = map[r].connections;
        let connectedCount = 0;
        for(let t = 0; t < chokeCons.length; t++){
            let tmpCons = map[chokeCons[t]].connections;
            for(let x = 0; x < chokeCons.length; x++){
                if(chokeCons[x] != chokeCons[t]){
                    if(tmpCons.includes(chokeCons[x])){
                        connectedCount++;
                    }
                }
            }
        }
        countedMap[r] = [connectedCount, map[r]];
    }
    countedMap.sort(function(a, b){return a[0] - b[0]});
    for(let r = 0; r < countedMap.length; r++){
        if(countedMap[r][0] <= 5){
            console.log("!");
            let id = countedMap[r][1].id;
            map[id].colour = "#00f";
        }
    }
    //console.log(countedMap);
    return map;
}