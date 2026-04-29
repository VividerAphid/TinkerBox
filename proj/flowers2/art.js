class Artist{
    constructor(ctx){
        this.G = ctx;
    }
    drawBlade(blade){
        //{color, thickness, startPoint, endPoint, controlPoint}
        this.G.beginPath();
        this.G.strokeStyle = blade.color;
        this.G.lineWidth = blade.thickness;
        this.G.lineCap = "round";
        this.G.moveTo(blade.startPoint.x, blade.startPoint.y); 
        this.G.quadraticCurveTo(blade.controlPoint.x, blade.controlPoint.y, blade.endPoint.x, blade.endPoint.y);
        this.G.stroke();
    }
    drawLeaf(leaf){

    }
    drawPetal(petal){
        
    }
    drawStem(stem){
        //{color, thickness, startPoint, endPoint, controlPoint1(optional), controlPoint2(optional)}
        this.G.beginPath();
        this.G.strokeStyle = stem.color;
        this.G.lineWidth = stem.thickness;
        this.G.lineCap = "round";
        this.G.moveTo(stem.startPoint.x, stem.startPoint.y);
        if(stem.controlPoint1 && stem.controlPoint2){
            this.G.bezierCurveTo(stem.controlPoint1.x, stem.controlPoint1.y, stem.controlPoint2.x, stem.controlPoint2.y, stem.endPoint.x, stem.endPoint.y);
        }
        else if(stem.controlPoint1 && !stem.controlPoint2){
            this.G.quadraticCurveTo(stem.controlPoint1.x, stem.controlPoint1.y, stem.endPoint.x, stem.endPoint.y);
        }
        else{
            this.G.lineTo(stem.endPoint.x, stem.endPoint.y);
        }
        this.G.stroke();
    }
}