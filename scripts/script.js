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

    let setSymbol = function(newSymbol){
        symbol = newSymbol;
    }

    let getSymbol = function(){
        return symbol;
    }

    return {
        getPlayerName,
        increasePlayerPoints,
        getPlayerScore,
        victory,
        playerMove,
        getSymbol,
        setSymbol,
    }
}

let playerOne = playerFactory("Bobby");
let playerTwo = playerFactory("ybboB");

let playerChoice = function(playerObjects){
    Object.entries(playerObjects).forEach(([name, player]) => {
        let move = player.playerMove();
        updateGameBoard(player, move);
        
        if(player.getSymbol() === "o"){
            continueGame();
        }
    });
}

let updateGameBoard = function(player, playerMove){
    let [row, cell] = playerMove;
    const arrayIndexOffset = row - 1;
    if(gameBoard.gameBoardArray[arrayIndexOffset][cell] === ""){
        gameBoard.gameBoardArray[arrayIndexOffset][cell] = player.getSymbol();
    } else {
        console.log("Already taken"); // Get players choice again. 
    }
}

let continueGame = function(){
    checkVictory();
    playerChoice({playerOne, playerTwo});
}

let checkVictory = function(){
    let gameBoardRowCount = gameBoard.gameBoardArray.length;

    gameBoard.gameBoardArray.forEach(gameBoardRow => {
        let getRowSymbols = Object.values(gameBoardRow).slice(1);
        if(getRowSymbols.every(entry => entry === playerOne.getSymbol())){
            playerOne.increasePlayerPoints();
            console.log(playerOne.victory());
            console.log(playerOne.getPlayerScore());
        } else if(getRowSymbols.every(entry => entry === playerTwo.getSymbol())){
            playerTwo.increasePlayerPoints();
            console.log(playerTwo.victory());
            console.log(playerTwo.getPlayerScore());
        }
    });
}

let startGame = (function(){
    [playerOne.symbol, playerTwo.symbol] = [playerOne.setSymbol("x"), playerTwo.setSymbol("o")];
    console.log("Welcome to Tic Tac Toe!")
    console.log(`${playerOne.getPlayerName()} Symbol: ${playerOne.getSymbol()}`);
    console.log(`${playerTwo.getPlayerName()} Symbol: ${playerTwo.getSymbol()}`);
    playerChoice({playerOne, playerTwo});
}());