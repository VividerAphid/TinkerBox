class plant{
    constructor(startX, startY, stemColor, flowerColor, canvasHeight){
        this.growing = true;
        this.currentX = startX;
        this.currentY = startY;
        this.stemColor = stemColor;
        this.segments = [new stem(startX, startY, startX, startY, stemColor)];
        this.flowerColor = flowerColor;
        let minHeight = canvasHeight*.4;
        this.maxHeight = Math.floor(Math.random()* (canvasHeight - minHeight)) + minHeight; //Max height in pixels, not relative y location
    }

    calcNewSegment(length){
        if(this.growing){
            let oX = this.currentX;
            let oY = this.currentY;
            this.calcTurn(length);
            let nX = this.currentX;
            let nY = this.currentY;
            if(this.currentY > (this.segments[0].y1 - this.maxHeight)){
                this.segments.push(new stem(oX, oY, nX, nY, this.stemColor));
            }
            else{
                this.segments.push(new flower(oX, oY, this.flowerColor));
                this.growing = false;
            }
        }
    }

    calcTurn(length){
        let angle = (Math.floor(Math.random()*60) - 30) + 270;
        let newX = Math.round(length * Math.cos(this.degreesToRadians(angle)) + this.currentX);
        let newY = Math.round(length * Math.sin(this.degreesToRadians(angle)) + this.currentY);
        this.currentX = newX;
        this.currentY = newY;
    }

    render(ctx){
        for(let r = 0; r < this.segments.length; r++){
            this.segments[r].render(ctx);
        }
    }

    degreesToRadians(degrees){
        return degrees * (Math.PI/180);
    }
    
    radiansToDegrees(radians){
        return radians * (180/Math.PI);
    }
}

class stem{
    constructor(x1, y1, x2, y2, color){
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.color = color;
    }
    render(ctx){
        ctx.drawStem(this);
    }
}

class flower{
    constructor(x, y, color){
        this.x = x;
        this.y = y;
        this.color = color;
    }
    
    render(ctx){
        ctx.drawFlower(this);
    }
}