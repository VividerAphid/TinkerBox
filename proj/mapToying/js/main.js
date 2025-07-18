function render(G, map, settings){
    G.fillStyle = "#222";
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
	mapCan.width = 5000;//maxX + 100;
	mapCan.height = 5000;//maxY + 100;
	settingsBox.height = maxY + 100;
	//console.log("wid: " + canvas.width);
	//console.log("hei: " + canvas.height);
}

function update(){

	settings = {debug: true,
		defenseOn: true, 
		width: widthIn.value * 1, 
		height: heightIn.value * 1, 
		type: mapType.selectedIndex * 1, 
		count: 0, //Not used yet, reverse engineering soon
		padding: paddingIn.value * 1, 
		density: densityIn.value  * 1, 
		r: minRadiusIn.value  * 1, //Minimum distance radius?
		maxEdge: maxEdgeIn.value  * 1, 
		minAng: Math.PI/8, //Not used yet
		spice: edgeSpiceIn.value  * 1, //Edge spice
		extra: {} //Extra stuff for specific map settings
	};

	map = verifyAllConnected(convertDataToMap(randomGen(settings)));
	//map = rotate(map, {x:settings.width/2, y:settings.height/2}, 45);

	//map = returnHeatmap(map, [map[1], map[3], map[5], map[25], map[50]], 3);
	//map = returnChokePointHighlights(map);
	//map = returnFlowCheck(map);

    setCanvasDims(map);
    render(ctx, map, settings);
}