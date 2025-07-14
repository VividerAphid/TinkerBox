class Artist{
    constructor(ctx){
        this.ctx = ctx;
    }
    drawFlower(flower){
        this.ctx.beginPath();
        this.ctx.fillStyle = flower.color;
        this.ctx.strokeStyle = flower.color;   
        this.ctx.arc(flower.x, flower.y, flower.size, 0, 2*Math.PI);   
        this.ctx.fill();
        this.ctx.stroke();
    }
}