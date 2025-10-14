var itemDefinitions = [
    new Item(1, "Copper Coin", 1),
    new Item(2, "Silver Coin", 5),
    new Item(3, "Gold Coin", 10),
    new Item(4, "2 Dollar Bill", 100),
    new Item(5, "Crumb", 1),
    new Item(6, "Dust Bunny", 2),
    new Item(7, "Cobweb", 2),
    new Item(8, "Stone", 2),
    new Item(9, "Stick", 1),
    new Item(10, "Coal Chunk", 5),
    new Item(11, "Red Gem", 15),
    new Item(12, "Blue Gem", 15),
    new Item(13, "Green Gem", 15),
    new Item(14, "White Gem", 50),
    new Item(15, "Gold Nugget", 35),
    new Item(16, "Sword", 30),
    new Item(17, "Shield", 25),
    new Item(18, "Dagger", 20),
    new Item(19, "Apple", 5),
    new Item(20, "Bread", 7),
    new Item(21, "Cheese", 10),
];

var lootTables = {
    coinChest: {name: "Coin Chest", table:[{id:1, chance:10}, {id:2, chance:5}, {id:3, chance:3}, {id:4, chance:1}]},
    snackChest: {name: "Snack Chest", table:[{id: 19, chance:10}, {id:20, chance:7}, {id:21, chance:5}]},
    minersChest: {name: "Miners Chest", table:[{id: 8, chance:20}, {id: 10, chance:15}, {id: 11, chance:10},{id: 12, chance:10}, {id: 13, chance:10},{id: 14, chance:3},{id: 15, chance:5}]},
    gearChest: {name: "Gear Chest", table:[{id:16, chance:1},{id: 17, chance:1}, {id: 18, chance:1}]},
    junkChest: {name: "Junk Chest", table:[{id: 5, chance:10},{id: 6, chance:7}, {id: 7, chance:7}, {id: 8, chance:7}, {id: 9, chance:10}, {id: 10, chance:1}]},
    everythingChest: {name: "Everything Chest", table: addAll()},
};

function addElement(props){
    //Takes in {type, id, class, parent, innards}
    let child = document.createElement(props.type);
    child.id = props.id;
    child.className = props.class;
    props.parent.appendChild(child);
    child.innerHTML = props.innards;
    return child;
}

function addAll(){
    let list = [];
    for(let r = 0; r < itemDefinitions.length; r++){
        list.push({id:itemDefinitions[r].id, chance:1});
    }
    return list;
}

function convertLootTable(table){
    let loot = [];
    for(let r = 0; r < table.length; r++){
        for(let t = 0; t < table[r].chance; t++){
            loot.push(table[r].id);
        }
    }
    return loot;
}

function pickRandomChest(){
    let keys = Object.keys(lootTables);
    let pick = Math.floor(Math.random()*keys.length);
    return new Chest(lootTables[keys[pick]].name, convertLootTable(lootTables[keys[pick]].table));
}

function openChest(){
    let chest = pickRandomChest();
    chest.rollLoot();
    nameHeader.innerHTML = chest.name;
    contentsDiv.innerHTML = "Contents: <br>";
    let list = addElement({type: "ul", id:"lootList", class:"", parent: contentsDiv, innards:""});
    for(let r = 0; r < chest.contents.length; r++){
        addElement({type: "li", id:"lootListItem"+r, class:"", parent: list, innards:chest.contents[r].name + ", Value: "+chest.contents[r].value});
    }
    valueDiv.innerHTML = "Total Value: " + chest.lootValue;
    openButton.innerHTML = "Next Chest";
    printChest(chest);
}

function printChest(chest){
    console.log(chest.name);
    console.log(chest.contents);
    console.log(chest.lootValue);
}