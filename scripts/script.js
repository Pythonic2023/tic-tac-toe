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
    let symbol = ""
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

    let getSymbol = function(){
        console.log(symbol);
    }

    return {
        getPlayerName,
        increasePlayerPoints,
        getPlayerScore,
        victory,
        playerMove,
        getSymbol,
    }
}

let playerOne = playerFactory("Bobby");
let playerTwo = playerFactory("ybboB");

let playerChoice = function(playerObjects){
    Object.entries(playerObjects).forEach(([name, player]) => {
        let move = player.playerMove();
        updateGameBoard(move);
    });
}

let updateGameBoard = function(playerMove){
    let [row, cell] = playerMove;
    arrayIndexAlign = row - 1;
    if(gameBoard.gameBoardArray[arrayIndexAlign][cell] === ""){
        gameBoard.gameBoardArray[arrayIndexAlign][cell] = "X";
        console.log(gameBoard.gameBoardArray);
    } else {
        console.log("Already taken");
    }
}

let startGame = (function(){
    [playerOne.move, playerTwo.move] = ["x", "o"];
    console.log("Welcome to Tic Tac Toe!")
    console.log(`${playerOne.getPlayerName()} Symbol: ${playerOne.move}`);
    console.log(`${playerTwo.getPlayerName()} Symbol: ${playerTwo.move}`);
    playerChoice({playerOne, playerTwo});
}());