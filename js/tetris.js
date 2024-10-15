const tetrisCanvas = document.getElementById('tetrisCanvas');
const tetrisCtx = tetrisCanvas.getContext('2d');
const tetrisCurrentScoreElement = document.getElementById('tetrisCurrentScore');
const tetrisHighScoreElement = document.getElementById('tetrisHighScore');
const tetrisFinalScoreElement = document.getElementById('tetrisFinalScore');
const tetrisFinalHighScoreElement = document.getElementById('tetrisFinalHighScore');
const tetrisScoreBoard = document.getElementById('tetrisScoreBoard');
const tetrisMenuScreen = document.getElementById('tetrisMenuScreen');
const tetrisEndScreen = document.getElementById('tetrisEndScreen');
const tetrisPlayButton = document.getElementById('tetrisPlayButton');
const tetrisPlayAgainButton = document.getElementById('tetrisPlayAgainButton');

const tetrisRow = 20;
const tetrisCol = 10;
const tetrisSquareSize = 30;
const vacantColor = "white"; // Empty square

let tetrisScore = 0;
let tetrisHighScore = localStorage.getItem('tetrisHighScore') || 0;
let tetrisGameOver = false;
let tetrisGameLoop;

tetrisHighScoreElement.textContent = tetrisHighScore;

// Draw a square on the canvas
function drawSquare(x, y, color) {
    tetrisCtx.fillStyle = color;
    tetrisCtx.fillRect(x * tetrisSquareSize, y * tetrisSquareSize, tetrisSquareSize, tetrisSquareSize);

    tetrisCtx.strokeStyle = "black";
    tetrisCtx.strokeRect(x * tetrisSquareSize, y * tetrisSquareSize, tetrisSquareSize, tetrisSquareSize);
}

// Create the board (empty grid initially)
let tetrisBoard = [];
for (let r = 0; r < tetrisRow; r++) {
    tetrisBoard[r] = [];
    for (let c = 0; c < tetrisCol; c++) {
        tetrisBoard[r][c] = vacantColor; // Initialize each cell as vacant
    }
}

// Draw the board
function drawBoard() {
    for (let r = 0; r < tetrisRow; r++) {
        for (let c = 0; c < tetrisCol; c++) {
            drawSquare(c, r, tetrisBoard[r][c]);
        }
    }
}

drawBoard();

// Define the Tetromino shapes and colors
const tetrominos = [
    [[1, 1, 1, 1]],  // I
    [[1, 1, 1], [0, 1, 0]],  // T
    [[1, 1, 0], [0, 1, 1]],  // Z
    [[0, 1, 1], [1, 1, 0]],  // S
    [[1, 1, 1], [1, 0, 0]],  // L
    [[1, 1, 1], [0, 0, 1]],  // J
    [[1, 1], [1, 1]]         // O
];

const tetrominoColors = [
    "cyan", "purple", "red", "green", "orange", "blue", "yellow"
];

// Generate random Tetromino
function randomTetromino() {
    let randomN = Math.floor(Math.random() * tetrominos.length);
    return new Tetromino(tetrominos[randomN], tetrominoColors[randomN]);
}

