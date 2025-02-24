class Player {
    constructor(name, team) {
        this.name = name;
        this.team = team;
        this.score = 0;
    }
    
    shootBall(shots) {
        for (let i = 0; i < shots; i++) {
            if (Math.random() > 0.5) {
                this.score++;
            }
        }
    }
}

let players = [
    new Player("James", "Lakers"),
    new Player("Curry", "Warriors"),
    new Player("Jordan", "Bulls"),
    new Player("Bryant", "Lakers"),
    new Player("Durant", "Suns")
];

function startRound(players, shots) {
    players.forEach(player => {
        player.score = 0;
        player.shootBall(shots);
    });
    
    players.sort((a, b) => b.score - a.score);
}

startRound(players, 5);
console.log(String.fromCodePoint(0x1F3C6) + " Rankings after this round:");
players.forEach((player, i) => {
    console.log(`${i + 1}. ${player.name} - ${player.score} points`);
});

let highScore = players[0].score;
let tiedPlayers = players.filter(player => player.score === highScore);
let roundCount = 1;
while (tiedPlayers.length > 1) {
    roundCount++;
    console.log('\n' + String.fromCodePoint(0x1F525) + " Tiebreaker needed between: " + tiedPlayers.map(p => p.name).join(", "));

    tiedPlayers.forEach(player => player.score = 0);
    startRound(tiedPlayers, 3);
    
    console.log('\n' + String.fromCodePoint(0x1F3C0) + ` Round ${roundCount} Begins!`);
    tiedPlayers.forEach(player => {
        console.log(`${player.name} scored ${player.score} successful shots.`);
    });
    
    tiedPlayers.sort((a, b) => b.score - a.score);
    
    console.log('\n' + String.fromCodePoint(0x1F3C6) + " Rankings after this round:");
    tiedPlayers.forEach((player, i) => {
        console.log(`${i + 1}. ${player.name} - ${player.score} points`);
    });
    
    highScore = tiedPlayers[0].score;
    tiedPlayers = tiedPlayers.filter(player => player.score === highScore);
}

console.log('\n' + String.fromCodePoint(0x1F3C6) + ` The champion is ${tiedPlayers[0].name} with ${tiedPlayers[0].score} points!`);