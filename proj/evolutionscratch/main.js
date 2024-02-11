// for (let key in template)
//   this[key] = template[key] ;

function loadSampleCritters(){
    let motherStats = {meatType: traits.meatType[0], color: "#1a1", photosynthesisEfficiency: .5, canDigest: "Sun", calorieNeeds: 1, reproductionType: "Mitosis", reproductionCost: 1};
    let critters = [];
    for(let r = 0; r < 100; r++){
        critters.push(new organism(motherStats));
    }
    //console.log(Object.getOwnPropertyDescriptors(critters[0]));
    console.log(critters);
    return critters;
}

function genericTickCycle(critters){
    let newCritters = [];
    let incomingSun = 4;
    for(let r = 0; r < critters.length; r++){
        let produced = critters[r].photosynthesisEfficiency * incomingSun;
        if(produced >= critters[r].calorieNeeds){
            newCritters.push(critters[r]);
        }
        if(produced >= critters[r].reproductionCost){
            let parentTraits = Object.getOwnPropertyDescriptors(critters[r]);
            newCritters.push(new organism(parentTraits));
        }
    }
    console.log(newCritters);
}