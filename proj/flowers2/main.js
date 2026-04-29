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

//-------------------

var ctx = document.getElementById("flowerbed").getContext("2d");
var arty = new Artist(ctx);

testArt();