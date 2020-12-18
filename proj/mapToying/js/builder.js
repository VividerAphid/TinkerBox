function generateTriangles(coords){
    var delaunator = Delaunator.from(coords);
	var tris = delaunator.triangles;
	var triChunks = [];
	var rep = 0;
	for(var r=0;r<tris.length;r+=3){
		var host = r;
		var mini = [];
		mini.push(tris[r]);
		for(var t=r+1;t<r+3;t++){
			mini.push(tris[t]);
		}
		triChunks[rep] = mini;
		rep++;
	}
	//console.log(coords.length);
    return triChunks;
}

function filterEdges(settings, coords, triangles){
	var edges = [];
	var ind = 0;
	for(var o = 0; o < triangles.length; o++){
		if(findLength(triangles[o][0], triangles[o][1], coords) <= settings.maxEdge){
			edges[ind] = [triangles[o][0], triangles[o][1]];
			ind += 1;
		}
		if(findLength(triangles[o][1], triangles[o][2], coords) <= settings.maxEdge){
			edges[ind] = [triangles[o][1], triangles[o][2]];
			ind += 1;
		}
		if(findLength(triangles[o][0], triangles[o][2], coords) <= settings.maxEdge){
			edges[ind] = [triangles[o][0], triangles[o][2]];
			ind += 1;
		}
	}
	return edges;
}

function convertEdges(edges){ 
	//console.log(edges);
	var cons = [];
	for(var r = 0; r<edges.length; r++){
		if (!(cons[edges[r][0]])) cons[edges[r][0]] = [];
		if (!(cons[edges[r][1]])) cons[edges[r][1]] = [];
		cons[edges[r][0]].push(edges[r][1]);
		cons[edges[r][1]].push(edges[r][0]);
	}
	for(var w = 0; w<cons.length; w++){
		if(cons[w]){
			cons[w] = removeDupes(cons[w]);
		}
	}
	//console.log(cons);
	return cons;
}

function getCoords(settings){
    var plans = [];

	switch(settings.type){
		case 0:
			console.log("chunk!");
			plans = generateChunk(settings);
			break;
		case 1:
			console.log("bottle!");
			plans = bottleNeck(settings);
			break;
		case 2:
			console.log("circle!");
			plans = circle(settings);
			break;
		case 3:
			console.log("smash!");
			plans = midSmash(settings);
			break;
		case 4:
			console.log("ring!");
			plans = ring(settings);
			break;
		case 5:
			console.log("sym!");
			plans = symmetry(settings);
			break;
	}
	console.log(plans.length);
    return plans;
}

function generateChunk(settings){
    let cords = [];
	count = Math.floor(settings.density*(settings.width-2*settings.r)*(settings.height-2*settings.r)/(settings.r*settings.r*Math.PI));
	for(let t=0; t<count;t++){
		let safe = false;
		while (!safe) {
			let x = Math.floor((Math.random()*(settings.width-2*settings.padding))+ settings.padding);
			let y = Math.floor((Math.random()*(settings.height-2*settings.padding))+ settings.padding);
			var p = [x,y];
			safe = true;
			for (let j=0; j<cords.length; j+=1) {
				let q = cords[j];
				if ((p[0]-q[0])*(p[0]-q[0])+(p[1]-q[1])*(p[1]-q[1])<settings.r*settings.r) {
					safe = false;
					break;
				}
			}
		}
		cords.push(p);
    }
    return cords;
}

function bottleNeck(settings){
	var cords = [];
	count = Math.floor(settings.density*(settings.width-2*settings.r)*(settings.height-2*settings.r)/(settings.r*settings.r*Math.PI));
	var rad = settings.height / 2;
	cords.push([settings.height/2, settings.width/2]);
	for(var t = 0; t<count; t++){
		var x = Math.floor((Math.random()*(settings.width-2*settings.padding))+ settings.padding);
		var y = Math.floor((Math.random()*(settings.height-2*settings.padding))+ settings.padding);
		while((x - cords[0][0])*(x - cords[0][0]) - (y - cords[0][1])*(y - cords[0][1]) > rad){
			var safe = false;
			while (!safe) {
				var x = Math.floor((Math.random()*(settings.width-2*settings.padding))+ settings.padding);
				var y = Math.floor((Math.random()*(settings.height-2*settings.padding))+ settings.padding);
				var p = [x,y];
				safe = true;
				for (var j=0; j<cords.length; j+=1) {
					var q = cords[j];
					if ((p[0]-q[0])*(p[0]-q[0])+(p[1]-q[1])*(p[1]-q[1])<settings.r*settings.r) {
						safe = false;
						break;
					}
				}
			}
		}
		cords.push([x,y]);	
	}
	return cords;
}

