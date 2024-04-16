function pageLoad(){
    if(cookiesAllowed){
        checkCookie();
    }
    else{
        numHeader.innerHTML = "Your fancy number is: " + Math.floor(Math.random()*1000);
    }
}

function checkCookie() {
    let num = getCookie("fancyNumber");
    if (num != "") {
        numHeader.innerHTML = "Your fancy number is: " + num;
        infoHeader.innerHTML = "Loaded from cookie data!";
    } else {
        createNewNum();
        num = getCookie("fancyNumber");
        numHeader.innerHTML = "Your fancy number is: " + num;
        infoHeader.innerHTML = "Made a cookie for next time!";
    }
  }

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function setCookie(cname,cvalue,exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function createNewNum(){
    let num = Math.floor(Math.random()*1000);
    setCookie("fancyNumber", num, 30);
}