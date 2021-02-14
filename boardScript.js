const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]');
const bigBoard = document.getElementById('bigBoard');
const restartButton = document.getElementById('restartButton');
const resultPage = document.getElementById('resultPage');
const resultText = document.querySelector("[data-result-page-text]");
const menuButton = document.getElementById("menu");
let circleTurn;

startGame();

restartButton.addEventListener('click', startGame);
menuButton.addEventListener('click', goToSingleOrTeamPage);

function goToSingleOrTeamPage() {
    window.location.href='singleOrTeam.html';
}

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        // extra precaution for when the game is restarted
        cell.removeEventListener('click', handleClick);
        // you can only click a cell once, afterwords the handler will not fire
        cell.addEventListener('click', handleClick, {once: true});
    });
    setBoardHoverClass();
    resultPage.classList.remove('show');   
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS // currentclass could be set to a function that has a couple if else statements
    placeMark(cell, currentClass);
    if(classWon(currentClass)) {
        showWinScreen();
    }
    else if(isDraw()) {
        showDrawScreen();
    }
    else {
        swapTurns();
        setBoardHoverClass();
    }  
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
} 

function classWon(currentClass) {
    // loop through each combinations in the array checking with the board
    // has to be at least one winning combination
    return WINNING_COMBINATIONS.some(combination => {
        // look at each the individual array and see if all three spots have the same mark
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}
function showDrawScreen() {
    resultText.innerText = 'Draw!';
    // shows the next screen
    resultPage.classList.add('show');
}

function showWinScreen() {
    resultText.innerText = `${circleTurn ? "O's" : "X's"} Wins`;
     // shows the next screen
     resultPage.classList.add('show');
}

function isDraw() {
    // every cell either needs to have an x or an o to classify as a draw
    // destructure cellElements into an array with [...cellElements]
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || 
        cell.classList.contains(CIRCLE_CLASS);
    })
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    bigBoard.classList.remove(X_CLASS);
    bigBoard.classList.remove(CIRCLE_CLASS);
    if(circleTurn) {
        bigBoard.classList.add(CIRCLE_CLASS);
    }
    else {
        bigBoard.classList.add(X_CLASS);
    }
}