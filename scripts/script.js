// Make gameboard a IIFE so another instance cannot be made.
let gameBoard = (function(){
    const gameBoardArray = []
    let count = 1;

    for(let i = 0; i < 9; i+=3){
        gameBoardArray.push({row: count, sectionA: "a", sectionB: "b", sectionC: "c"});
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

    let victory = function(){
        let nameToUpperCase = name.toUpperCase();
        return `${nameToUpperCase} is the winner with ${score} points!`;
    }

    return {
        getPlayerName,
        increasePlayerPoints,
        getPlayerScore,
        victory,
    }
}

let playerOne = playerFactory("Bobby");
let playerTwo = playerFactory("ybboB");

//let secondPlayer = playerFactory("Sammy");
//console.log(secondPlayer.getPlayerInfo());

// FNCTION createPlayer
    // attributes defining player such as name
    // return player object 

// Create object to control flow of game

    // FNCTION playGame
        // listen for user input
        // fill array with user input
        // update if either row is full of x or o and continue if not. if all spots are filled and neither contain full row make a tie.

