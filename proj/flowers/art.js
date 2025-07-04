class artist{
    constructor(ctx){
        this.G = ctx;
    }
    drawFlower(flower){
        this.G.beginPath();
        this.G.fillStyle = flower.color;
        this.G.strokeStyle = flower.color;   
        this.G.arc(flower.x, flower.y, flower.size, 0, 2*Math.PI);   
        this.G.fill();
        this.G.stroke();
    }
}