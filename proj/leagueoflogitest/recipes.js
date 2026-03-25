function getMaterialRecipes(){
    return {
        basicMaterial: {name: "basicMaterial", cost: {wood:1, metal:1}, makes: 1},
        explosivePowder: {name:"explosivePowder", cost: {chemical:2}, makes: 1},
        fabric: {name: "fabric", cost: {fiber:2}, makes: 1},
        metalBar: {name: "metalBar", cost:{metal:2}, makes: 1},
        metalPlate: {name: "metalPlate", cost: {metal: 4}, makes: 1},
        plastic: {name: "plastic", cost:{chemical: 2}, makes: 1},
    };
}

function getEquipmentRecipes(){
    return {
        soldierSupply: {name: "soldierSupply", cost: {basicMaterial: 1, fabric: 1}, makes: 2},
        shovel: {name: "shovel", cost: {basicMaterial: 2}, makes: 1},
        hammer: {name: "hammer", cost: {basicMaterial: 2}, makes: 1},
        bandage: {name: "bandage", cost: {fabric: 2}, makes: 5},
        medkit: {name: "medkit", cost:{fabric: 2, plastic: 1}, makes: 1},
    };
}

function getWeaponRecipes(){
    return {
        basicRifle: {name: "basicRifle", cost: {basicMaterial: 2}, makes: 1},
        basicAmmo: {name: "basicAmmo", cost: {explosivePowder: 1, metalBar: 1}, makes: 5},
        basicGrenade: {name: "basicGrenade", cost: {basicMaterial: 1, explosivePowder: 1}, makes: 3},
    }
}

function getFactoryProducts(type){
    let products = {
        basicMaterial: {cost: {wood: 3, metal: 3}, makes: 5, time: 3},
        fabric: {cost: {fiber: 3}, makes: 5, time: 3},
        explosivePowder: {cost: {chemical: 4}, makes: 5, time:4}, 
        metalBar: {cost: {metal: 4}, makes: 5, time:4},
        metalPlate: {cost: {metal: 8}, makes: 3, time: 5},
        plastic: {cost: {chemical: 4}, makes: 5, time: 4},
        soldierSupply: {cost: {basicMaterial: 3, fabric: 3}, makes: 10, time: 5},
        shovel: {cost: {basicMaterial: 6}, makes: 5, time: 4},
        hammer: {cost: {basicMaterial: 6}, makes: 5, time: 4},
        bandage: {cost: {fabric: 4}, makes: 15, time: 3},
        medkit: {cost: {fabric: 4, plastic: 2}, makes: 3, time: 5},
        basicRifle: {cost: {basicMaterial: 6}, makes: 5, time: 4},
        basicAmmo: {cost: {explosivePowder: 3, metalBar: 3}, makes: 20, time: 3},
        basicGrenade: {cost:{basicMaterial: 3, explosivePowder: 3}, makes: 12},
    }
    return products[type];
}