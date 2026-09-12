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

// function calcDateXDaysFrom(targetDay, numDaysFrom, before){
//     let awayFromDate = new Date();
//     if(before){
//         awayFromDate.setDate(targetDay.getDate() - numDaysFrom);
//     }
//     else{
//         awayFromDate.setDate(targetDay.getDate() + numDaysFrom);
//     }
//     return awayFromDate;
// }

function calcDateXDaysFrom(targetDay, numDaysFrom, before){
    //courtesy of john cynarx
  const MILLIS_IN_DAY = 86400000 ;
  let scale = before ? -MILLIS_IN_DAY : MILLIS_IN_DAY ;
  return new Date(targetDay.getTime() + numDaysFrom * scale) ;
}

function calcAge(targetDay, birthDay){
    let diff = {years:0, months:0};
    diff.years = targetDay.getYear() - birthDay.getYear();
    diff.months = (targetDay.getMonth() >= birthDay.getMonth()) ? targetDay.getMonth() - birthDay.getMonth() : 12 - (birthDay.getMonth() - targetDay.getMonth());
    return diff;
}

function parseDateStringToSlash(dateString){
    return dateString.substring(0,4)+"/"+dateString.substring(5,7)+"/"+dateString.substring(8);
}

function daysToButtonClick(){
    if(document.getElementById("startDate").value != "" && document.getElementById("targetDate").value != ""){
        let start = new Date(parseDateStringToSlash(document.getElementById("startDate").value));
        let end = new Date(parseDateStringToSlash(document.getElementById("targetDate").value));
        let result = calcDaysTo(end, start);
        let dayWord = (result>1) ? "days":"day";
        document.getElementById("resultP").innerHTML = start.toLocaleDateString() + " is <b>" + result + "</b> "+ dayWord +" from " + end.toLocaleDateString();
    }
    else{
        document.getElementById("resultP").innerHTML = "Please make sure to fill out all fields";
    }
}

function dateXDaysFromButtonClick(){
    if(document.getElementById("daysFromDate").value != "" && !isNaN(document.getElementById("daysFromDateNumber").value)){
        let start = new Date(parseDateStringToSlash(document.getElementById("daysFromDate").value));
        let before = (document.getElementById("beforeAfterSelect").value == "before");
        let number = document.getElementById("daysFromDateNumber").value * 1;
        let beforeWord = (before) ? "before " : "after ";
        let dayWord = (number > 1) ? " days " : " day ";
        let result = calcDateXDaysFrom(start, number, before);
        document.getElementById("resultP").innerHTML = number + dayWord + beforeWord + start.toLocaleDateString() + " is "+ result.toLocaleDateString();
    }
    else{
        document.getElementById("resultP").innerHTML = "Please make sure to fill out all fields correctly";
    }
}

function ageCalcButtonClick(){
    if(document.getElementById("birthdayDate").value != "" && document.getElementById("targetAgeDate").value != ""){
        let birthDate = new Date(parseDateStringToSlash(document.getElementById("birthdayDate").value));
        let targetDate = new Date(parseDateStringToSlash(document.getElementById("targetAgeDate").value));
        if(targetDate.getTime() > birthDate.getTime()){
            let age = calcAge(targetDate, birthDate);
            let yearWord = (age.years == 1) ? "year" : "years";
            let monthWord = (age.months == 1) ? "month" : "months";
            document.getElementById("resultP").innerHTML = age.years +" " + yearWord + ", " + age.months + " "+monthWord + " old";            
        }
        else{
            document.getElementById("resultP").innerHTML = "Please make sure target date is after birth date";
        }
    }
    else{
        document.getElementById("resultP").innerHTML = "Please make sure to fill out all fields";
    }
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
    let dateString = today.toISOString().slice(0,10);
    document.getElementById("startDate").value = dateString;
    document.getElementById("targetAgeDate").value = dateString;
}

function toggleModeVisibility(){
    let modeValue = document.getElementById("modeSelect").value

    document.getElementById("daysToHolder").style.display = (modeValue == "daysTo") ? "inline" : "none";
    document.getElementById("dateBeforeHolder").style.display = (modeValue == "dateBefore") ? "inline" : "none";
    document.getElementById("ageCalcHolder").style.display = (modeValue == "ageAtDate") ? "inline" : "none";
}