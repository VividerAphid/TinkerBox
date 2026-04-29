class Plant{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.sections = [];
    }
}

class PlantSection{
    constructor(parent, color){
        this.parentPlant = parent;
        this.color = color;
    }
    draw(arty){
        console.log("default not overriden!");
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
        this.thickness = thickness;
        this.startPoint = sp;
        this.endPoint = ep;
        this.controlPoint = cp;
    }
    draw(art){
        art.drawBlade(this);
    }
}