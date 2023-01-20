class pen{
    constructor(ctx){
        this.G = ctx;
    }

    drawSegment(plant){
        let fullGrown = true;       
        this.G.fillStyle = plant.stemColor;
        this.G.strokeStyle = plant.stemColor;
        this.G.moveTo(plant.currentX, plant.currentY);
        if(plant.currentY > (this.G.canvas.height - plant.maxHeight)){
            plant.calcTurn(10);
            fullGrown = false;
        }
        this.G.lineTo(plant.currentX, plant.currentY);
        this.G.stroke();
        if(fullGrown){
            this.drawFlower(plant);
        }
    }
    drawFlower(plant){
        //this.G.beginPath();
        this.G.fillStyle = plant.flowerColor;
        this.G.strokeStyle = plant.flowerColor;   
        this.G.arc(plant.currentX, plant.currentY, 10, 0, 2*Math.PI);   
        this.G.fill();
        //this.G.stroke();
    }
    clearCanvas(){
        this.G.fillStyle = "#222";
        this.G.strokeStyle ="#222";
        this.G.fillRect(0,0,this.G.canvas.width, this.G.canvas.height);
    }
}