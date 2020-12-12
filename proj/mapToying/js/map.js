function convertDataToMap(data){
    //format coming in is {id, x, y, [1,2,3]}

    let out = [];
    let count = data.length;
    for(let r = 0; r < count; r++){
        //new planeto(0, "p0", 50, 50, 10, "#fff", 1, [])
        out[r] = new planeto(data[r][0], "p"+r, data[r][1], data[r][2], 10, "#fff", 1, data[r][3]);
	}
	
    return out;
}

function tstMap(){
    //100% organic test data
    let mapData = [[0, 30, 30, [1, 2]],
    [1, 30, 120, [0, 3]], 
    [2, 120, 30, [0, 3, 4]],
    [3, 120, 120, [1, 2, 5]],
    [4, 210, 30, [2, 5]],
    [5, 210, 120, [3, 4]]];

    return mapData;
}

function randomGen(settings){
    let mapData = [];
    let coords = [];
    let cons = [];

    coords = getCoords(settings);
    cons = convertEdges(filterEdges(settings, coords, generateTriangles(coords)));

    for(var r=0; r<coords.length; r++){
		var con;
		if(cons[r] != undefined){
			con = cons[r];
		}
		else{
			con = [];
		}
		mapData.push([r, coords[r][0], coords[r][1], con]);
	}

    return mapData;
}