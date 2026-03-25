function render(G){
    G.clearRect(0, 0, gameCan.width, gameCan.height);
    for(let r = 0; r < game.nodes.length; r++){
        game.nodes[r].render(G, game.resourceColors);
    }
    for(let r = 0; r < game.factories.length; r++){
        game.factories[r].render(G);
    }
}

function checkClickHit(G){
    let canvRect = gameCan.getBoundingClientRect();
	let x = (event.clientX - canvRect.left);
	let y = (event.clientY - canvRect.top);
    let clicked = false;
    for(let r = 0; r < game.nodes.length; r++){
        let currentNode = game.nodes[r];
        if(x >= currentNode.x && x <= currentNode.x + currentNode.size){
            if(y >= currentNode.y && y <= currentNode.y + currentNode.size){
                if(currentNode.amount > 0){
                    currentNode.amount -= 1;
                    game.player.addToInventory(1, currentNode.type);
                    updateInventoryUI();
                    updateCraftingUI();
                    render(G);
                    clicked = true;
                    break;
                }
            }
        }
    }
    if(!clicked){
        for(let r = 0; r < game.factories.length; r++){
            let currentFac = game.factories[r];
            if(x >= currentFac.x && x <= currentFac.x + currentFac.size*currentFac.widthMult){
                if(y >= currentFac.y && y <= currentFac.y + currentFac.size){
                    factoryClick(currentFac, G);
                }
            }
        }
    }
}

function craft(item){
    let craftable = checkCraftable(item, game.player.inventory);
    if(craftable){
        for(const [key, value] of Object.entries(item.cost)){
            game.player.inventory[key] -= value;
        }
        if(game.player.inventory[item.name]){
            game.player.inventory[item.name] += item.makes;
        }
        else{
            game.player.inventory[item.name] = item.makes;
        }       
    }
    updateInventoryUI();
    updateCraftingUI();
}

function factoryClick(factory, G){
    if(checkCraftable(factory.product, game.player.inventory)){
        for(const [key, value] of Object.entries(factory.product.cost)){
            game.player.inventory[key] -= value;
        }
        factory.receiveMaterials(factory.product.cost);
    }
    if(factory.inventory[factory.type] > 0){
        if(game.player.inventory[factory.type]){
            game.player.inventory[factory.type] += factory.sendProducts();
        }
        else{
            game.player.inventory[factory.type] = factory.sendProducts();
        }
    }
    updateCraftingUI();
    updateInventoryUI();
    render(G);
}

function gameTick(G){
    for(let r = 0; r < game.nodes.length; r++){
        game.nodes[r].tick();
    }
    for(let r = 0; r < game.factories.length; r++){
        game.factories[r].tick();
    }
    render(G);
}

function startTick(G){
    gameTicker = setInterval(gameTick, tickSpeed, G);
}

function stopTick(){
    clearInterval(gameTicker);
}