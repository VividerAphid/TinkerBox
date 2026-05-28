var time = [0, 0];
var timeInterval = "";
var tickSpeed = 100;
var day = 360;
var year = 1;
var yearLength = 365;
var temperature = 0;
var temperatureRangeLows = [-10, 75];
var temperatureRangeHighs = [0, 100];
var currentTempRange = [-420,-420]; //implausible defaults on purpose
var peakTempDay = Math.round(yearLength/2);

calcCurrentTempRange();

function tickTime(){
    if(time[1] < 59){
        time[1]++;
    }
    else{
        time[1] = 0;
        if(time[0] < 23){
            time[0]++;
        }
        else{
            time[0] = 0;
            calcCurrentTempRange();
            if(day < yearLength){
                day++;
            }
            else{
                day = 1;
                year++;
            }
        }
    }
    let hourString = (time[0] < 10) ? "0"+time[0] : time[0];
    let minuteString = (time[1] < 10) ? "0"+time[1] : time[1];
    document.getElementById("timeP").innerHTML = "Time: "+ hourString + ":" + minuteString;
    document.getElementById("dayP").innerHTML = "Day: "+ day;
    document.getElementById("yearP").innerHTML = "Year: "+ year;
}

function tickTemperature(){
    if(time[0] < 12){
        temperature = lerp(currentTempRange[0], currentTempRange[1], (time[0]/12));
    }
    else{
        temperature = lerp(currentTempRange[1], currentTempRange[0], ((time[0]-12)/12));
    }
    document.getElementById("tempP").innerHTML = "Temperature: " + Math.round(temperature) +"f";
}

function tickWorld(){
    tickTime();
    //calcCurrentTempRange();
    tickTemperature();
}

function calcCurrentTempRange(){
    if(day < peakTempDay){
        currentTempRange[0] = lerp(temperatureRangeLows[0], temperatureRangeLows[1], day/peakTempDay);
        currentTempRange[1] = lerp(temperatureRangeHighs[0], temperatureRangeHighs[1], day/peakTempDay);
    }
    else{
        currentTempRange[0] = lerp(temperatureRangeLows[1], temperatureRangeLows[0], (day-peakTempDay)/peakTempDay);
        currentTempRange[1] = lerp(temperatureRangeHighs[1], temperatureRangeHighs[0], (day-peakTempDay)/peakTempDay);
    }
}

function startTime(){
    timeInterval = setInterval(tickWorld, tickSpeed);
}

function stopTime(){
    clearInterval(timeInterval);
}