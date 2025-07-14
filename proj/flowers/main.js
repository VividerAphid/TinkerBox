function spawnFlowers(count){
    for(let r = 0; r < count; r++){
        let padding = 100;
        let radius = 600;
        let x = Math.floor(Math.random()*flowerbed.width);//(flowerbed.width/2) + Math.floor(Math.random()*radius) - radius/2;
        let y = flowerbed.height;
        let colors = {r: 48, g: 148, b:38};
        let flowerColors = {r: 48, g: 190, b:38};//{r: 255, g: 0, b:0};
        let pattern = ["S", "S", "S", "F"];
        plants.push(new plant(x, y, 3, colors, 0.1, pattern, flowerColors));
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

function plantDeath(death){
    let newPlants = death.calcNewSeeds();
    plants = removeItem(plants, death);
    for(let r = 0; r < newPlants.length; r++){
        plants.push(newPlants[r]);
    }
}

function testPlantPattern(){
    let pattern = [];
    let segCount = 25;
    for(let r = 0; r < segCount; r++){
        let dir = 0;//Math.round(Math.random()*2);
        if(dir == 0){
            pattern.push("S");
        }

    }
    pattern.push("F");
    return pattern;
}

function plantGrow(){
    for(let r = 0; r < plants.length; r++){
        plants[r].grow();
    }
    render();
}

function startGrowTick(){
    if(growTick == ""){
        growTick = setInterval(plantGrow, tickSpeed);
    }
}

function stopGrowTick(){
    clearInterval(growTick);
    growTick = "";
}

//-------------------------------

var arty = new artist(flowerbed.getContext('2d'));
var plants = []; 
var startingFlowers = 100;
var tickSpeed = 50;
var maxPlantSegHeight = 25;
var stats = {peakPlantCount: startingFlowers, generations: 0};
spawnFlowers(startingFlowers);
render();
var growTick = "";