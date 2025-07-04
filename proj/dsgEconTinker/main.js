function addElement(id, type, parent, innards){
	var child = document.createElement(type);
	child.id = id;
	parent.appendChild(child);
	child.innerHTML = innards || "";
    return child;
}

function startMarketTick(){
    marketTickInterval = setInterval(marketTick, marketTickSpeed);
}

function stopMarketTick(){
    clearInterval(marketTickInterval);
}

function marketTick(){
    gameMarket.marketTick();
    updateUI();
}

function updateUI(){
    for(let r in UIListings){
        let markIt = gameMarket.marketItems[UIListings[r][0]]
        UIListings[r][1].innerHTML = markIt.itemType.name + ": " +markIt.amount;
    }
}

function initMarket(){
    createMarketItems();
    createMarketProducers();
    createMarketSellers();
    createMarketBuyers();
    createUIListings();
}

function createUIListings(){
    marketListingsDiv.innerHTML = "";
    for(let r in gameMarket.marketItems){
        let markIt = gameMarket.marketItems[r];
        UIListings.push([markIt.itemType.name, addElement(markIt.itemType.name+"div", "div", marketListingsDiv, 
            markIt.itemType.name+": "+markIt.amount)]);
    }
}

function createMarketItems(){
    for(let r in items){
        gameMarket.addItem(new marketItem(new item(items[r][0]), 10, items[r][1]));
    }
}

function createMarketProducers(){
    for(let r in producers){
        gameMarket.addProducer(new marketProducer(gameMarket.marketItems[producers[r][0]], producers[r][1], producers[r][2]));
    }
}

function createMarketSellers(){
    let producers = gameMarket.marketProducers;
    for(let r in sellers){
        gameMarket.addSeller(new marketSeller(gameMarket.marketItems[sellers[r][0]], sellers[r][1], producers[sellers[r][3]], sellers[r][2]));
    }
}

function createMarketBuyers(){
    for(let r in buyers){
        gameMarket.addBuyer(new marketBuyer(gameMarket.marketItems[buyers[r][0]], buyers[r][1]));
    }
}