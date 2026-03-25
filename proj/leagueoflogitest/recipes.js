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