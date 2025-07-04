function spawnFlowers(count){
    for(let r = 0; r < count; r++){
        let padding = 100;
        let radius = 300;
        let x = (flowerbed.width/2) + Math.floor(Math.random()*radius) - radius/2;
        let y = (flowerbed.height/2) + Math.floor(Math.random()*radius) - radius/2;
        let colors = {r: 48, g: 148, b:38};
        plants.push(new plant(x, y, 15, colors, 0.1));
    }
}

function render(){
    arty.G.clearRect(0, 0, flowerbed.width, flowerbed.height);
    for(let r = 0; r < plants.length; r++){
        plants[r].draw(arty);
    }
}

function nextGen(){
    let newPlants = [];
    for(let r = 0; r < plants.length; r++){
        let newSeeds = plants[r].calcNewSeeds();
        for(let t = 0; t < newSeeds.length; t++){
            newPlants.push(newSeeds[t]);
        }
    }
    plants = newPlants;
    if(plants.length > stats.peakPlantCount){
        stats.peakPlantCount = plants.length;
    }
    if(plants.length == 0){
        console.log("Peak: "+stats.peakPlantCount);
        console.log("Generations: "+stats.generations);
        spawnFlowers(startingFlowers);
        stats.peakPlantCount = plants.length;
        stats.generations = 0;
    }
    else{
        stats.generations++;
    }
    render();
}

function startGrowTick(){
    growTick = setInterval(nextGen, 100);
}

function stopGrowTick(){
    clearInterval(growTick);
}

//-------------------------------

var arty = new artist(flowerbed.getContext('2d'));
var plants = []; 
var startingFlowers = 50;
var stats = {peakPlantCount: startingFlowers, generations: 0};
spawnFlowers(startingFlowers);
render();
var growTick = "";