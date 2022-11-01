var count = 0;
var inc = 1;
var milliseconds = 1000;
var paused = false;
var ticker = setInterval(incCounter, milliseconds);

function incCounter(){
    count += inc;
    document.getElementById("testCounter").innerHTML = count;
    document.getElementById("speedVal").innerHTML = milliseconds;
}

function incMilliseconds(){
    if(milliseconds >= 1){
        milliseconds--;
    }
    clearInterval(ticker);
    ticker = setInterval(incCounter, milliseconds);
}

function incInc(){
    inc++;
}

function togglePause(){
    if(paused){
        ticker = setInterval(incCounter, milliseconds);
        paused = false;
        document.getElementById("pauseBtn").innerHTML = "Pause Time";
    }
    else{
        clearInterval(ticker);
        paused = true;
        document.getElementById("pauseBtn").innerHTML = "Unpause Time";
    }
}