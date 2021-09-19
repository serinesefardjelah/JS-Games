const statusDisplay = document.querySelector(".status")

// gameActive is a varible used to pause the game in case of an end scenario
let gameActive = true;
let currentPlayer = "X";
// storing the game state here will allow us to track played cells and validate game state
let gameState = ["", "", "", "", "", "", "", "", ""]

const winningMessage = () => `Player ${currentPlayer} has won !`
const drawMessage = () => `Game ended in a draw `
const currentPlayerTurn = () => `it s ${currentPlayer} s turn `;
 
//first displayed message to let know the first player
 statusDisplay.innerHTML = currentPlayerTurn();
 const winningConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
 

 function handleCellPlayed(clickedCell, clickedCellIndex){
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
 }
 function handlePlayerChange(){
     currentPlayer = currentPlayer === "X" ? "O" : "X";
     statusDisplay.innerHTML = currentPlayerTurn();

 }

 
 
 function handleResultValidation(){
    let roundWon = false;
    for(let i = 0; i <= 7; i++){
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === "" || b === "" || c === "") {
            continue;
        }
        if (a === b && b === c){
            roundWon = true;
            break
        }
    }
    if(roundWon){
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    let roundDraw = !gameState.includes("");
    if (roundDraw){
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    handlePlayerChange();
 }
function handleCellClick(clickedCellEvent){
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    if (gameState[clickedCellIndex] !== "" || !gameActive){
        return;
    }
    //if everything is in order, we'l start the game
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();

}
function handleRestartGame(){
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll(".cell").forEach(cell => cell.innerHTML = "");

}
//adding event listener
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestartGame);
 