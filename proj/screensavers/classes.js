class ScreensaverInstance{
    constructor(width, height, arty){
        this.width = width;
        this.height = height;
        this.arty = arty;
    }
    updateScreenDimensions(width, height){
        this.width = width;
        this.height = height;
    }
    renderTick(){
        console.log("Default renderTick() not overridden!");
    }
}

class FlowerHeadSplatter extends ScreensaverInstance{
    constructor(width, height, arty){
        super(width, height, arty);
        this.flowers = [];
        this.loadFlowers(100);
    }
    loadFlowers(count){
        let flowerColors = {r: 48, g: 190, b:38};
        let size = 5;
        for(let r = 0; r < count; r++){
            let x = Math.round(Math.random()*can.width);
            let y = Math.round(Math.random()*can.height);
            this.flowers.push(new Flower(x, y, flowerColors, size));
        }
    }
    renderTick(){
        for(let r = 0; r < this.flowers.length; r++){
            this.flowers[r].draw(this.arty);
        }
        this.flowers = this.calcNextGen();
        if(this.flowers.length == 0){
            this.loadFlowers(100);
        }
    }
    calcNextGen(){
        let newFlowers = [];
        for(let r = 0; r < this.flowers.length; r++){
            let coords = this.calcNewCoords(this.flowers[r].x, this.flowers[r].y);
            let newFlo = this.flowers[r].calcNextGen();
            let seedChance = Math.random();
            if(seedChance >= .2 && seedChance < .8){
                newFlowers.push(new Flower(coords[0], coords[1], newFlo[0], newFlo[1]));
            }
            else if(seedChance >= .8){
                newFlowers.push(new Flower(coords[0], coords[1], newFlo[0], newFlo[1]));
                newFlowers.push(new Flower(coords[0], coords[1], newFlo[0], newFlo[1]));
            }
        }
        return newFlowers;
    }
    calcNewCoords(currentX, currentY){
        let xOffset = Math.round(Math.random()*20)-10;
        let yOffset = Math.round(Math.random()*20)-10;
        let newCoords = this.verifyXYInBounds(currentX, currentY, xOffset, yOffset);
        return newCoords
    }
    verifyXYInBounds(currentX, currentY, adjustX, adjustY){
        let newX = currentX + adjustX;
        let newY = currentY + adjustY;
        if(newX > can.width){
            newX = can.width;
        }
        else if(newX < 0){
            newX = 0;
        }

        if(newY > can.height){
            newY = can.height;
        }
        else if(newY < 0){
            newY = 0;
        }
        return [newX, newY];
    }
}

class Flower{
    constructor(x, y, color, size){
        this.x = x;
        this.y = y;
        this.mutationChance = .5;
        this.flowerColor = color;
        this.size = size;
    }
    calcNextGen(){
        if(Math.random() > this.mutationChance){
            let tempColor = JSON.parse(JSON.stringify(this.flowerColor));
            let tempSize = this.size;
            let keys = Object.keys(this.flowerColor);
            for(let r = 0; r < keys.length; r++){
                let changeChance = Math.random();
                // > .65 for up, < .35 for down
                let changeValue = Math.floor(Math.random()*10)+1;
                if(changeChance >= .65){
                    if(tempColor[keys[r]] + changeValue <= 255){
                        tempColor[keys[r]] += changeValue;
                    }
                    else{
                        tempColor[keys[r]] = 255;
                    }
                }
                else if(changeChance <= .35){
                    if(tempColor[keys[r]] - changeValue >= 0){
                        tempColor[keys[r]] -= changeValue;
                    }
                    else{
                        tempColor[keys[r]] = 0;
                    }
                }
            }
            if(Math.random() > .3){
                let changeValue = Math.floor(Math.random()*2)+1;
                if(Math.random() > .5){
                    tempSize += changeValue;
                }
                else{
                    if(tempSize - changeValue <= 5){
                        tempSize = 5;
                    }
                    else{
                        tempSize -= changeValue;
                    }
                }
            }
            
            return [tempColor, tempSize];
        }
        else{
            return [this.flowerColor, this.size];
        }
    }
    draw(arty){
        arty.drawFlower(this);
    }
    get color(){
        return "rgb("+this.flowerColor.r+","+this.flowerColor.g+","+this.flowerColor.b+")";
    }
}