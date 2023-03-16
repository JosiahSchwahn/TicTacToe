/* types need to be declared for the entire project */
"use strict";

/* factory function for players (there) will be multiple of one*/
const player = ((symbol) => {

    this.symbol = symbol;

    const getSymbol = () =>{
        return symbol;
    };

    return {getSymbol}
});


/* Modal pattern for our game board, only need one object for this app */
const gameBoard = (() => {

    const board = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

    const setField = ((index, sign) => {
        if(index > board.length) return;
        board[index] = sign;
    });

    const getField = ((index) => {
        if(index > board.length) return;
        return board[index];
    });

    const resetGame = (() => {
        for(let i = 0; i < board.length - 1; i++){
            board[i] = i.toString();
        }
    });

    /* used for test purposes*/
    const printBoard = (() =>{
        for(let i = 0; i < board.length - 1; i++){
            console.log(board[i]);   
        }
    });

    return {setField, getField, resetGame, printBoard};

})();


const gameController = (() => {

    const playerOne = player("X");
    const playerTwo = player("O");
    
    const gameOver = false;
    let round = 1;

    const playRound = ((fieldIndex) => {  
        gameBoard.setField(fieldIndex, getPlayerSymbol());
        round++;
    });

    const getPlayerSymbol = () => {
        if(round % 2 == 1){
            return playerOne.getSymbol();
        }
        return playerTwo.getSymbol();
    }

    return {playRound}
    
})();






