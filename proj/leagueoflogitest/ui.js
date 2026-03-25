function addElement(id, type, parent, innards){
	var child = document.createElement(type);
	child.id = id;
	parent.appendChild(child);
	child.innerHTML = innards || "";
    return child;
}

function setupCanvas(G){
    gameCan.width = 750;
    gameCan.height = 750;
    gameCan.onclick = function(){checkClickHit(G);};
}

function updateInventoryUI(){
    let container = document.getElementById("sideBarUpperDiv");
    container.innerHTML = "<u>INVENTORY</u>";
    for(const [key, value] of Object.entries(game.player.inventory)){
        addElement(key+"Div", "div", container, key+": "+value);
    }
}

function updateCraftingUI(){
    let container = document.getElementById("sideBarLowerDiv");
    container.innerHTML = "<u>CRAFTING</u>";
    for(const [keyR, valueR] of Object.entries(game.recipes)){
        for(const [key, value] of Object.entries(valueR)){
            let line = addElement(key+"Div", "div", container, value.name+": ");
            let btn = addElement(key+"btn", "button", line, "Craft");
            btn.onclick = function(){craft(value)};
            let craftable = (checkCraftable(value, game.player.inventory));
            if(craftable){
                btn.style.backgroundColor = "#0c0";
            }
            else{
                btn.style.backgroundColor = "#c00";
            }
        }
    }
}