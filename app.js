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

    const board = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

    const setField = ((index, sign) => {
        if(index > board.length) {
            console.log("Index is out of range on Board, cannot setField)");
            return;
        }
        board[index] = sign;
    });

    const getField = ((index) => {
        if(index > board.length) {
            console.log("Index is out of range on Board, cannot getField()");
            return;
        }
        return board[index];
    });

    const resetGame = () => {
        for(let i = 0; i < board.length - 1; i++){
            board[i] = i.toString();
        }
    };

    /* used for test purposes*/
    const printBoard = () =>{
        for(let i = 0; i <= board.length - 1; i++){
            console.log(board[i]);   
        }
    };

    return {setField, getField, resetGame, printBoard};

})();


const gameController = (() => {

    const playerOne = player("X", "Josiah");
    const playerTwo = player("O", "Chase");
    let gameOver = false;
    let round = 1;

    const playRound = (fieldIndex, round) => {     
        gameBoard.setField(fieldIndex, getPlayerSymbol()); 
        gameBoard.printBoard();
        round++;
        return "Played Round";      
    };


    const getPlayerSymbol = () => {
        if(round % 2 == 1){
            return playerOne.getSymbol();
        }
        return playerTwo.getSymbol();
    }

    return {playRound, round}
    
})();



/* 
const checkIfWinner = () =>{

        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
          ];

        for(let i = 0; i < winningCombos.length; i++){
            
        }
        
        


    };
*/




const module = (() =>{
    let x = 1;
    const iterate = () =>{
        x++;
        console.log(x);
    }
    return {iterate,x}
})();