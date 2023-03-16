
/* Modal pattern for our game board, only need one object for this app */
const gameBoard = (() => {

    const board = ["", "", "","", "", "","", "", ""];

    const setField = ((index, sign) => {
        if(index > board.length) return;
        board[index] = sign;
    });

    const getField = ((index) => {
        if(index > board.length) return;
        return board[index];
    });

    const resetGame = (() => {
        for(let i = 0; i < board.length; i++){
            board[i] = "";
        }
    });

    return {setField, getField, resetGame};

})();



/* messing with closure */
function human(n){
    const name = n;
    function sayHi(){
        console.log(`Hi i am ${name}`);
    }
    function sayHowYouFeel(){
        console.log(`${name} is feeling good!`);
    }
    return{
        sayHi,
        sayHowYouFeel
    }
};

const joe = human("josiah");
const chase = human("chase")

chase.sayHowYouFeel();


