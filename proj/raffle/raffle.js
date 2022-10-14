//List of users with ticket count
//Fill ticket list based on each user ticket count
//eg: user1 has 5 tickets, user2 has 3 tickets, user 3 has 1 ticket
//Generate random number up to total ticket count
//Cycle through players until winning ticket number is found:
//Keep track of ticket total
//With each player, determine if pick is within (total + playerTicketCount)

function findWinner(players){
    console.log("findWinners");
    let totalTickets = 0;
    for(let r = 0; r < players.length; r++){
        totalTickets += players[r][1];
    }
    let pick = Math.round(Math.random()*totalTickets);
    let currentTickets = 0;
    for(let t = 0; t < players.length; t++){
        console.log("pick is: " + pick);
        console.log(players[t][1]);
        console.log("currentTickets + player[t] is: " + currentTickets + players[t][1]);
        if (pick <= currentTickets + players[t][1]){
            console.log(players[t][0] + " won the draw!");
            break;
        }
        else{
            currentTickets += players[t][1];
            console.log("next player!");
        }
    }
}