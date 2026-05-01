function testArt(){
    new Blade({}, "#0a0", 5, {x:150, y:150}, {x: 200, y:50}, {x:160, y:45}).draw(arty);
    new Blade({}, "#0a0", 5, {x:150, y:150}, {x: 100, y:50}, {x:140, y:45}).draw(arty);
    new Stem({}, "#0c0", 5, {x:150, y:150}, {x:150, y:40}).draw(arty);
    new Stem({}, "#d0a", 4, {x:150, y:40}, {x:140, y:35}).draw(arty);
    new Stem({}, "#d0a", 4, {x:150, y:40}, {x:150, y:30}).draw(arty);
    new Stem({}, "#d0a", 4, {x:150, y:40}, {x:160, y:35}).draw(arty);
    new Stem({}, "#f06", 4, {x:150, y:40}, {x:145, y:33}).draw(arty);
    new Stem({}, "#f06", 4, {x:150, y:40}, {x:155, y:33}).draw(arty);
}

function testPlant(x){
    let base = {x:x, y:150};
    let cpOffset = .30;
    let height = 75 + Math.floor(Math.random()*20);
    let width = 30 + Math.floor(Math.random()*30);
    let thickness = 5;
    let decayColor = {r:170, g:153, b:0};
    let plantColor = {r:0, g:170, b:0};
    let plant = new Plant(base.x, base.y, decayColor);
    plant.sections.push(new Blade(plant, plantColor, thickness, base, {x:base.x-width, y:base.y-height}, {x:base.x-10, y:base.y-(height*cpOffset+height)}));
    plant.sections.push(new Blade(plant, plantColor, thickness, base, {x:base.x+width, y:base.y-height}, {x:base.x+10, y:base.y-(height*cpOffset+height)}));
    return plant;
}

function render(){
    arty.G.clearRect(0, 0, flowerbed.width, flowerbed.height);
    for(let r = 0; r < planties.length; r++){
        planties[r].draw(arty);
    }
}

function growthHandler(){
    let deadPlants = [];
    for(let r = 0; r < planties.length; r++){
        let resp = planties[r].grow();
        if(resp == "dead"){
            deadPlants.push(planties[r]);
        }
    }
    for(let r = 0; r < deadPlants.length; r++){
        planties = removeItem(planties, deadPlants[r]);
        planties.push(testPlant(Math.floor(Math.random()*200)+50));
    }
}

function tickHandler(){
    growthHandler();
    render();
}

function startTick(){
    gameTick = setInterval(tickHandler, tickSpeed);
}

function stopTick(){
    clearInterval(gameTick);
}

//-------------------

var ctx = document.getElementById("flowerbed").getContext("2d");
var arty = new Artist(ctx);
var tickSpeed = 500;
var gameTick = "";

var planties = [];
let x = 50;
for(let r = 0; r < 10; r++){
    planties.push(testPlant(x));
    x += 25;
}
startTick();