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

// Create object to control flow of game

    // FNCTION playGame
        // listen for user input
        // fill array with user input
        // update if either row is full of x or o and continue if not. if all spots are filled and neither contain full row make a tie.
let startGame = (function(){
    console.log("Welcome to Tic Tac Toe!")
    console.log(`${playerOne.getPlayerName()}`);
    console.log(`${playerTwo.getPlayerName()}`);
    // Retreive player moves

    let playerOneMove = playerOne.playerMove().split("");
    let rowPick = playerOneMove[0];
    let cellPick = playerOneMove[1];

    let row = gameBoard.gameBoardArray[rowPick];
    console.log(row);
    
    let keys = Object.keys(row);
    keys.forEach(key => {
        console.log(key === key);
    });
    
    // Apply their choices to the gameBoard object, only if someone has not picked the spot already.

    // HOW I CAN ACCESS THE OBJECTS ARRAY AND PROPERTIES
    //console.log(gameBoard.gameBoardArray[1].sectionA);

}());