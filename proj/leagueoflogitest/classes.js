class Game{
    constructor(){
        this.player = new Player();
        this.resourceColors = this.initResourceColors();
        this.nodes = this.generateResourceNodes();
        this.recipes = this.getRecipes();
    }
    initResourceColors(){
        return {
            metal: "#999",
            wood: "#b2692e",
            fiber: "#0a0",
            chemical: "#0cc",
        };
    }
    getRecipes(){
        let recips = {};
        recips.materials = getMaterialRecipes();
        recips.equipment = getEquipmentRecipes();
        recips.weapons = getWeaponRecipes();
        return recips;
    }
    generateResourceNodes(){
        let nodes = [];
        let types = ["metal", "wood", "fiber", "chemical"];
        let count = 12;
        for(let r = 0; r < count; r++){
            let x = Math.floor(Math.random()*gameCan.width);
            let y = Math.floor(Math.random()*gameCan.height);
            nodes.push(new ResourceNode(r, x, y, types[r%4], 10));
        }
        return nodes;
    }
}

class ResourceNode{
    constructor(id, x, y, type, amount){
        this.id = id;
        this.type = type;
        this.amount = amount;
        this.maxAmount = amount;
        this.x = x;
        this.y = y;
        this.size = 50;
    }
    render(G, colors){
        G.beginPath();
        G.fillStyle = colors[this.type];
        G.strokeStyle = colors[this.type];
        G.fillRect(this.x, this.y, (this.amount/this.maxAmount)*this.size, (this.amount/this.maxAmount)*this.size);
        G.stroke();
    }
    tick(){
        if(this.amount < this.maxAmount){
            this.amount++;
        }
    }
}

class Player{
    constructor(){
        this.inventory = {};
    }
    addToInventory(count, type){
        if(this.inventory[type]){
            this.inventory[type] += count;
        }
        else{
            this.inventory[type] = count;
        }
    }
}