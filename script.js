const cells = document.querySelectorAll('[data-cell]');
const gameStatus = document.getElementById('gameStatus');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let isGameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (gameState[cellIndex] !== "" || !isGameActive) {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    checkForWinner();
    switchPlayer();
};

const switchPlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameStatus.textContent = `Player ${currentPlayer}'s Turn`;
};

const checkForWinner = () => {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameStatus.textContent = `Player ${currentPlayer} Wins!`;
        isGameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        gameStatus.textContent = `It's a Draw!`;
        isGameActive = false;
        return;
    }
};

const restartGame = () => {
    currentPlayer = 'X';
    isGameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameStatus.textContent = `Player ${currentPlayer}'s Turn`;
    cells.forEach(cell => (cell.textContent = ""));
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
