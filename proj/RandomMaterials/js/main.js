function genMats(catCnt, prefixL){
    let outm = [];
    let curId = 0;
    for(let r = 0; r < catCnt; r++){
        let cnt = Math.floor(Math.random()*6) + 5;
        for(let t = 0; t<cnt; t++){
            let nam = (prefixL[r] || "Mat" ) + (t+1);
            let har = (t*5) + (Math.floor(Math.random()*5)) + 1;
            let wght = (t*3) + (Math.floor(Math.random()*3)) + 1;
            let red = Math.floor(Math.random()*256);
            let green = Math.floor(Math.random()*256);
            let blue = Math.floor(Math.random()*256);
            let colour = "rgb("+red+"," +green +","+ blue+")";
            outm.push(new material(curId, nam, wght, har, colour));
            curId += 1;
        }       
    }
    return outm;
}

function loadCards(mats){
    let count = mats.length;
    for(let r = 0; r < count; r++){
        let props = {
            title: "#" + mats[r].id + " " + mats[r].name,
            class: "sortCard",
            colour: mats[r].colour,
            parent: document.getElementById("holder"),
            description: "<br>Weight: " + mats[r].weight + "<br>" + "Hardness: " + mats[r].hardness,
            linkAddress:""
        }
        buildCard(props);
    }
}

// function makeTool(hed, te, han, nme, lvl){
//     var obj = {
//         head : hed.id,
//         tie : te.id,
//         handle : han.id,
//         name : "Tool",
//         durability : 0,
//         weight : 0,
//         damage : 0,
//         level : lvl
//     };
//     var lvlScale = 1 + (lvl * .1);
//     obj.name = hed.name + " " + nme;
//     obj.durability = ((hed.durability + te.durability + han.durability) * .80) * lvlScale;
//     obj.weight = hed.weight + te.weight + han.weight;
//     //obj.damage = (obj.weight / ((obj.head.hardness + obj.tie.hardness + obj.handle.hardness )/3)) * lvlScale;
//     obj.damage = (obj.weight * .2) + (((hed.hardness + te.hardness + han.hardness )/3)*.3) * lvlScale;
//     return obj;
// }