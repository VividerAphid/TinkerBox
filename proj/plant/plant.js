class plant{
    constructor(startX, startY, stemColor, flowerColor, canvasHeight){
        this.currentX = startX;
        this.currentY = startY;
        this.stemColor = stemColor;
        this.flowerColor = flowerColor;
        let minHeight = canvasHeight*.4;
        this.maxHeight = Math.floor(Math.random()* (canvasHeight - minHeight)) + minHeight; //Max height in pixels, not relative y location
    }

    calcTurn(length){
        let angle = (Math.floor(Math.random()*60) - 30) + 270;
        let newX = Math.round(length * Math.cos(this.degreesToRadians(angle)) + this.currentX);
        let newY = Math.round(length * Math.sin(this.degreesToRadians(angle)) + this.currentY);
        this.currentX = newX;
        this.currentY = newY;
    }

    degreesToRadians(degrees){
        return degrees * (Math.PI/180);
    }
    
    radiansToDegrees(radians){
        return radians * (180/Math.PI);
    }
}