// Tetromino object constructor
function Tetromino(shape, color) {
    this.shape = shape;
    this.color = color;

    // Starting position
    this.x = 3;
    this.y = -2;

    // Draw the Tetromino on the board
    this.draw = function () {
        for (let r = 0; r < this.shape.length; r++) {
            for (let c = 0; c < this.shape[r].length; c++) {
                if (this.shape[r][c]) {
                    drawSquare(this.x + c, this.y + r, this.color);
                }
            }
        }
    };

    // Undraw the Tetromino (erase by drawing over it with the vacant color)
    this.unDraw = function () {
        for (let r = 0; r < this.shape.length; r++) {
            for (let c = 0; c < this.shape[r].length; c++) {
                if (this.shape[r][c]) {
                    drawSquare(this.x + c, this.y + r, vacantColor);
                }
            }
        }
    };

    // Move the Tetromino down
    this.moveDown = function () {
        if (!this.collision(0, 1, this.shape)) {
            this.unDraw();
            this.y++;
            this.draw();
        } else {
            // Lock the Tetromino and generate a new one
            this.lock();
            tetromino = randomTetromino();
        }
    };

    // Move the Tetromino left
    this.moveLeft = function () {
        if (!this.collision(-1, 0, this.shape)) {
            this.unDraw();
            this.x--;
            this.draw();
        }
    };

    // Move the Tetromino right
    this.moveRight = function () {
        if (!this.collision(1, 0, this.shape)) {
            this.unDraw();
            this.x++;
            this.draw();
        }
    };

    // Rotate the Tetromino
    this.rotate = function () {
        let nextPattern = this.shape[0].map((val, index) => this.shape.map(row => row[index]).reverse());
        if (!this.collision(0, 0, nextPattern)) {
            this.unDraw();
            this.shape = nextPattern;
            this.draw();
        }
    };

    // Collision detection
    this.collision = function (x, y, piece) {
        for (let r = 0; r < piece.length; r++) {
            for (let c = 0; c < piece[r].length; c++) {
                if (!piece[r][c]) continue;

                let newX = this.x + c + x;
                let newY = this.y + r + y;

                if (newX < 0 || newX >= tetrisCol || newY >= tetrisRow) {
                    return true;
                }

                if (newY < 0) continue;

                if (tetrisBoard[newY][newX] !== vacantColor) {
                    return true;
                }
            }
        }
        return false;
    };

    // Lock the Tetromino in place
    this.lock = function () {
        for (let r = 0; r < this.shape.length; r++) {
            for (let c = 0; c < this.shape[r].length; c++) {
                if (!this.shape[r][c]) continue;
                if (this.y + r < 0) {
                    tetrisGameOver = true;
                    endTetrisGame();
                    return;
                }
                tetrisBoard[this.y + r][this.x + c] = this.color;
            }
        }

        // Remove completed rows
        for (let r = 0; r < tetrisRow; r++) {
            let isRowFull = true;
            for (let c = 0; c < tetrisCol; c++) {
                isRowFull = isRowFull && (tetrisBoard[r][c] !== vacantColor);
            }
            if (isRowFull) {
                for (let y = r; y > 1; y--) {
                    for (let c = 0; c < tetrisCol; c++) {
                        tetrisBoard[y][c] = tetrisBoard[y - 1][c];
                    }
                }
                for (let c = 0; c < tetrisCol; c++) {
                    tetrisBoard[0][c] = vacantColor;
                }
                tetrisScore += 10;
                updateTetrisScore();
            }
        }

        drawBoard();
    };
}

// Update the score
function updateTetrisScore() {
    tetrisCurrentScoreElement.textContent = tetrisScore;
}

// Update the high score
function updateTetrisHighScore() {
    if (tetrisScore > tetrisHighScore) {
        tetrisHighScore = tetrisScore;
        localStorage.setItem('tetrisHighScore', tetrisHighScore);
        tetrisHighScoreElement.textContent = tetrisHighScore;
    }
}

// Game control
let tetromino = randomTetromino();

// Keyboard controls
document.addEventListener('keydown', function (event) {
    if (event.keyCode === 37) {
        tetromino.moveLeft();
    } else if (event.keyCode === 38) {
        tetromino.rotate();
    } else if (event.keyCode === 39) {
        tetromino.moveRight();
    } else if (event.keyCode === 40) {
        tetromino.moveDown();
    }
});

// Game loop
function startTetrisGame() {
    tetrisMenuScreen.style.display = 'none';
    tetrisEndScreen.style.display = 'none';
    tetrisScoreBoard.style.display = 'block';
    tetrisCanvas.style.display = 'block';
    resetTetrisGame();
    tetrisGameLoop = setInterval(runTetrisGame, 500);
}

function endTetrisGame() {
    clearInterval(tetrisGameLoop);
    updateTetrisHighScore();
    tetrisFinalScoreElement.textContent = tetrisScore;
    tetrisFinalHighScoreElement.textContent = tetrisHighScore;
    tetrisEndScreen.style.display = 'block';
    tetrisCanvas.style.display = 'none';
}

// Reset the game
function resetTetrisGame() {
    for (let r = 0; r < tetrisRow; r++) {
        for (let c = 0; c < tetrisCol; c++) {
            tetrisBoard[r][c] = vacantColor;
        }
    }
    tetrisScore = 0;
    tetrisGameOver = false;
    drawBoard();
    tetromino = randomTetromino();
}

// Run the game loop
function runTetrisGame() {
    tetromino.moveDown();
}

tetrisPlayButton.addEventListener('click', startTetrisGame);
tetrisPlayAgainButton.addEventListener('click', startTetrisGame);
