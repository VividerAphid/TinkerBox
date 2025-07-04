var turnSignalTickSpeed = 400; //in ms
var turnSignalInterval;
var turnSignalLightOn = false;
var turnSignalDirection = "";
var microMults = [.125, .25, .5, 1, 2, 4];

function startTurnSignal(){
    let dirs = ["left", "right"];
    turnSignalDirection = dirs[Math.floor(Math.random()*dirs.length)];
    turnSignalInterval = setInterval(turnSignalMusic, turnSignalTickSpeed);
}

function stopTurnSignal(){
    clearInterval(turnSignalInterval);
    turnSignalLightOn = false;
    turnSignalDirection = "";
}

function microSignal(ms, message){
    setTimeout(tickPrint, ms, message);
}

function tickPrint(message){
    console.log(message);
}

function turnSignalMusic(){
    tickPrint("tick");
    turnSignalLightOn = !turnSignalLightOn;
    let microMsMult = microMults[Math.floor(Math.random()*microMults.length)];
    microSignal(turnSignalTickSpeed*microMsMult, "A");
}