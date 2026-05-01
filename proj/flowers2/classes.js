class Plant{
    constructor(x, y, decayColor){
        this.x = x;
        this.y = y;
        this.sections = [];
        this.decayRgbs = decayColor;
    }
    draw(arty){
        for(let r = 0; r < this.sections.length; r++){
            this.sections[r].draw(arty);
        }
    }
    grow(){
        let deadCount = 0;
        for(let r = 0; r < this.sections.length; r++){
            let resp = this.sections[r].grow();
            if(resp == "dead"){
                deadCount++;
            }
        }
        if(deadCount == this.sections.length){
            return "dead";
        }
        else{
            return "growing";
        }
    }
}

class PlantSection{
    constructor(parent, rgbs){
        this.parentPlant = parent;
        this.rgbs = rgbs;
        this.mature = false;
        this.dead = false;
        this.age = 0;
    }
    get color(){
        return "rgb("+this.rgbs.r+","+this.rgbs.g+","+this.rgbs.b+")";
    }
    draw(arty){
        console.log("default draw() not overridden!");
    }
    grow(){
        console.log("default grow() not overridden!");
    }
}

class Flower extends PlantSection{
    constructor(parent, color){
        super(parent, color);
        this.parts = [];
    }
    draw(arty){

    }
}

class Petal extends PlantSection{
    
}

class Stem extends PlantSection{
    constructor(parent, color, thickness, sp, ep, cp1, cp2){
        super(parent, color);
        this.thickness = thickness;
        this.startPoint = sp;
        this.endPoint = ep;
        this.controlPoint1 = cp1;
        this.controlPoint2 = cp2;
    }
    draw(art){
        art.drawStem(this);
    }
}

class Leaf extends PlantSection{
    
}

class Blade extends PlantSection{
    constructor(parent, color, thickness, sp, ep, cp){
        super(parent, color);
        this.finalThickness = thickness;
        this.thickness = .5;
        this.finalCoords = ep;
        this.finalCp = cp;
        this.startPoint = sp;
        this.endPoint = {x:sp.x, y:sp.y}; //Set for 0 growth
        this.controlPoint = {x: sp.x, y:sp.y}; //Set for 0 growth
    }
    draw(art){
        art.drawBlade(this);
    }
    grow(sunlight){
        if(!this.mature){
            let currentDistance = findLengthPoints(this.endPoint.x, this.finalCoords.x, this.endPoint.y, this.finalCoords.y);   
            if(currentDistance > 0){
                let goalWidth = this.finalCoords.x - this.startPoint.x;
                let goalHeight = this.finalCoords.y - this.startPoint.y;
                let goalCpWidth = this.finalCp.x - this.startPoint.x;
                let goalCpHeight = this.finalCp.y - this.startPoint.y;
                this.endPoint.x += goalWidth * .1 + Math.floor(Math.random()* (goalWidth*.05));
                this.endPoint.y += goalHeight * .1 + Math.floor(Math.random()*(goalHeight*.05));
                this.controlPoint.x += goalCpWidth *.1;
                this.controlPoint.y += goalCpHeight *.1;
                if(this.endPoint.y <= this.finalCoords.y){
                    this.endPoint.x = this.finalCoords.x;
                    this.endPoint.y = this.finalCoords.y;
                    this.mature = true;
                    return "mature";
                }
            }
            if(this.thickness < this.finalThickness){
                this.thickness += this.finalThickness * .1; 
            }
        }
        else{
            this.age++;
            if(this.age > 10){
                if(!this.dead){
                    let newCol = colorLerp(this.rgbs, this.parentPlant.decayRgbs, ((this.age-10)/10));
                    this.rgbs = newCol;
                    this.endPoint.y += 3 + Math.floor(Math.random()*5);
                    if(this.endPoint.y > this.startPoint.y){
                        this.endPoint.y = this.startPoint.y;
                    }
                    this.controlPoint.y += 3 + Math.floor(Math.random()*3);
                    if(this.controlPoint.y > this.startPoint.y-5){
                        this.controlPoint.y = this.startPoint.y-5;
                        this.dead = true;
                        return "dead";
                    }
                }
                else{
                    return "dead";
                }
            }
        }
    }
}