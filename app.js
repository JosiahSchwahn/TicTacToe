/* types need to be declared for the entire project */
"use strict";



/* factory function for players (there) will be multiple of one*/
const player = ((symbol, name) => {

    this.symbol = symbol;
    this.name = name;

    const getSymbol = () =>{
        return symbol;
    };

    const getName = () =>{
        return name;
    }
    return {getSymbol, getName}
});


/* Modal pattern for our game board, only need one object for this app */
const gameBoard = (() => {

    const board = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];

    const setField = ((index, sign) => {
        if(index > board.length - 1) {
            console.log(`Index is out of range`);
        }
        board[index] = sign;
    });

    const getField = ((index) => {
        if(index > board.length - 1) {  
                console.log(`Index is out of Range`);
                
        }
        return board[index];
    });

    const resetBoard = () => {
        for(let i = 0; i < board.length - 1; i++){
            board[i] = i.toString();
        }
    };

    /*check board status*/
    const printBoard = () =>{
        for(let i = 0; i <= board.length - 1; i++){
            console.log(board[i]);   
        }
    };

    return {setField, getField, printBoard, resetBoard};

})();


const gameController = (() => {

    const playerOne = player("X", "Josiah");
    const playerTwo = player("O", "Chase");
    let gameOver = false;
    let round = 1;

    const playRound = (fieldIndex) => {    
        //checks if there is a winning combination
        if(!checkIfWinner()){
            if(round <= 9){  
                if(fieldIndex >= 0 && fieldIndex <= 8){  
                    if(gameBoard.getField(fieldIndex) == playerOne.getSymbol() || gameBoard.getField(fieldIndex) == playerTwo.getSymbol()){
                        return "That spot is filled";
                    }
                    gameBoard.setField(fieldIndex, getPlayerSymbol()); 
                    gameBoard.printBoard();
                    round++;
                    checkIfWinner();
                    return;     
                }                                
                return `Index is out of range of board, use an index 0 through 8`;  
            } else {
                return `Draw`;
            } 
        } 
         
    };

    const checkIfWinner = () =>{
        const winningIndexes = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
          ];    
        // check through each pair of winningIndexes
        // if all the gameBoard.getSymbol(winningIndex) combinations are equal, we have a winner
        for(let i = 0; i < winningIndexes.length; i++){ 
            if((gameBoard.getField(winningIndexes[i][0]) == gameBoard.getField(winningIndexes[i][1])) &&
            (gameBoard.getField(winningIndexes[i][0]) == gameBoard.getField(winningIndexes[i][2]))){
                    console.log(`We have a winner, the game is over`);        
                    return true;     
            }       
        }
        return false;
    };

    const getPlayerSymbol = () => {
        if(round % 2 == 1){
            return playerOne.getSymbol();
        }
        return playerTwo.getSymbol();
    };

    const getRound = ( () =>{
        return round;
    });

    const resetGame = () => {
        gameBoard.resetBoard();
        round = 1;
    }

    return {playRound, getRound, checkIfWinner, resetGame}
    
})();

const gameDisplay = (() =>{

    const fieldElements = document.querySelectorAll(".field")

    fieldElements.forEach((e, index, array) => {
        e.addEventListener("click", () =>{
            console.log(index);
            console.log(array);
                     
            console.log(`Hello world`);        
        });
    
    });
})();



