function generateAsset(){

}

function renderAssets(ctx, assets){
    for(let r = 0; r < assets.length; r++){
        renderAsset(ctx, assets[r]);
    }
}

function renderAsset(ctx, asset){

}

function tstFourSideOre(w,h){
    let verts = [];
    let cX = w/2;
    let cY = h/2;

    verts[0] = [(Math.floor(Math.random()*(cX))+(cX/2)),(Math.floor(Math.random()*(cY/4))+(cY/2))];
    verts[1] = [(Math.floor(Math.random()*(cX/2)+(cX+(cX/4)))),(Math.floor(Math.random()*(cY))+(cY/2))];
    verts[2] = [(Math.floor(Math.random()*(cX)+(cX/2))),(Math.floor(Math.random()*(cY/2))+(cY+(cY/4)))];
    verts[3] = [(Math.floor(Math.random()*(cX/4))+(cX/2)),(Math.floor(Math.random()*(cY))+(cY/2))];

    return verts;
}

function generateOres(count){
    let ores = [];
    for(let r = 0; r < count; r++){
        let verts = tstFourSideOre(100, 100);
        let color = getTestColor();
        let obj = {drawFunc:-1, color: color};
        obj.drawFunc = function(x, y, ct){
            //ctx.fillStyle = this.color;
            //ctx.strokeStyle = this.color;
            ct.fillPolygon(x, y, verts);
        };
        ores.push(obj);
    }
    console.log(ores);
    return ores;
}   