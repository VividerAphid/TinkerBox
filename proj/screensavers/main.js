function render(){
    art.ctx.clearRect(0, 0, can.width, can.height);
    for(let r = 0; r < activeScreensavers.length; r++){
        activeScreensavers[r].renderTick();
    }
}
function startInterval(){
    if(renderInterval == ""){
        renderInterval = setInterval(render, renderMs);
    }
}

function stopInterval(){
    clearInterval(renderInterval);
    renderInterval = "";
}

function setCanvasDimensions(){
  can.width = (document.documentElement.clientWidth)*.97;
  can.height = (document.documentElement.clientHeight)*.9;
}

function initListeners(){
    window.onresize = setCanvasDimensions;
    setCanvasDimensions();
}

initListeners();
var ctx = can.getContext("2d");
var art = new Artist(ctx);
var activeScreensavers = [new FlowerHeadSplatter(can.width, can.height, art)];
var renderInterval = "";
var renderMs = 50;