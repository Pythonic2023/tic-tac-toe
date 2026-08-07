// Event listener.
let gameBoardSelector = document.querySelector(".gameboard");
gameBoardSelector.addEventListener('click', function(e){
    clickedCell(e);
});

let isEven = function(round){
    console.log("entered iseven")
    console.log(roundCount)
    if(roundCount % 2 === 0){
        return true;
    } else {
        return false;
    }
}

let clickedCell = function(e){
    console.log(e.target.className);
    console.log(e.target);
    if(e.target.textContent === "" && isEven(roundCount)){
        e.target.textContent = "x";
    } else if(e.target.textContent === ""){
        e.target.textContent = "o";
    }
    roundCount += 1;
} // Update gameboard array now, as it properly shows alternating x's and o's. Call checkvictory to check victory after former complete. 
  // A call to update gameboard with player object and a class property should do the trick for updating gameboard.
let roundCount = 1;
// Make gameboard a IIFE so another instance cannot be made.
let gameBoard = (function(){
    const gameBoardArray = []
    for(let i = 1; i < 4; i++){
        gameBoardArray.push({row: i, a:"", b:"", c: ""});
    }

    return {gameBoardArray};
})();

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
        let move = prompt(`${getPlayerName()}\n${getPlayerScore()}\nPick move: row 1, 2 or 3 then a, b or c. For example 1a.`);
        return move;
    }

    let retryMove = function(name){
        let move = prompt(`Name: ${name}\nCell picked already! Pick again.`);
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
        retryMove,
    }
}

let playerOne = playerFactory("Bobby");
let playerTwo = playerFactory("ybboB");

let playerChoice = function(playerObjects){
    if(Object.keys(playerObjects).length === 1){
        playerRetryMove(playerObjects);
    }
    Object.entries(playerObjects).forEach(([name, player]) => {
        let move = player.playerMove();
        updateGameBoard(player, move);
        checkVictory();
    });
    continueGame();
}

let playerRetryMove = function(playerObjects) {
    console.log(playerObjects);
    let callRetryMethod = function(object){
        let move = object.retryMove(object.getPlayerName());
        console.log(move);
        updateGameBoard(object, move);
    }

    if(playerObjects.playerOne){
        callRetryMethod(playerObjects.playerOne);
    } else {
        callRetryMethod(playerObjects.playerTwo);
    }

}

let displayObject = {
    updateDisplay: function(gameBoardArray){
       gameBoardArray.forEach(object => {
            let objectRow = object.row;
            let entries = Object.entries(object);
            entries.forEach(entry => {
                if(entry[1] != "" && entry[0] != "row"){
                    const selectedElement = document.querySelector("." + entry[0] + objectRow);
                    selectedElement.textContent = entry[1];
                }

            });
       });
    },
};

let updateGameBoard = function(player, playerMove){
    let [row, cell] = playerMove;
    const arrayIndexOffset = row - 1;
    if(gameBoard.gameBoardArray[arrayIndexOffset][cell] === ""){
        gameBoard.gameBoardArray[arrayIndexOffset][cell] = player.getSymbol();
        console.table(gameBoard.gameBoardArray);
        displayObject.updateDisplay(gameBoard.gameBoardArray);
    } else {
        console.table(gameBoard.gameBoardArray);
        if(player.getSymbol() === "x"){
            playerRetryMove({playerOne});
        } else {
            playerRetryMove({playerTwo});
        }
    }
}

let continueGame = function(newRound, player){
    checkVictory();
    setTimeout(() => {
        playerChoice({playerOne, playerTwo});
    }, 2000);
}

let checkVictory = function(){    

    let isTie = function(){
        let res = gameBoard.gameBoardArray.every(entry => {
            let symbols = Object.values(entry).slice(1);
            return symbols.every(symbol => symbol === "x" || symbol === "o");
        });

        if(res === true){
            alert("Tie! reseting gameboard...");
            regenerateGameBoard();
        }
    }

    let gameWinner = function(player){
        player.increasePlayerPoints();
        console.log(player.victory());
        console.log(player.getPlayerScore());
        regenerateGameBoard();
    }
    gameBoard.gameBoardArray.forEach(gameBoardRow => {
        let getRowSymbols = Object.values(gameBoardRow).slice(1);
        if(getRowSymbols.every(entry => entry === playerOne.getSymbol())){
           gameWinner(playerOne);
        } else if(getRowSymbols.every(entry => entry === playerTwo.getSymbol())){
            gameWinner(playerTwo);
        }
    });
    let columnKey = ["a", "b", "c"];
    columnKey.forEach(key => {
        let playerOneColumnCheck = gameBoard.gameBoardArray.every(object => object[key] === playerOne.getSymbol());
        let playerTwoColumnCheck = gameBoard.gameBoardArray.every(object => object[key] === playerTwo.getSymbol());
        if(playerOneColumnCheck === true){
            gameWinner(playerOne);
        } else if(playerTwoColumnCheck === true){
            gameWinner(playerTwo);
        }
    });

    isTie();
}

let regenerateGameBoard = function(){
    gameBoard.gameBoardArray.forEach(object => {
        let objectKeys = Object.keys(object).slice(1);
        objectKeys.forEach(key => {
            object[key] = "";
        });
    });
    playerChoice({playerOne, playerTwo});
}

let startGame = (function(){
    [playerOne.symbol, playerTwo.symbol] = [playerOne.setSymbol("x"), playerTwo.setSymbol("o")];
    console.log("Welcome to Tic Tac Toe!")
    console.log(`${playerOne.getPlayerName()} Symbol: ${playerOne.getSymbol()}`);
    console.log(`${playerTwo.getPlayerName()} Symbol: ${playerTwo.getSymbol()}`);
    //playerChoice({playerOne, playerTwo});
}());