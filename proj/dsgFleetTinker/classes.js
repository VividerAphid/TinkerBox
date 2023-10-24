class utilityModule{
  constructor(){
    this.id = generateUUID();
  }
}

class weaponModule{
  constructor(){
    this.id = generateUUID();
  }
}

class ship{
    constructor(mods){
        this.id = generateUUID();
        this.modules = mods || [];
    }
    verifyPowerUsage(){
      let usage = 0;
      for(let r = 0; r < this.modules.length; r++){
        usage += this.modules[r].powerCost;
      }
      if(usage > this.reactorPower){
        console.log("Power usage for " + this.id + " exceeded!");
      }
    }
}

class fleet{
    constructor(name, ships, owner){
        this.id = generateUUID();
        this.name = name;
        this.ships = ships;
        this.owner = owner;
    }
}

class player{
    constructor(name){
        this.id = generateUUID();
        this.name = name;
        this.fleets = [];
    }
    
}

function generateUUID() {
	//courtesy of John Cynarx
	const chars = [ '0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
	let output = Array(5) ;
	let genSub = function(n, is_spec) {
	  let arr = Array(n) ;
	  for (let i = 0; i < n; i++)
		arr[i] = chars[Math.floor(Math.random() * chars.length)] ;
	  if (is_spec)
		arr[0] = '4' ;
	  return arr.join("");
	};
	return [genSub(8), genSub(4), genSub(4, true), genSub(4), genSub(12)].join('-') ;
  }

function loadAttributes(obj, template){  
    for (const [key, val] of Object.entries(template)) {
        Object.defineProperty(obj, key, {
            value: val,
            writable: false,
          });
      }
    return obj;
}