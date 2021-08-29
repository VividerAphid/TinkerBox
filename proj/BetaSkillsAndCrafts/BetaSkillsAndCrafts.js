function addElement(props){
    //Takes in {type, id, class, parent, innards}
    let child = document.createElement(props.type);
    child.id = props.id;
    child.className = props.class;
    props.parent.appendChild(child);
    child.innerHTML = props.innards;
}

function createInventorySlots(count){
    for(let r = 0; r < count; r++){
        addElement({type:"div", id:"slot-"+r, class: "inventory-slot", parent: document.getElementById("inventory-master"), innards: Math.floor(Math.random()*255)})
    }
}