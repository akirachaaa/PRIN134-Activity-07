class Player {
    constructor(name, team) {
        this.name = name;
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

];

const app = document.getElementById('app');
app.className = 'container mt-4';

const row = document.createElement('div');
row.className = 'row';
app.appendChild(row);

const leftCol = document.createElement('div');
leftCol.className = 'col-md-6';
row.appendChild(leftCol);

const inputGroup = document.createElement('div');
inputGroup.className = 'input-group mb-3';
leftCol.appendChild(inputGroup);

const playerInput = document.createElement('input');
playerInput.type = 'text';
playerInput.className = 'form-control';
playerInput.placeholder = 'Player name';
inputGroup.appendChild(playerInput);

const addButton = document.createElement('button');
addButton.className = 'btn btn-primary';
addButton.textContent = 'Add Player';
inputGroup.appendChild(addButton);
function startRound(players, shots) {
    players.forEach(player => {
        player.score = 0;
        player.shootBall(shots);
    });
    
    players.sort((a, b) => b.score - a.score);
}

const playerListTitle = document.createElement('h3');
playerListTitle.textContent = 'Players';
leftCol.appendChild(playerListTitle);

const playerList = document.createElement('ul');
playerList.className = 'list-group';
leftCol.appendChild(playerList);

const rightCol = document.createElement('div');
rightCol.className = 'col-md-6';
row.appendChild(rightCol);

const startRoundButton = document.createElement('button');
startRoundButton.className = 'btn btn-success mb-3';
startRoundButton.textContent = 'Play';
rightCol.appendChild(startRoundButton);

const outputTitle = document.createElement('h3');
outputTitle.textContent = 'Game Results';
rightCol.appendChild(outputTitle);

const outputDiv = document.createElement('div');
outputDiv.className = 'border p-3 bg-light';
rightCol.appendChild(outputDiv);

function updatePlayerList() {
    playerList.innerHTML = '';
    players.forEach((player, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        
        const playerName = document.createElement('span');
        playerName.textContent = player.name;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-sm btn-danger';
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => {
            players.splice(index, 1);
            updatePlayerList();
        };
        
        li.appendChild(playerName);
        li.appendChild(deleteBtn);
        playerList.appendChild(li);
    });
}

addButton.addEventListener('click', () => {
    const name = playerInput.value.trim();
    if (name) {
        players.push(new Player(name));
        playerInput.value = '';
        updatePlayerList();
    }
});

function startRound(players, shots) {
    players.forEach(player => {
        player.score = 0;
        player.shootBall(shots);
    });
        
    players.sort((a, b) => b.score - a.score);
}

function displayResults(results) {
    outputDiv.innerHTML = results;
}

startRoundButton.addEventListener('click', () => {
    if (players.length === 0) {
        displayResults('Please add at least one player.');
        return;
    }
    let results = '';
    startRound(players, 5);
    
    results += `<p>${String.fromCodePoint(0x1F3C6)} <strong>Rankings after this round:</strong></p>`;
    results += '<ol>';
    players.forEach((player, i) => {
        results += `<li>${player.name} - ${player.score} points</li>`;
    });
    results += '</ol>';

    let highScore = players[0].score;
    let tiedPlayers = players.filter(player => player.score === highScore);
    let roundCount = 1;
    
    while (tiedPlayers.length > 1) {
        roundCount++;
        results += `<p><br>${String.fromCodePoint(0x1F525)} <strong>Tiebreaker needed between:</strong> ${tiedPlayers.map(p => p.name).join(", ")}</p>`;
        tiedPlayers.forEach(player => player.score = 0);
        startRound(tiedPlayers, 3);

        results += `<p><br>${String.fromCodePoint(0x1F3C0)} <strong>Round ${roundCount} Begins!</strong></p>`;

        results += '<ul>';
        tiedPlayers.forEach(player => {
            results += `<li>${player.name} scored ${player.score} successful shots.</li>`;
        });
        results += '</ul>';
            
        tiedPlayers.sort((a, b) => b.score - a.score);
        
        results += `<p>${String.fromCodePoint(0x1F3C6)} <strong>Rankings after this round:</strong></p>`;
        results += '<ol>';
        tiedPlayers.forEach((player, i) => {
            results += `<li>${player.name} - ${player.score} points</li>`;
        });
        results += '</ol>';
        
        highScore = tiedPlayers[0].score;
        tiedPlayers = tiedPlayers.filter(player => player.score === highScore);
    }
    displayResults(results);
});

updatePlayerList();
