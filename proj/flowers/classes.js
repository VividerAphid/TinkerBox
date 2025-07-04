class plant{
    constructor(x, y, flowerSize=15, rgbs, mutationChance=0.5){
        //Leaf shape
        //Height
        //Seed count
        //Stem count
        //Stem segments
        this.x = x;
        this.y = y;
        this.mutationChance = mutationChance;
        this.flowerSize = flowerSize;
        this.flowerColor = this.loadFlowerColor(rgbs);
        this.segments = [new flowerSegment(x, y, this.flowerColor, this.flowerSize)];
    }
    draw(g){
        for(let r = 0; r < this.segments.length; r++){
            this.segments[r].draw(g);
        }
    }
    loadFlowerColor(rgbs){
        if(!rgbs){
            return {r: Math.floor(Math.random()*256), g: Math.floor(Math.random()*256), b: Math.floor(Math.random()*256)};
        }
        else{
            return rgbs;
        }
    }
    calcNextGenFlower(){
        if(Math.random() > this.mutationChance){
            let tempColor = JSON.parse(JSON.stringify(this.flowerColor));
            let tempSize = this.flowerSize;
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
    calcNewSeeds(){
        let seedChance = Math.random();
        if(seedChance < .2){
            return [];
        }
        if(seedChance >= .2 && seedChance < .8){
            let newVals = this.calcNextGenFlower();
            let xOffset = Math.round(Math.random()*20)-10;
            let yOffset = Math.round(Math.random()*20)-10;
            let newCoords = this.verifyXYInBounds(xOffset, yOffset);
            return [new plant(newCoords[0], newCoords[1], newVals[1], newVals[0], this.mutationChance)];
        }
        if(seedChance >= .8){
            let newVals = this.calcNextGenFlower();
            let xOffset = Math.round(Math.random()*20)-10;
            let yOffset = Math.round(Math.random()*20)-10;
            let newCoords = this.verifyXYInBounds(xOffset, yOffset);
            return [new plant(newCoords[0], newCoords[1], newVals[1], newVals[0], this.mutationChance), 
                    new plant(newCoords[0], newCoords[1], newVals[1], newVals[0], this.mutationChance)];
        }
    }
    verifyXYInBounds(adjustX, adjustY){
        let newX = this.x + adjustX;
        let newY = this.y + adjustY;
        if(newX > flowerbed.width){
            newX = flowerbed.width;
        }
        else if(newX < 0){
            newX = 0;
        }

        if(newY > flowerbed.height){
            newY = flowerbed.height;
        }
        else if(newY < 0){
            newY = 0;
        }
        return [newX, newY];
    }
    
}
class flowerSegment{
    constructor(x,y, rgbs, size){
        //Flower Color (r, g, b)
        //Petal shape
        //Flower size
        this.x = x;
        this.y = y;
        this.rgbs = rgbs; //{r, g, b} values
        this.size = size; //Radius
    }
    draw(g){
        g.drawFlower(this);
    }
    get color(){
        return "rgb("+this.rgbs.r+","+this.rgbs.g+","+this.rgbs.b+")";
    }
}

class stemSegment{
    constructor(){
        
    }
}

class leafSegent{
    constructor(){

    }
}