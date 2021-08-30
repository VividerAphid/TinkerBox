class skill{
    constructor(name){
        this.name = name;
        this.xp = 0;
        this.level = 1;
    }

    getMaxXP(){
        return 2*(Math.pow((this.level * 5), 2));
    }

    incrementXP(amount){
        this.xp += amount;
        console.log(this.xp + "/" + this.getMaxXP());
        if(this.xp >= this.getMaxXP()){
            while(this.xp >= this.getMaxXP()){
                this.xp -= this.getMaxXP();
                this.level++;
                console.log("Level up!");
            }
        }
    }
}

class player{
    constructor(id, name){
        this.id = id;
        this.name = name;
        this.skills = this.initSkills();
        this.health = 100;
        this.inventory = {slots: 10};
    }

    initSkills(){
        return {
            analysis: new skill("Analysis"),

            tool: new skill("Tool"),
            pickaxe: new skill("Pickaxe"),
            hammer: new skill("Hammer"),
            shovel: new skill("Shovel"),
            axe: new skill("Axe"),
            hoe: new skill("Hoe"),
            bag: new skill("Bag"),

            athletics: new skill("Athletics"),
            strength: new skill("strength"),
            running: new skill("Running"),
            jumping: new skill("Jumping"),

            weapon: new skill("Weapon"),
            sword: new skill("Sword"),
            dagger: new skill("Dagger"),
            club: new skill("Club"),
            bow: new skill("Bow"),
            crossbow: new skill("Crossbow"),
            sling: new skill("Sling"),
            firearm: new skill("Firearm"),

            mining: new skill("Mining"),
            gathering: new skill("Gathering"),
            farming: new skill("Farming"),
            butchering: new skill("Butchering")
        };
    }
}

class item{

}