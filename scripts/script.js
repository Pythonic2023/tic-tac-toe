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

let playerChoice = function(playerObject){
    let playerMove = playerObject.playerMove().split("");
    let rowPick = playerMove[0];
    let cellPick = playerMove[1];
    return {rowPick, cellPick};
}

let updateGameBoard = function(){
    
}

let startGame = (function(){
    console.log("Welcome to Tic Tac Toe!")
    console.log(`${playerOne.getPlayerName()}`);
    console.log(`${playerTwo.getPlayerName()}`);
    // Retreive player moves
    let playerOneChoice = playerChoice(playerOne);
    let playerTwoChoice = playerChoice(playerTwo)

    // row is the object number within our gameBoardArray
    let row = gameBoard.gameBoardArray.at(playerOneChoice.rowPick -1);
    console.log(row);

    // Here we retrieve all the keys from the object row, chosen from the above.
    let keys = Object.keys(row);

    //  Here we loop through the enumerable keys string and compare it against our cellPick (a,b,c).
    keys.forEach(key => {
        if(key === playerOneChoice.cellPick){
            gameBoard.gameBoardArray.at([row])[key] = "X";
            console.log(gameBoard.gameBoardArray);
        }
    });

}());