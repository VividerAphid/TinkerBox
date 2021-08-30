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

}

class item{

}