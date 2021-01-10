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
        viewing.card.style.top = ((document.body.clientHeight / 2) - 300) + "px";
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
        viewing.card.style.top = ((document.body.clientHeight / 2) - 300) + "px";
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