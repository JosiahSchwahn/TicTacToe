/* types need to be declared for the entire project */
"use strict";

/* factory function for players (there) will be multiple of one*/
const player = ((symbol, name) => {

    this.symbol = symbol;
    this.name = name;

    let numberOfWins = 0;

    const getSymbol = () =>{
        return symbol;
    };

    const getName = () =>{
        return name;
    }

    const addWin = () => {
        numberOfWins += 1;
    }

    const getWins = () =>{
        return numberOfWins;
    }

    return {getSymbol, getName, getWins, addWin}
});


/* Modal pattern for our game board, only need one object for this app */
const gameBoard = (() => {

    const board = ["", "", "", "", "", "", "", "", ""];

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
    

    const getBoardLength = () =>{
        return board.length;
    }

    const resetBoard = () => {
        for(let i = 0; i < board.length; i++){
            board[i] = "";
        }
    };

    /*check board status*/
    const printBoard = () =>{
        for(let i = 0; i <= board.length - 1; i++){
            console.log(board[i]);   
        }
    };

    return {setField, getField, printBoard, resetBoard, getBoardLength};

})();


const gameController = (() => {

    const playerOne = player("X", "Josiah");
    const playerTwo = player("O", "Chase");
    let round = 1;
    let gameOver = false;


    const playRound = (fieldIndex) => {    
        //checks if there is a winning combination
        if(!checkIfWinner()){
            if(round <= 9){  
                if(fieldIndex >= 0 && fieldIndex <= 8){  
                    if(gameBoard.getField(fieldIndex) == playerOne.getSymbol() || gameBoard.getField(fieldIndex) == playerTwo.getSymbol()){
                        return "That spot is filled";
                    }
                    gameBoard.setField(fieldIndex, getPlayerSymbol()); 
                    //gameBoard.printBoard();
                    round++;
                    checkIfWinner();
                    return;     
                }                                
                return `Index is out of range of board, use an index 0 through 8`;  
            } 
            return "Draw";       
             
        }         
    };

    const getPlayers = () =>{
        return [playerOne, playerTwo];
    }


    const checkIfWinner = () =>{

        if(!gameOver){
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
                (gameBoard.getField(winningIndexes[i][0]) == gameBoard.getField(winningIndexes[i][2])) &&
                gameBoard.getField(winningIndexes[i][0]) !== ""){
                        whosTurn().addWin();
                        console.log(`${whosTurn().getSymbol()} won the game`);
                        gameOver = true;
                        return true;     
                }       
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

    const whosTurn = () => {
        if(round % 2 == 1){
            return playerTwo;
        }
        return playerOne;
    }

    const getRound = ( () =>{
        return round;
    });

    const resetGame = () => {
        gameBoard.resetBoard();
        round = 1;
        gameOver = false;
    }

    const getGameOver = () => {
        return gameOver;
    }

    return {playRound, getRound, checkIfWinner, resetGame, getPlayers, getGameOver}
    
})();




const gameDisplay = (() =>{

    const fieldElements = document.querySelectorAll(".field");
    const resetBtn = document.querySelector("button.reset-btn");
    const scoreOne = document.querySelector(".scoreOne");
    const scoreTwo = document.querySelector(".scoreTwo");
    const modalCard = document.querySelector(".hidden.modal-card");
    const winnerText = document.querySelector(".winnerText");
    const playAgainBtn = document.querySelector(".play-again-btn");


    fieldElements.forEach((e, index) => {  
        e.addEventListener("click", () =>{
            gameController.playRound(index);       
            updateBoardDisplay();     
        });
    });

    resetBtn.addEventListener("click", () =>{
        gameController.resetGame();
        updateBoardDisplay();    

    });


    playAgainBtn.addEventListener("click", () => {
        gameController.resetGame();
        modalCard.classList.add("hidden");
        updateBoardDisplay();  
    });
    

    const updateBoardDisplay = () =>{
        /* resets board*/
        for(let i = 0; i <gameBoard.getBoardLength(); i++){
            fieldElements[i].innerHTML = gameBoard.getField(i);
        }  
        /* updates score board */
        scoreOne.innerHTML = `${gameController.getPlayers()[0].getSymbol()}'s wins: ${gameController.getPlayers()[0].getWins()}`;
        scoreTwo.innerHTML = `${gameController.getPlayers()[1].getSymbol()}'s wins: ${gameController.getPlayers()[1].getWins()}`;

        /*updates winner text to be displayed on modal*/
        if(gameController.getRound() >= 10){
            winnerText.innerHTML = `Draw`;
        }
        else if((gameController.getRound() % 2) == 0){
            winnerText.innerHTML = `${gameController.getPlayers()[0].getSymbol()} won`;
        } 
        else{
            winnerText.innerHTML = `${gameController.getPlayers()[1].getSymbol()} won `;
        }
        
        /*modal if game is over */
        if(gameController.getGameOver()){
            modalCard.classList.remove("hidden");
        }

    };
    return {updateBoardDisplay}

})();



