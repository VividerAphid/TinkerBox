let projectsInfo = [
    {title:"Map Toying", colour: "#9612c9", description: "A spin-off of the spin-off, ClickCon, where I played with some map generation techniques", linkAddress:'<a href="proj/mapToying/mapToying.html">Link here!</a>'}, 
    {title:"Random Materials", colour: "#029660", description: "I played with generating random materials for a game world", linkAddress:'<a href="proj/RandomMaterials/randomMaterials.html">Link here!</a>'}, 
    {title:"Tile Scatter", colour: "#a16902", description: "I got a silly portfolio idea, and it became this very homepage", linkAddress:'<a href="proj/tileScatter/tileScatter.html">Link here!</a>'}
    ];

let deck = [];
let cardCount = projectsInfo.length;
let viewing = {card: "dummy", isViewing: false, isSorted: false};
        
for(let r = 0; r< cardCount; r++){
    let top = Math.floor(Math.random()*750) + 100;
    let left = Math.floor(Math.random()*750) + 100;
    let rotation = Math.floor(Math.random()*360);

    let targCard = buildCard({title: projectsInfo[r].title, colour: projectsInfo[r].colour, linkAddress: projectsInfo[r].linkAddress, description: projectsInfo[r].description, parent:masterDiv}); 
    targCard.style.top = top+"px";
    targCard.style.left = left+"px";
    targCard.style.transform = "rotate("+ rotation +"deg)";
    targCard.onclick = function(){pickUp(this);};
    deck.push(targCard);            
}

function addElement(props){
    //Takes in {type, id, class, parent, innards}
    let child = document.createElement(props.type);
    child.id = props.id;
    child.className = props.class;
    props.parent.appendChild(child);
    child.innerHTML = props.innards;
}

function buildCard(props){
    //Takes in title, colour, link address, desc, parent
    addElement({type: "div", id: props.title+"Card", class: "card", parent: props.parent, innards:""});//Card body
    let currentCard = document.getElementById(props.title+"Card");
    addElement({type:"div", id: props.title + "-title", class:"cardTitle", parent: currentCard, innards:props.title});//Card title
    addElement({type:"div", id: props.title + "-picture", class:"cardPicture", parent:currentCard, innards:"Picture!"});//Card picture
    addElement({type:"div", id: props.title + "-description", class:"cardDescription", parent:currentCard, innards:props.description});//Card info
    addElement({type:"div", id: props.title + "-link", class:"cardLink", parent:currentCard, innards:props.linkAddress});
    currentCard.style.backgroundColor = props.colour;
    return currentCard;
}

function pickUp(targ){
    if(viewing.isViewing && viewing.card != targ){
        if(viewing.isSorted){
            viewing.card.className = "sortCard";
            viewing.card.style.zIndex = 1;
        }
        else{
            viewing.card.className = "card";
            let rotation = Math.floor(Math.random()*360);
            viewing.card.style.transform = "rotate("+rotation+"deg)";
            viewing.card.style.zIndex = 1;
        }

        targ.style.zIndex = 10;
        targ.style.transform = "rotate(0deg)";
        if(viewing.isSorted){
            targ.className = "sortZoomedCard";
        }
        else{
            targ.className = "zoomedCard";
        }  
        viewing.card = targ;
        viewing.isViewing = true;
    }
    else if(viewing.card == targ){
        if(viewing.isSorted){
            viewing.card.className = "sortCard";
            viewing.card.style.zIndex = 1;
        }
        else{
            viewing.card.className = "card";
            let rotation = Math.floor(Math.random()*360);
            viewing.card.style.transform = "rotate("+rotation+"deg)";
            viewing.card.style.zIndex = 1;
        }
        viewing.card = "dummy";
        viewing.isViewing = false;
    }
    else{
        targ.style.zIndex = 10;
        targ.style.transform = "rotate(0deg)";
        if(viewing.isSorted){
            targ.className = "sortZoomedCard";
        }
        else{
            targ.className = "zoomedCard";
        }  
        viewing.card = targ;
        viewing.isViewing = true;
    }
}

function sortCards(){
    for(let r = 0; r< deck.length; r++){
        deck[r].className = "sortCard";
        deck[r].style.transform = "rotate(0deg)";
    }
    viewing.isSorted = true;
}

function scatterCards(){
    for(let r = 0; r< deck.length; r++){
        deck[r].className = "card";
        let rotation = Math.floor(Math.random()*360);
        deck[r].style.transform = "rotate(" + rotation + "deg)";
    }
    viewing.isSorted = false;
}