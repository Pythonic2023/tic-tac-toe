// Make gameboard a IIFE so another instance cannot be made.
let gameBoard = (function(){
    const gameBoardArray = []

    for(let i = 1; i < 4; i++){
        gameBoardArray.push({row: i, a:"", b:"", c: ""});
    }

    return {gameBoardArray};
})();

// Create player objects
const playerFactory = function(name) {
    let score = 0;
    let playerID = crypto.randomUUID();

    let getPlayerName = function(){
        return `Player name: ${name}`;
    }

    let increasePlayerPoints = function(){
        return ++score;
    }

    let getPlayerScore = function(){
        return `Player Score: ${score}`;
    }

    let playerMove = function() {
        let move = prompt("Pick move: row 1, 2 or 3 then a, b or c. For example 1a.");
        return move;
    }

    let victory = function(){
        let nameToUpperCase = name.toUpperCase();
        return `${nameToUpperCase} is the winner with ${score} points!`;
    }

    return {
        getPlayerName,
        increasePlayerPoints,
        getPlayerScore,
        victory,
        playerMove,
    }
}

let playerOne = playerFactory("Bobby");
let playerTwo = playerFactory("ybboB");

let playerChoice = function(playerObjects){
    Object.entries(playerObjects).forEach(([name, player]) => {
        let move = player.playerMove();
    });
}

let updateGameBoard = function(){
    console.log('updateGameBoard');
}

let startGame = (function(){
    console.log("Welcome to Tic Tac Toe!")
    console.log(`${playerOne.getPlayerName()}`);
    console.log(`${playerTwo.getPlayerName()}`);
    playerChoice({playerOne, playerTwo});
}());