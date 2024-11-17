document.addEventListener('DOMContentLoaded', () => {
    const board = Array(9).fill(null); // Game state
    const cells = []; // Store cell elements
    let currentPlayer = 'X';
    let gameActive = true;

    const gameBoard = document.getElementById('game-board');
    const gameStatus = document.getElementById('game-status');
    const resetButton = document.getElementById('reset-btn');

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // Create the game board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => handleCellClick(i));
        gameBoard.appendChild(cell);
        cells.push(cell);
    }

    function handleCellClick(index) {
        if (!gameActive || board[index] !== null) return;

        board[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        cells[index].classList.add('taken');

        if (checkWin()) {
            gameStatus.textContent = `Player ${currentPlayer} Wins! 🎉`;
            gameActive = false;
        } else if (board.every(cell => cell !== null)) {
            gameStatus.textContent = "It's a Tie! 🤝";
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            gameStatus.textContent = `Player ${currentPlayer}'s Turn`;
        }
    }

    function checkWin() {
        return winningCombinations.some(combination =>
            combination.every(index => board[index] === currentPlayer)
        );
    }

    resetButton.addEventListener('click', resetGame);

    function resetGame() {
        board.fill(null);
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('taken');
        });
        currentPlayer = 'X';
        gameActive = true;
        gameStatus.textContent = "Player X's Turn";
    }
});
