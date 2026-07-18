// Make gameboard a IIFE so another instance cannot be made.
let gameBoard = (function(){
    const gameBoardArray = []

    for(let i = 0; i < 9; i++){
        gameBoardArray.push([]);
    }

    return {gameBoardArray};
})();


// Create player objects

// FNCTION createPlayer
    // attributes defining player such as name
    // return player object 

// Create object to control flow of game

    // FNCTION playGame
        // listen for user input
        // fill array with user input
        // update if either row is full of x or o and continue if not. if all spots are filled and neither contain full row make a tie.

