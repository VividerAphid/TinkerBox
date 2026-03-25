class Game{
    constructor(){
        this.player = new Player();
        this.resourceColors = this.initResourceColors();
        this.nodes = this.generateResourceNodes();
        this.factories = this.generateFactories();
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
            let x = Math.floor(Math.random()*gameCan.width/2);
            let y = Math.floor(Math.random()*gameCan.height);
            nodes.push(new ResourceNode(r, x, y, types[r%4], 10));
        }
        return nodes;
    }
    generateFactories(){
        let factories = [];
        let types = ["basicMaterial", "fabric", "explosivePowder", "metalBar", "metalPlate", "plastic"];
        for(let r = 0; r < types.length; r++){
            let x = Math.floor(Math.random()*(gameCan.width/2)+gameCan.width/2);
            let y = Math.floor(Math.random()*gameCan.height);
            factories.push(new ItemFactory(r, x, y, types[r]));
        }
        return factories;
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

class ItemFactory{
    constructor(id, x, y, type){
        this.id = id;
        this.x = x;
        this.y = y;
        this.type = type;
        this.product = getFactoryProducts(type);
        this.producing = false;
        this.productionProgress = 0;
        this.inventory = {};
        this.inventory[type] = 0;
        this.size = 60;
        this.widthMult = 1.25;
    }
    render(G){
        G.fillStyle = "#5f4b32";
        G.strokeStyle = "#5f4b32";
        G.fillRect(this.x, this.y, this.size*this.widthMult, this.size);
        let labelFont = "bold 15px Consolas";
        drawText(G, this.x, this.y+10, this.type, labelFont, "#fff");
        if(this.producing){
            drawText(G, this.x, this.y+30, "Progress: "+Math.floor(100*(this.productionProgress/this.product.time))+"%", labelFont, "#fff");
        }
        if(this.inventory[this.type] > 0){
            drawText(G, this.x, this.y+50, "Finished: "+this.inventory[this.type], labelFont, "#fff");
        }
        G.stroke();
    }
    receiveMaterials(materials){
        for(const [key, value] of Object.entries(materials)){
            if(this.inventory[key]){
                this.inventory[key] += value;
            }
            else{
                this.inventory[key] = value;
            }
        }
        this.producing = checkCraftable(this.product, this.inventory);
    }
    sendProducts(){
        let outgoing = this.inventory[this.type];
        this.inventory[this.type] = 0;
        return outgoing;
    }
    tick(){
        if(this.producing){
            if(this.productionProgress < this.product.time){
                this.productionProgress++;
            }
            else{
                this.inventory[this.type] += this.product.makes;
                for(const [key, value] of Object.entries(this.product.cost)){
                    this.inventory[key] -= value;
                }
                this.productionProgress = 0;
                this.producing = checkCraftable(this.product, this.inventory);
            }
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