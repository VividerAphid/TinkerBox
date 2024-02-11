class organism{
    constructor(stats){
        this.loadAttributes(stats);
    }
    loadAttributes(template){  
        for (const [key, val] of Object.entries(template)) {
            Object.defineProperty(this, key, {
                value: val,
                writable: false,
              });
        }
    }
}

var traits = {
    meatType: ["plant", "animal"],
    color: "#000",
    canDigest: ["plant", "animal", "Sun"],
    calorieNeeds: 1,
    litterSize: 1,
    reproductionType: ["Egg", "Birth", "Mitosis"],
    reproductionCost: 1,
    gestationLength: 1,
    speed: 0,
    photosynthesisEfficiency: .5,
};