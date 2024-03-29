var gameCanv = document.getElementById("gameCanvas");
var ctx = gameCanv.getContext("2d");

var baseList = [[93, 8, 156], [7, 105, 28], [161, 158, 10], [125, 5, 5], [5, 22, 173], [171, 76, 3]];

ctx.fillStyle = "#000";
ctx.fillRect(0, 0, gameCanv.width, gameCanv.height);

let baseChoice = Math.round(Math.random()*(baseList.length-1));
console.log(baseList);
console.log(baseChoice);
spewColours(250, baseList[baseChoice][0], baseList[baseChoice][1], baseList[baseChoice][2], 30, 40);

function spewColours(count, inRed, inGreen, inBlue, range, mutationRange){
    ctx.fillStyle = "rgb("+inRed + "," +inGreen+","+inBlue+")";
    ctx.fillRect(0, 0, gameCanv.width, gameCanv.height);
    
    for(let r = 0; r<count; r++){
        let variation = Math.round(Math.random()*range);
        let negativeVari = Math.random();

        let redMut = Math.round(Math.random()*mutationRange);
        let greenMut = Math.round(Math.random()*mutationRange);
        let blueMut = Math.round(Math.random()*mutationRange);
        let negRed = Math.random();
        let negGreen = Math.random();
        let negBlue = Math.random();

        let x = Math.round(Math.random()*gameCanv.width);
        let y = Math.round(Math.random()*gameCanv.height);
    
        if(negativeVari > .5){
            variation *= -1;
        }
        if(negRed > .5){
            redMut *= -1;
        }
        if(negGreen > .5){
            greenMut *= -1;
        }
        if(negBlue > .5){
            blueMut *= -1;
        }
        let finalColor = "rgb("+(inRed + variation + redMut) + "," + (inGreen + variation + greenMut) +"," + (inBlue + variation + blueMut) + ")";
        //ctx.fillStyle = finalColor;
        //ctx.fillRect(x, y, 25, 25);
        console.log(finalColor);
        drawGrass(ctx, finalColor, x, y);
        
    }
}