function render(G, map, settings){
    G.fillStyle = "#000";
    G.fillRect(0,0,mapCan.width, mapCan.height);
    let reps = map.length;
    for (var r = 0; r < reps; r++){
        map[r].drawConnections(G, map, settings);
        map[r].drawPlaneto(G, map, settings);
    }
}