function testLoadAtts(){
    let shippy = new ship();
    shippy = loadAttributes(shippy, ships.StarterShip);
    console.log(shippy);
}

function loadShips(){
    let ships1 = [];
    let ships2 = [];
    for(let r = 0; r < 10; r++){
        let mods = [new weaponModule(), new utilityModule()];
        mods[0] = loadAttributes(mods[0], weapons.JNL);
        mods[1] = loadAttributes(mods[1], modules.MiningModule);
        let tmpShip = new ship(mods);
        tmpShip = loadAttributes(tmpShip, ships.StarterShip);
        ships1.push(tmpShip);
    }
    for(let r = 0; r < 10; r++){
        let mods = [new weaponModule(), new utilityModule()];
        mods[0] = loadAttributes(mods[0], weapons.JNL);
        mods[1] = loadAttributes(mods[1], modules.MiningModule);
        let tmpShip = new ship(mods);
        tmpShip = loadAttributes(tmpShip, ships.StarterShip);
        ships2.push(tmpShip);
    }

    let players = [new player("P1"), new player("P2")];
    let fleets = [new fleet("P1 Main", ships1, players[0]), new fleet("P2 Main", ships2, players[1])];
    players[0].fleets.push(fleets[0]);
    players[1].fleets.push(fleets[1]);

    console.log(players);

}