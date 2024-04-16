class pen{
    constructor(ctx){
        this.G = ctx;
    }

    drawStem(stem){
        this.G.beginPath();
        this.G.fillStyle = stem.color;
        this.G.strokeStyle = stem.color;
        this.G.moveTo(stem.x1, stem.y1);
        this.G.lineTo(stem.x2, stem.y2);
        this.G.stroke();
    }
    drawFlower(flower){
        this.G.beginPath();
        this.G.fillStyle = flower.color;
        this.G.strokeStyle = flower.color;   
        this.G.arc(flower.x, flower.y, 10, 0, 2*Math.PI);   
        this.G.fill();
        this.G.stroke();
    }
    clearCanvas(){
        this.G.fillStyle = "#222";
        this.G.strokeStyle ="#222";
        this.G.fillRect(0,0,this.G.canvas.width, this.G.canvas.height);
    }
}