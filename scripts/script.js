// Make gameboard a IIFE so another instance cannot be made.
let gameBoard = (function(){
    const gameBoardArray = []
    let count = 1;

    for(let i = 0; i < 9; i+=3){
        gameBoardArray.push({row: count, a:"", b:"", c: ""});
        count += 1;
    }

    return {gameBoardArray};
})();

// Create player objects
const playerFactory = function(name) {
    let score = 0;

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

let playerChoice = function(playerObject){
    let playerMove = playerObject.playerMove().split("");
    let rowPick = playerMove[0];
    let cellPick = playerMove[1];
    return {rowPick, cellPick};
}

// Create object to control flow of game
// We will start game with this, creating a welcome message. Retrieve player choices by passing player objects to playerChoice.
// Return a choice object back indicating row and column/cell. 
// From here we should have a function to update our gameboard object.
// NOTE: In our function to update gameboard, see if it has already been set to a value. If not, add player choice.
let startGame = (function(){
    console.log("Welcome to Tic Tac Toe!")
    console.log(`${playerOne.getPlayerName()}`);
    console.log(`${playerTwo.getPlayerName()}`);
    // Retreive player moves
    let playerOneChoice = playerChoice(playerOne);
    let playerTwoChoice = playerChoice(playerTwo)

    let row = gameBoard.gameBoardArray[playerOneChoice.rowPick];
    //console.log(row);
    
    let keys = Object.keys(row);
    keys.forEach(key => {
        if(key === playerOneChoice.cellPick){
            gameBoard.gameBoardArray[playerOneChoice.rowPick][key] = "X";
            console.log(gameBoard.gameBoardArray);
        }
    });
}());