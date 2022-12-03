function drawGrass(G, color, x, y){
    console.log(color);
    let stems = Math.floor(Math.random() * 5) + 3;
    let spacingAngle = 120 / stems;
    let length = Math.floor(Math.random()*15) + 10;
    let lineThickness = Math.floor(Math.random() * 2) + 3;
    for(let r = 0; r < stems; r++){
        G.beginPath();
        G.fillStyle = color;
        G.strokeStyle = color;
        G.lineWidth = lineThickness;
        let angle = -130 + (spacingAngle * r);
        let tipX = Math.round(length * Math.cos(degreesToRadians(angle)) + x);
        let tipY = Math.round(length * Math.sin(degreesToRadians(angle)) + y);
        G.moveTo(x, y);
        G.lineTo(tipX, tipY);
        G.stroke();
    }
}

function degreesToRadians(degrees){
	return degrees * (Math.PI/180);
}

function radiansToDegrees(radians){
	return radians * (180/Math.PI);
}