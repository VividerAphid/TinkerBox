class market{
    constructor(circAmt=1000000, items=[]){
        this.platInCirculation = circAmt;
        this.marketItems = items;
        this.marketProducers = [];
        this.marketSellers = [];
        this.marketBuyers = [];
    }
    marketTick(){
        this.producerTick();
        this.sellerTick();
        this.buyerTick();
        this.randomTicks();
        // for(let r in this.marketItems){
        //     console.log(this.marketItems[r].itemType.name + ": " + this.marketItems[r].amount);
        // }
        
    }
    producerTick(){
        for(let r in this.marketProducers){
            this.marketProducers[r].produce()
        }
    }
    sellerTick(){
        for(let r in this.marketSellers){
            let seller = this.marketSellers[r];
            seller.buy();
            this.marketItems[seller.sells.itemType.name].amount += seller.sell();
        }
    }
    buyerTick(){
        for(let r in this.marketBuyers){
            let buyer = this.marketBuyers[r];
            let buyAmt = buyer.buy();
            if(buyAmt <= this.marketItems[buyer.buys.itemType.name].amount){
                this.marketItems[buyer.buys.itemType.name].amount -= buyAmt;
            }
            else{
                this.marketItems = 0;
            }
        }
    }
    randomTicks(){
        for(let r in this.marketItems){
            let ranSellChance = .1;
            let ranBuyChance = .1;
            if(Math.random() <= ranSellChance){
                let amt = Math.floor(Math.random()*100)+1;
                this.marketItems[r].amount += amt;
                console.log("sell!");
            }
            if(Math.random() <= ranBuyChance){
                let amt = Math.floor(Math.random()*100)+1;
                this.marketItems[r].amount -= amt;
                console.log("buy!");
            }
        }
    }
    addItem(newItem){
        this.marketItems[newItem.itemType.name] = newItem;
    }
    addProducer(newProducer){
        this.marketProducers.push(newProducer);
    }
    addSeller(newSeller){
        this.marketSellers.push(newSeller);
    }
    addBuyer(newBuyer){
        this.marketBuyers.push(newBuyer);
    }
}

class marketItem{
    constructor(itemType, cost, amount=0){
        this.itemType = itemType;
        this.cost = cost;
        this.amount = amount;
    }
    get name(){
        return this.itemType.name;
    }
}

class item{
    constructor(name){
        this.name = name;
    }
}

class marketBuyer{
    constructor(buys, buyAmount){
        this.buys = buys;
        this.buyAmount = buyAmount;
    }
    buy(){
        return this.buyAmount;
    }   
}

class marketSeller{
    constructor(sells, sellAmount, buysFrom, buyAmount, initialHas=0){
        this.has = initialHas;
        this.sells = sells;
        this.sellAmount = sellAmount;
        this.buysFrom = buysFrom;
        this.buyAmount = buyAmount;
    }
    sell(){
        if(this.sellAmount <= this.has){
            return this.sellAmount;
        }
        else{
            return this.sellAmount - this.has;
        }
    }
    buy(){
        this.has += this.buysFrom.sell(this.buyAmount);
    }
}

class marketProducer{
    constructor(produces, amount, reliability){
        this.name = produces.name + " producer";
        this.productionAmount = amount;
        this.produces = produces;
        this.reliability = reliability;
        this.has = 0;
    }
    produce(){
        let dipChance = 1 - this.reliability;
        let dipAmount = 0;
        if(Math.random() <= dipChance){
            dipAmount = Math.random();
        }
        this.has += this.productionAmount - Math.floor(this.productionAmount * dipAmount);
    }
    sell(amt){
        if(this.has >= amt){
            this.has -= amt;
            return amt;
        }
        else{
            return amt - this.has;
        }
    }
}