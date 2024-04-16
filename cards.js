let projectsInfo = [
    {title:"Map Toying", colour: "#9612c9", description: "A spin-off of the spin-off, ClickCon, where I played with some map generation techniques", image: '<img class="projectImg" src="projectIcons/mapToying.PNG" alt="Picture was here...">', linkAddress:'<a href="proj/mapToying/mapToying.html" target="_blank">Link here!</a>'}, 
    {title:"Random Materials", colour: "#029660", description: "I played with generating random materials for a game world", image: '<img class="projectImg" src="projectIcons/RandomMats.PNG" alt="Picture was here...">', linkAddress:'<a href="proj/RandomMaterials/randomMaterials.html" target="_blank">Link here!</a>'}, 
    {title:"Tile Scatter", colour: "#a16902", description: "I got a silly portfolio idea, and it became this very homepage", image: '<img class="projectImg" src="projectIcons/tileScatter.PNG" alt="Picture was here...">', linkAddress:'<a href="proj/tileScatter/tileScatter.html" target="_blank">Link here!</a>'},
    {title:"Random Attributes", colour: "#990000", description: "I got a completely unnecessary idea to give objects random attributes", image: '<img class="projectImg" src="projectIcons/randomAttributes.PNG" alt="Picture was here...">', linkAddress:'<a href="proj/randomAttributes/randomAttributes.html" target="_blank">Link here!</a>'},
    {title:"Encrypto", colour: "#ab4c03", description: "I tried my hand at some very lazy cryptography", image: '<img class="projectImg" src="projectIcons/encrypto.PNG" alt="Picture was here...">', linkAddress:'<a href="proj/encrypto/encrypto.html" target="_blank">Link here!</a>'},
    {title:"Biome Colours", colour: "#a60090", description: "I tried playing with what it would look like to generate worlds with different colours...", image: '<img class="projectImg" src="projectIcons/biomeColours.PNG" alt="Picture was here...">', linkAddress:'<a href="proj/biomeColours/biomeColours.html" target="_blank">Link here!</a>'},
    {title:"Raffle", colour: "#2200aa", description: "I made a simple raffle ticket drawing thing", image: '<img class="projectImg" src="projectIcons/raffle.PNG" alt="Picture was here...">', linkAddress:'<a href="proj/raffle/raffle.html" target="_blank">Link here!</a>'},
    {title:"Plant", colour: "#22dd11", description: "I fiddled with a very derpy plant growth project", image: '<img class="projectImg" src="projectIcons/plant.PNG" alt="Picture was here...">', linkAddress:'<a href="proj/plant/plant.html" target="_blank">Link here!</a>'},
    {title:"Cookies", colour: "#008888", description: "I made a tiny page to mess with saving cookies", image: '<img class="projectImg" src="" alt="Picture was here...">', linkAddress:'<a href="proj/cookies/cookies.html" target="_blank">Link here!</a>'},
    ];

let deck = [];
let cardCount = projectsInfo.length;
let viewing = {card: "dummy", isViewing: false, isSorted: false, originalCoord: {x:0, y:0}};
        
for(let r = 0; r< cardCount; r++){
    let top = Math.floor(Math.random()*(document.body.clientHeight - 200 - 25));
    let left = Math.floor(Math.random()*(document.body.clientWidth - 175));
    let rotation = Math.floor(Math.random()*360);

    let targCard = buildCard({title: projectsInfo[r].title, colour: projectsInfo[r].colour, image: projectsInfo[r].image, linkAddress: projectsInfo[r].linkAddress, description: projectsInfo[r].description, parent:masterDiv}); 
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
    addElement({type:"div", id: props.title + "-picture", class:"cardPicture", parent:currentCard, innards:props.image});//Card picture
    addElement({type:"div", id: props.title + "-description", class:"cardDescription", parent:currentCard, innards:props.description});//Card info
    addElement({type:"div", id: props.title + "-link", class:"cardLink", parent:currentCard, innards:props.linkAddress});
    currentCard.style.backgroundColor = props.colour;
    //console.log(props.title + "");
    document.getElementById(props.title + "-link").onclick = function(event){if(this.parentElement.className =="card"){event.preventDefault();}};
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
            viewing.card.style.top = viewing.originalCoord.y;
            viewing.card.style.left = viewing.originalCoord.x;
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
        viewing.originalCoord.x = targ.style.left;
        viewing.originalCoord.y = targ.style.top;
        viewing.card.style.top = ((document.body.clientHeight / 2) - 375) + "px";
        viewing.card.style.left = ((document.body.clientWidth / 2) - 200) + "px";
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
            viewing.card.style.top = viewing.originalCoord.y;
            viewing.card.style.left = viewing.originalCoord.x;
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
        viewing.originalCoord.x = targ.style.left;
        viewing.originalCoord.y = targ.style.top;
        viewing.card.style.top = ((document.body.clientHeight / 2) - 375) + "px";
        viewing.card.style.left = ((document.body.clientWidth / 2) - 200) + "px";
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