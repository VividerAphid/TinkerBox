function testDiff(){
    let day = new Date("2026-9-10");
    let daysBefore = 45;
    console.log(daysBefore + " days before " + day.toDateString() + " is "+ calcDateXDaysFrom(day, daysBefore, true).toDateString());

    let d1 = new Date("2026-9-10");
    let d2 = new Date();
    console.log(calcDaysTo(d1, d2) + " days to " + d1.toDateString());
}

function calcDaysTo(targetDay, startDay){
    let milliDiff = targetDay.getTime() - startDay.getTime();
    return Math.floor(milliDiff/(24*60*60*1000));
}

function calcDateXDaysFrom(targetDay, numDaysFrom, before){
    let awayFromDate = new Date();
    if(before){
        awayFromDate.setDate(targetDay.getDate() - numDaysFrom);
    }
    else{
        awayFromDate.setDate(targetDay.getDate() + numDaysFrom);
    }
    return awayFromDate;
}

function parseDateStringToSlash(dateString){
    return dateString.substring(0,4)+"/"+dateString.substring(5,7)+"/"+dateString.substring(8);
}

function daysToButtonClick(){
    let start = new Date(parseDateStringToSlash(document.getElementById("startDate").value));
    let end = new Date(parseDateStringToSlash(document.getElementById("targetDate").value));
    let result = calcDaysTo(end, start);
    let dayWord = (result>1) ? "days":"day";
    document.getElementById("resultP").innerHTML = start.toLocaleDateString() + " is <b>" + result + "</b> "+ dayWord +" from " + end.toLocaleDateString();
}

function dateXDaysFromButtonClick(){
    let start = new Date(parseDateStringToSlash(document.getElementById("daysFromDate").value));
    let before = (document.getElementById("beforeAfterSelect").value == "before");
    let number = document.getElementById("daysFromDateNumber").value * 1;
    let beforeWord = (before) ? "before " : "after ";
    let dayWord = (number > 1) ? " days " : " day ";
    let result = calcDateXDaysFrom(start, number, before);
    document.getElementById("resultP").innerHTML = number + dayWord + beforeWord + start.toLocaleDateString() + " is "+ result.toLocaleDateString();
}

function updateDayWordDiv(){
    if(document.getElementById("daysFromDateNumber").value == 1){
        document.getElementById("dayWordDiv").innerHTML = "day";
    }
    else{
        document.getElementById("dayWordDiv").innerHTML = "days";
    }
}

function loadTodayDate(){
    let today = new Date();
    document.getElementById("startDate").value = today.toISOString().slice(0,10);
}

function toggleModeVisibility(){
    if(document.getElementById("modeSelect").value == "daysTo"){
        document.getElementById("daysToHolder").style.display = "inline";
        document.getElementById("dateBeforeHolder").style.display = "none";
    }
    if(document.getElementById("modeSelect").value == "dateBefore"){
        document.getElementById("daysToHolder").style.display = "none";
        document.getElementById("dateBeforeHolder").style.display = "inline";
    }
}