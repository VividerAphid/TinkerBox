function render(G, map, settings){
    G.fillStyle = "#000";
    G.fillRect(0,0,mapCan.width, mapCan.height);
    let reps = map.length;
    for (let r = 0; r < reps; r++){
        map[r].drawConnections(G, map, settings);
    }
    for (let r = 0; r < reps; r++){
        map[r].drawPlaneto(G, map, settings);
    }
}

function setCanvasDims(map){
	let maxY = 0;
    let maxX = 0;
    let count = map.length;
	for(let v = 0; v<count; v++){
		if(map[v].x > maxX){
			maxX = map[v].x;
		}
		if(map[v].y > maxY){
			maxY = map[v].y;
		}
	}
	mapCan.width = maxX + 100;
	mapCan.height = maxY + 100;
	//console.log("wid: " + canvas.width);
	//console.log("hei: " + canvas.height);
}