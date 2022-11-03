(function(){

//var count = 0;
//var inc = 1;
//var milliseconds = 1000;
//var paused = true;
var ticker;
//var autoDropUnlocked = false;
var stats = {
    nukesDropped: 0,
    nukesPerDrop: 1,
    milliseconds: 1000,
    paused: true,
    shop: {
        autoDropUnlocked: false,
        npd: {
            lvl: 1,
            multiplier: 3,
            exponent: 2
        },
        monpd: {
            lvl: 1,
            multiplier: 3,
            exponent: 2
        },
        milli: {
            lvl: 1,
            multiplier: 2.2,
            exponent: 1.5
        },
    },
    money: 500,
    monpd: 0.5
};
//Level formula (lvl * x) ^2

initUIFunctions();

function incNukesDropped(){
    stats.nukesDropped += stats.nukesPerDrop;
    stats.money += stats.monpd;
    updateUI();
}
function updateUI(){
    document.getElementById("testCounter").innerHTML = "Nukes Dropped: " + stats.nukesDropped;
    document.getElementById("speedVal").innerHTML = "Nuke Drop Interval(in ms): " + stats.milliseconds;
    document.getElementById("incVal").innerHTML = "Nukes Per Drop: " + stats.nukesPerDrop;
    document.getElementById("moneyVal").innerHTML = "Money: $" + stats.money;
    document.getElementById("earnVal").innerHTML = "Money per drop: $" + stats.monpd;
}

function incMilliseconds(amt){
    let validMilli = false;
    if(stats.milliseconds >= 1){
        stats.milliseconds -= amt;
        validMilli = true;
    }
    if(stats.shop.autoDropUnlocked){
        clearInterval(ticker);
        ticker = setInterval(incNukesDropped, stats.milliseconds);
    }
    updateUI();
    return validMilli;
}

function togglePause(){
    if(stats.shop.autoDropUnlocked){
        if(stats.paused){
            ticker = setInterval(incNukesDropped, stats.milliseconds);
            stats.paused = false;
            document.getElementById("pauseBtn").innerHTML = "Pause Time";
        }
        else{
            clearInterval(ticker);
            stats.paused = true;
            document.getElementById("pauseBtn").innerHTML = "Unpause Time";
        }
    }
}

function initUIFunctions(){
    document.getElementById("dropBtn").onclick = incNukesDropped;
    document.getElementById("speedBtn").onclick = function(){
        let milliObj = stats.shop.milli;
        let cost = Math.round(Math.pow(milliObj.lvl * milliObj.multiplier, milliObj.exponent));
        if(stats.money >= cost){
            stats.money -= cost;
            stats.shop.milli.lvl++;
            let notMaxed = incMilliseconds(10);
            updateUI();
            let btn = document.getElementById("speedBtn");
            if(notMaxed){
                btn.innerHTML = "$" + Math.round(Math.pow(milliObj.lvl * milliObj.multiplier, milliObj.exponent));
            }
            else{
                btn.innerHTML = "Max";
            }
        }
    };
    document.getElementById("npdBtn").onclick = function(){
        let npdObj = stats.shop.npd;
        let cost = Math.round(Math.pow(npdObj.lvl * npdObj.multiplier, npdObj.exponent));
        if(stats.money >= cost){
            stats.money -= cost;
            stats.shop.npd.lvl++;
            stats.nukesPerDrop++;
            document.getElementById("npdBtn").innerHTML = "$" + Math.round(Math.pow(npdObj.lvl * npdObj.multiplier, npdObj.exponent));
            updateUI();
        }
    };
    document.getElementById("autoDropBtn").onclick = function(){
        if(!stats.shop.autoDropUnlocked){
            if(stats.money >= 500){
                stats.money -= 500; 
                stats.shop.autoDropUnlocked = true;
                togglePause();
                updateUI();
            }}};
    document.getElementById("mpdBtn").onclick = function(){
        let monpdObj = stats.shop.monpd;
        let cost = Math.round(Math.pow(monpdObj.lvl * monpdObj.multiplier, monpdObj.exponent));
        if(stats.money >= cost){
            stats.money -= cost;
            stats.shop.monpd.lvl++;
            stats.monpd = stats.shop.monpd.lvl * .5;
            document.getElementById("mpdBtn").innerHTML = "$" + Math.round(Math.pow(monpdObj.lvl * monpdObj.multiplier, monpdObj.exponent));
            updateUI();
        }
    }
    document.getElementById("pauseBtn").onclick = togglePause;
}
})();