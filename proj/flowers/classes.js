class plant{
    constructor(x, y, flowerSize=10, rgbs, mutationChance=0.5, pattern=["S","F"], flowerRgbs){
        //Leaf shape
        //Height
        //Seed count
        //Stem count
        this.x = x;
        this.y = y;
        this.pattern = pattern; //Our growth string
        this.patternIndex = 0; //Which growth step we are on
        this.stemRgbs = rgbs;
        this.currentRgbs = JSON.parse(JSON.stringify(rgbs));
        this.mutationChance = mutationChance;
        this.flowerSize = flowerSize;
        this.flowerColor = this.loadFlowerColor(flowerRgbs);
        this.decayColor = {r:145, g:100, b:48};
        this.segments = [];
        this.growing = true;
        this.age = 0;
        this.maxAge = Math.round(Math.random()*21)+40;
        this.decayAge = Math.round(this.maxAge*.66);
    }
    draw(g){
        for(let r = 0; r < this.segments.length; r++){
            this.segments[r].draw(g);
        }
    }
    get color(){
        return "rgb("+this.stemRgbs.r+","+this.stemRgbs.g+","+this.stemRgbs.b+")";
    }
    loadFlowerColor(rgbs){
        if(!rgbs){
            return {r: Math.floor(Math.random()*256), g: Math.floor(Math.random()*256), b: Math.floor(Math.random()*256)};
        }
        else{
            return rgbs;
        }
    }
    grow(){
        for(let r = 0; r < this.segments.length; r++){
            this.segments[r].grow();
        }
        this.calcNextGrowth();
    }
    calcNextGrowth(){
        if(this.growing){
            let prevSegment = {x2: this.x, y2: this.y, angle: 0, rgbs: this.stemRgbs};
            if(this.segments[this.patternIndex-1]){prevSegment = this.segments[this.patternIndex-1];}
            if(this.pattern[this.patternIndex] == "S"){
                let newCoords = this.calcTurn(prevSegment.x2, prevSegment.y2, 270, 30);
                this.segments.push(new stemSegment(prevSegment.x2, newCoords[0], prevSegment.y2, newCoords[1], this.currentRgbs, 1, this));
            }
            else if(this.pattern[this.patternIndex] == "L"){
                let newCoords = this.calcTurn(prevSegment.x2, prevSegment.y2, 240, 30);
                this.segments.push(new stemSegment(prevSegment.x2, newCoords[0], prevSegment.y2, newCoords[1], this.currentRgbs, 1, this));
            }
            else if(this.pattern[this.patternIndex] == "R"){
                let newCoords = this.calcTurn(prevSegment.x2, prevSegment.y2, 300, 30);
                this.segments.push(new stemSegment(prevSegment.x2, newCoords[0], prevSegment.y2, newCoords[1], this.currentRgbs, 1, this));
            }
            else if(this.pattern[this.patternIndex] == "F"){
                this.segments.push(new flowerSegment(prevSegment.x2, prevSegment.y2, this.flowerColor, this.flowerSize, 270, this));
            }
            if(this.patternIndex == this.pattern.length){
                this.growing = false;
            }
            else{
                this.patternIndex++;
            }  
        }
        else{
            this.age++;
            if(this.age == this.maxAge){
                plantDeath(this);
            }
            else if(this.age >= this.decayAge){
                let decayAge = this.maxAge - this.age;
                let maxDecayAge = this.maxAge - this.decayAge;
                this.currentRgbs = colorLerp(this.decayColor, this.stemRgbs, (decayAge / maxDecayAge));
            }
        }
    }
    calcTurn(x, y, angle, length){
        let newX = Math.round(length * Math.cos(this.degreesToRadians(angle)) + x);
        let newY = Math.round(length * Math.sin(this.degreesToRadians(angle)) + y);
        return [newX, newY];
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
        let newPattern = this.calcPatternMutate();
        if(seedChance < .2){
            return [];
        }
        if(seedChance >= .2 && seedChance < .8){
            let newVals = this.calcNextGenFlower();
            let xOffset = Math.round(Math.random()*40)-20;
            let yOffset = 0;//Math.round(Math.random()*20)-10;
            let newCoords = this.verifyXYInBounds(xOffset, yOffset);
            return [new plant(newCoords[0], newCoords[1], newVals[1], this.stemRgbs, this.mutationChance, newPattern, newVals[0])];
        }
        if(seedChance >= .8){
            let newVals = this.calcNextGenFlower();
            let xOffset = Math.round(Math.random()*40)-20;
            let yOffset = 0;//Math.round(Math.random()*20)-10;
            let newCoords = this.verifyXYInBounds(xOffset, yOffset);
            return [new plant(newCoords[0], newCoords[1], newVals[1], this.stemRgbs, this.mutationChance, newPattern, newVals[0]), 
                    new plant(newCoords[0], newCoords[1], newVals[1], this.stemRgbs, this.mutationChance, newPattern, newVals[0])];
        }
    }
    calcPatternMutate(){
        let newPattern = this.pattern.slice();
        let opts = ["L", "S", "R"];
        if(Math.random() < this.mutationChance){ 
            for(let r = 0; r < newPattern.length-1; r++){
                if(Math.random() > this.mutationChance){
                    let pick = opts[Math.floor(Math.random()*opts.length)];
                    if(Math.random() > .5 && newPattern.length < maxPlantSegHeight){
                        newPattern.splice(r, 0, pick);
                    }
                    else{
                        newPattern[r] = pick;
                    }
                }
            }
            newPattern[newPattern.length-1] = "F";
            return newPattern;
        }
        else{
            return this.pattern;
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
    degreesToRadians(degrees){
        return degrees * (Math.PI/180);
    }
    
    radiansToDegrees(radians){
        return radians * (180/Math.PI);
    }

    //Growth pattern
    //L = left, R = right, S = straight, F = flower
    //All directions are relative to previous stem direction
    //Any node without a flower next will spawn a leaf
    //[S, S, F]
    //[S, [L, R], F]
    
}
class plantSegment{
    constructor(x, y, rgbs, angle, basePlant){
        this.x = x;
        this.y = y;
        this.rgbs = rgbs; //{r, g, b} values
        this.angle = angle; //Angle the segment is facing in degrees
        this.mature = false;
        this.age = 0;
        this.basePlant = basePlant;
    }
    draw(g){
        console.log("draw() not overloaded!");
    }
    setColor(rgbs){
        this.rgbs = rgbs;
    }
    grow(){
        console.log("grow() not overloaded!");
    }
    get color(){
        return "rgb("+this.rgbs.r+","+this.rgbs.g+","+this.rgbs.b+")";
    }
}
class flowerSegment extends plantSegment{
    constructor(x, y, rgbs, size, angle, basePlant){
        //Petal shape
        super(x, y, basePlant.stemRgbs, angle, basePlant);
        this.currentSize = 1;
        this.maxSize = size;
        this.maxAge = basePlant.maxAge;
        this.fullBloomAge = Math.round(this.maxAge*.33);
        this.bloomDeathAge = Math.round(this.maxAge*.66);
        this.decaySizeAmount = (size - 1) / (this.maxAge - this.bloomDeathAge);
        this.basePlantRgbs = basePlant.stemRgbs;
        this.rgbs = JSON.parse(JSON.stringify(this.basePlantRgbs));
        this.finalRgbs = rgbs;
    }
    draw(g){
        g.drawFlower(this);
    }
    grow(){
        if(this.mature){
            if(this.age >= this.bloomDeathAge && this.currentSize > 1){
                this.currentSize -= this.decaySizeAmount;
                if(this.currentSize < 0){
                    this.currentSize = 1;
                }
            }
        }
        else{
            this.currentSize++;
            if(this.currentSize >= this.maxSize){
                this.mature = true;
            }
        }
        this.age++;
        if(this.age <= this.fullBloomAge){
            this.rgbs = colorLerp(this.basePlantRgbs, this.finalRgbs, (this.age/this.fullBloomAge));
        }
        else{
            this.mature = true;
            if(this.age >= this.bloomDeathAge){
                let decayAgeMax = this.maxAge - this.bloomDeathAge;
                let currentDecayAge = this.maxAge - this.age;
                this.rgbs = colorLerp(this.basePlant.decayColor, this.finalRgbs, (currentDecayAge / decayAgeMax))
            }
        }
    }
}

class stemSegment extends plantSegment{
    constructor(x, x2, y, y2, rgbs, angle, basePlant){
        super(x, y, rgbs, angle, basePlant);
        this.x2 = x2;
        this.y2 = y2;
        this.length = 0;
        this.maxLength = 30;
    }
    draw(g){
        g.drawSegment(this);
    }
    grow(){
        this.age++;
        if(this.age >= this.basePlant.decayAge){
            this.rgbs = this.basePlant.currentRgbs;
        }
    }
}

class leafSegent extends plantSegment{
    constructor(x, y, rgbs, angle, basePlant){
        super(x, y, rgbs, angle);
    }
}