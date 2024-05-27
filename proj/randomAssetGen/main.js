function test(){
    let ctx = artCanvas.getContext("2d");
    ctx.fillStyle = "#f00";
    ctx.strokeStyle = "#f00";
    let verts = tstFourSideOre(150,150);//getTestVerts(20, 200, 200);
    let testOBJ = {drawFunc: -1, color:-1};
    testOBJ.drawFunc = function(x, y){ctx.fillPolygon(x, y, verts);};

    testOBJ.drawFunc(10, 10);
    testOBJ.drawFunc(200, 200);
}

function getTestVerts(vertCount, xRange, yRange){
    let verts = [];
    for(let r = 0; r < vertCount; r++){
        let x = Math.floor(Math.random()* xRange);
        let y = Math.floor(Math.random()* yRange);
        verts.push([x, y]);
    }
    return verts;
}

function getTestColor(){
    let r = Math.floor(Math.random()*256).toString(16);
    let g = Math.floor(Math.random()*256).toString(16);
    let b = Math.floor(Math.random()*256).toString(16);
    return "#" + r + g + b;
}

function tstOres(){
    let ores = generateOres(1000);
    let ctx = artCanvas.getContext("2d");
    for(let r = 0; r < ores.length; r++){
        let x = Math.floor(Math.random()*400);
        let y = Math.floor(Math.random()*400);
        ctx.fillStyle = ores[r].color;
        ctx.strokeStyle = ores[r].color;
        ores[r].drawFunc(x,y, ctx);
    }
}