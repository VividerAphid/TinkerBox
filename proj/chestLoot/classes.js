class Chest{
    constructor(name, lootTable){
        this.name = name;
        this.lootTable = lootTable;
        this.contents = [];
    }
    rollLoot(count=5){
        for(let r = 0; r < count; r++){
            let item = itemDefinitions[this.lootTable[Math.floor(Math.random()*this.lootTable.length)]-1];
            this.contents.push(item);
        }
    }
    get lootValue(){
        let total = 0;
        for(let r = 0; r < this.contents.length; r++){
            total += this.contents[r].value;
        }
        return total;
    }
    
}

class Item{
    constructor(id, name, value){
        this.id = id;
        this.name = name;
        this.value = value;
    }
}