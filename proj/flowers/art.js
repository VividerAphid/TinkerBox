class artist{
    constructor(ctx){
        this.G = ctx;
    }
    drawFlower(flower){
        this.G.beginPath();
        this.G.fillStyle = flower.color;
        this.G.strokeStyle = flower.color;   
        this.G.arc(flower.x, flower.y, flower.currentSize, 0, 2*Math.PI);   
        this.G.fill();
        this.G.stroke();
    }
    drawSegment(seg){
        this.G.beginPath();
        this.G.fillStyle = seg.color;
        this.G.strokeStyle = seg.color;   
        this.G.moveTo(seg.x, seg.y);
        this.G.lineTo(seg.x2, seg.y2);
        this.G.stroke();
    }
}