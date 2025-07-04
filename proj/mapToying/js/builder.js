function generateTriangles(coords){
	//console.log(coords);
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
		let spiceChance = Math.random();
			if(findLength(triangles[o][0], triangles[o][1], coords) <= settings.maxEdge || settings.spice > spiceChance){
				edges[ind] = [triangles[o][0], triangles[o][1]];
				ind += 1;
			}
			if(findLength(triangles[o][1], triangles[o][2], coords) <= settings.maxEdge || settings.spice > spiceChance){
				edges[ind] = [triangles[o][1], triangles[o][2]];
				ind += 1;
			}
			if(findLength(triangles[o][0], triangles[o][2], coords) <= settings.maxEdge || settings.spice > spiceChance){
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
		case 6:
			console.log("spiral!");
			plans = spiral(settings);
			break;
		case 7:
			console.log("spiral2");
			plans = spiral2(settings);
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
	//console.log(cords);
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

function midSmash(settings){
	var cords = [];
	count = Math.floor(settings.density*(settings.width-2*settings.r)*(settings.height-2*settings.r)/(settings.r*settings.r*Math.PI));
	var outRad = settings.height/2 - settings.padding*2;
	var inRad = outRad / 3;
	var cX = settings.width/2;
	var cY = settings.height/2;
	cords.push([cX, cY]);
	for(var t = 0; t<count; t++){
		var x = Math.floor((Math.random()*(settings.width-2*settings.padding))+ settings.padding);
		var y = Math.floor((Math.random()*(settings.height-2*settings.padding))+ settings.padding);
		while((x - cX)*(x - cX) + (y - cY)*(y - cY) > outRad*outRad){
			var safe = false;
			while (!safe) {
				var x = Math.floor((Math.random()*(settings.width-2*settings.padding))+ settings.padding);
				var y = Math.floor((Math.random()*(settings.height-2*settings.padding))+ settings.padding);
				if((x - cX)*(x - cX) + (y - cY)*(y - cY) < inRad*inRad){
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
		}
		cords.push([x,y]);	
	}
	return cords;
}

function ring(settings){
	var cords = [];
	count = Math.floor(settings.density*(settings.width-2*settings.r)*(settings.height-2*settings.r)/(settings.r*settings.r*Math.PI));
	var outRad = settings.height/2 - settings.padding*2;
	var inRad = outRad / 2;
	var cX = settings.width/2;
	var cY = settings.height/2;
	for(var t = 0; t<count; t++){
		var x = Math.floor((Math.random()*(settings.width-2*settings.padding))+ settings.padding);
		var y = Math.floor((Math.random()*(settings.height-2*settings.padding))+ settings.padding);
		while((x - cX)*(x - cX) + (y - cY)*(y - cY) > outRad*outRad || (x - cX)*(x - cX) + (y - cY)*(y - cY) < inRad*inRad){
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

function spiral(settings){
	let cords = [];
	let centerX = settings.width/2;
	let centerY = settings.width/2;
	let armCount = 4;
	let childMax = 2;
	let turnSharpness = 10;
	let spacingAngle = 360 / armCount;
	let turnAngleDecay = 0;
	let starsPerArm = 20;
	cords.push([centerX, centerY]);
	for(let t = 0; t < armCount; t++){
		let radius = 75;
		let angle = t * spacingAngle;
		//console.log(angle);
		for(let r = 0; r < starsPerArm; r++){
			let xVariance = Math.round(Math.random() * 30);
			let yVariance = Math.round(Math.random() * 30);
			let xPick = (Math.round(radius*(Math.cos(degreesToRadians(angle)))) + xVariance)+ centerX + settings.padding * 2;
			let yPick = (Math.round(radius*(Math.sin(degreesToRadians(angle)))) + yVariance) + centerY + settings.padding * 2;
			cords.push([xPick, yPick]);
			let childCount = Math.round(Math.random()*childMax);
			let childAngle = angle - 20;
			for(let a = 0; a < childCount; a++){
				let childX = (Math.round(radius*(Math.cos(degreesToRadians(childAngle)))) + xVariance)+ centerX + settings.padding * 2;
				let childY = (Math.round(radius*(Math.sin(degreesToRadians(childAngle)))) + yVariance)+ centerY + settings.padding * 2;
				cords.push([childX, childY]);
				childAngle += 40;
			}
			radius += Math.round(Math.random() * 30) + 50;
			angle += Math.round(Math.random() * (turnSharpness - (turnAngleDecay * r))) + 5;
			//console.log(angle);
		}
	}
	console.log(cords);
	return cords;
}

function spiral2(settings){
	let coords = [];
	let centerX = settings.width/2;
	let centerY = settings.height/2;
	let centerW = settings.width/4;
	let centerH = settings.height/4;
	let armCount = 4;
	let turnSharpness = 10;
	let spacingAngle = 360 / armCount;
	let centerCluster = generateChunk({width:centerW, height:centerH, padding:0, density:3.5, r:settings.r,});
	let armClusters = [];

	centerCluster = shiftXCoords(centerCluster, centerX + (centerW/4));
	centerCluster = shiftYCoords(centerCluster, centerY + (centerH/4));

	//Hardcode arms for now to practice generation
	armSettingsH = {width:settings.width/4.5, height:settings.height/2, padding:0, density:1.5, r:settings.r};
	armSettingsW = {width:settings.width/2, height:settings.height/4.5, padding:0, density:1.5, r:settings.r};
	let nArm = generateChunk(armSettingsH);
	nArm = shiftXCoords(nArm, centerX + (centerW/4));
	armClusters.push(nArm);
	let eArm = generateChunk(armSettingsW)
	eArm = shiftXCoords(eArm, centerX+centerW*1.5);
	eArm = shiftYCoords(eArm, centerY+(centerW/4));
	armClusters.push(eArm);
	let sArm = generateChunk(armSettingsH)
	sArm = shiftXCoords(sArm, centerX+(centerW/4));
	sArm = shiftYCoords(sArm, centerY+(centerH*1.5));
	armClusters.push(sArm);
	let wArm = generateChunk(armSettingsW)
	wArm = shiftYCoords(wArm, centerY+(centerH/4));
	armClusters.push(wArm);

	coords = centerCluster.slice();

	for(let r = 0; r < armClusters.length; r ++){
 		coords = coords.concat(armClusters[r]);
	}

	for(let r = 0; r < coords.length; r++){
		let maxRot = 150;
		let xDiff = Math.abs(centerX-coords[r][0]);
		let yDiff = Math.abs(centerY-coords[r][1]);
		let rotPercent = ((xDiff/centerX) + (yDiff/centerY))/ 2; //Average of x and y diffs
		let pointRot = maxRot * rotPercent;
		let newPoint = rotatePoint2(coords[r][0], coords[r][1], degreesToRadians(pointRot), centerX, centerY);
		//console.log({maxRot: maxRot, xDiff: xDiff, yDiff: yDiff, rotPercent: rotPercent, pointRot: pointRot, newPoint: newPoint});
		if(newPoint[0] < 0){
			console.log(r + " , " + newPoint[0]);
		}
		coords[r][0] = newPoint[0];
		coords[r][1] = newPoint[1];
	}

	return coords;
}