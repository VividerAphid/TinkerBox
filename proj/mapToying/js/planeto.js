class planeto{
    constructor(id, name, x, y, radius, colour, value, connections){
        Object.defineProperties(this, {
            id: {
                value: id,
                writable: false
            }
        });
        this.x = x;
        this.y = y;
        this.name = name;
        this.radius = radius;
        this.colour = colour;
        this.value = value;
        this.defense = 0;
        this.isShowing = false;
        this.connections = connections;
        
    }

    drawConnections(G, map, settings){
        let reps = this.connections.length;
        for(let r = 0; r < reps; r++){
            let connectee = map[this.connections[r]].id;
            if(connectee > this.id){
                G.beginPath();
                G.lineWidth = 3;
                if(this.isShowing == true && map[connectee].isShowing == true){
                    G.fillStyle = "#fff";
                    G.strokeStyle = "#fff";
                    G.lineWidth = 9;
                }   
                else{
                G.fillStyle = "#999";
                G.strokeStyle = "#999";
            //G.fillStyle = "#f0f";
            //G.strokeStyle = "#f0f"; //FOR TESTING    
                }
                G.moveTo(this.x, this.y);
                G.lineTo(map[connectee].x, map[connectee].y);
                G.stroke();
            }
        }
    }

    drawPlaneto(G, map, settings){
        G.beginPath();
        G.fillStyle = this.colour;
        G.strokeStyle = this.colour;   
        G.arc(this.x, this.y, (this.radius*2), 0, 2*Math.PI);   
        G.fill();
        G.stroke();

        if(settings.debug){
            if(this.isShowing){
                G.fillStyle = "#f00";
                G.strokeStyle = "#f00";
            }
            else{
                G.fillStyle = "#fff";
                G.strokeStyle = "#fff";
            }           
            G.font = "20px Arial";
            G.fillText(this.id, this.x-20, this.y-20);
        }
        if(settings.defenseOn){
            G.fillStyle = "#000";
            G.strokeStyle = "#000";
            G.font = "20px Arial";
            G.fillText(this.defense, this.x-5, this.y+5)
        }
    }

}