function circle(settings){
	var cords = [];
    var rad = settings.height/2 - (settings.padding*2);
    count = Math.floor(settings.density*(Math.PI*rad*rad)/(settings.r*settings.r*Math.PI));
    console.log(count);
	var cX = settings.width/2;
	var cY = settings.height/2;
	cords.push([cX, cY]);
	for(var t = 0; t<count; t++){
		var x = Math.floor((Math.random()*(settings.width-2*settings.padding))+ settings.padding);
		var y = Math.floor((Math.random()*(settings.height-2*settings.padding))+ settings.padding);
		while((x - cX)*(x - cX) + (y - cY)*(y - cY) > rad*rad){
			var safe = false;
			while (!safe) {
				var x = Math.floor((Math.random()*(settings.width-2*settings.padding))+ settings.padding);
				var y = Math.floor((Math.random()*(settings.height-2*settings.padding))+ settings.padding);
				var p = [x,y];
				safe = true;
				for (var j=0; j<cords.length; j+=1) {
                    var q = cords[j];
					if ((p[0]-q[0])*(p[0]-q[0])+(p[1]-q[1])*(p[1]-q[1])<settings.r*settings.r) {
						safe = false;
						break;
					}
				}
			}
		}
		cords.push([x,y]);	
	}
	return cords;
}

function midSmash(w, h, density, padding, r){
	var cords = [];
	count = Math.floor(density*(w-2*r)*(h-2*r)/(r*r*Math.PI));
	var outRad = h/2 - padding*2;
	var inRad = outRad / 3;
	var cX = w/2;
	var cY = h/2;
	cords.push([cX, cY]);
	for(var t = 0; t<count; t++){
		var x = Math.floor((Math.random()*(w-2*padding))+ padding);
		var y = Math.floor((Math.random()*(h-2*padding))+ padding);
		while((x - cX)*(x - cX) + (y - cY)*(y - cY) > outRad*outRad){
			var safe = false;
			while (!safe) {
				var x = Math.floor((Math.random()*(w-2*padding))+ padding);
				var y = Math.floor((Math.random()*(h-2*padding))+ padding);
				if((x - cX)*(x - cX) + (y - cY)*(y - cY) < inRad*inRad){
					var p = [x,y];
					safe = true;
					for (var j=0; j<cords.length; j+=1) {
						var q = cords[j];
						if ((p[0]-q[0])*(p[0]-q[0])+(p[1]-q[1])*(p[1]-q[1])<r*r) {
							safe = false;
							break;
						}
					}
				}
			}
		}
		cords.push([x,y]);	
	}
	return cords;
}

function ring(w, h, density, padding, r){
	var cords = [];
	count = Math.floor(density*(w-2*r)*(h-2*r)/(r*r*Math.PI));
	var outRad = h/2 - padding*2;
	var inRad = outRad / 2;
	var cX = w/2;
	var cY = h/2;
	for(var t = 0; t<count; t++){
		var x = Math.floor((Math.random()*(w-2*padding))+ padding);
		var y = Math.floor((Math.random()*(h-2*padding))+ padding);
		while((x - cX)*(x - cX) + (y - cY)*(y - cY) > outRad*outRad || (x - cX)*(x - cX) + (y - cY)*(y - cY) < inRad*inRad){
			var safe = false;
			while (!safe) {
				var x = Math.floor((Math.random()*(w-2*padding))+ padding);
				var y = Math.floor((Math.random()*(h-2*padding))+ padding);
					var p = [x,y];
					safe = true;
					for (var j=0; j<cords.length; j+=1) {
						var q = cords[j];
						if ((p[0]-q[0])*(p[0]-q[0])+(p[1]-q[1])*(p[1]-q[1])<r*r) {
							safe = false;
							break;
						}
					}
			}
		}
		cords.push([x,y]);	
	}
	return cords;
}

function clusters(w, h, density, padding,r,type, size){
	var clustCoords = [];
	clustCoords = generateChunk(w,h,.7,padding, size);
	var coords = [];
	for(var x = 0; x<clustCoords.length; x++){
		var temp = [];
		switch(type){
			case -1:
				var pick = Math.floor(Math.random()*4);
				switch(pick){
					case 0:
						temp = generateChunk(size*2,size*2,density,padding,r);
						break;
					case 1:
						temp = ring(size*2,size*2,density,padding,r);
						break;
					case 2:
						temp = ring(size*2,size*2,density,padding,r);
						break;
					case 3:
						temp = bottleNeck(size*2,size*2,density,padding,r);
						break;
				}
				break;
			case 0:
				temp = generateChunk(size*2,size*2,density,padding,r);
				break;
			case 1:
				temp = ring(size*2,size*2,density,padding,r);
				break;
			case 2:
				temp = ring(size*2,size*2,density,padding,r);
				break;
			case 3:
				temp = bottleNeck(size*2,size*2,density,padding,r);
				break;
		}
		for(var zz=0; zz<temp.length; zz++){
			temp[zz][0]+= clustCoords[x][0];
			temp[zz][1]+= clustCoords[x][1];
		}
		//console.log(temp);
		coords = coords.concat(temp);
	}
	//console.log(clustCoords);
	//console.log(coords);
	return coords;
}

function symmetry(settings){
	let tempW = settings.width / 2;
	let tempH = settings.height / 2;
	let tmpcoords = generateChunk({width: tempW, height: tempH, r: settings.r, density: settings.density, padding: settings.padding});
	let cords = [];
	for(let t = 0; t < tmpcoords.length; t++){
		let quad1 = [tmpcoords[t][0], tmpcoords[t][1]];
		let quad2 = [settings.width-quad1[0], quad1[1]];
		let quad3 = [settings.width-quad1[0], settings.height-quad1[1]];
		let quad4 = [quad1[0], settings.height-quad1[1]];
		cords.push(quad1, quad2, quad3, quad4);
	}
	return cords;
}