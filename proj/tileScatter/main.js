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
    currentCard.style.backgroundColor = props.colour;
    return currentCard;
}