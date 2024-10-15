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

        const COLS = 10;
        const ROWS = 20;
        const BLOCK_SIZE = 30;
        let tetrisScore = 0;
        let tetrisHighScore = localStorage.getItem('tetrisHighScore') || 0;
        let tetrisBoard = [];
        let currentPiece;
        let tetrisGameOver = false;
        let tetrisGameLoop;

        tetrisHighScoreElement.textContent = tetrisHighScore;

        const SHAPES = [
            [[1, 1, 1, 1]],
            [[1, 1], [1, 1]],
            [[1, 1, 1], [0, 1, 0]],
            [[1, 1, 1], [1, 0, 0]],
            [[1, 1, 1], [0, 0, 1]],
            [[1, 1, 0], [0, 1, 1]],
            [[0, 1, 1], [1, 1, 0]]
        ];

        const COLORS = [
            'cyan', 'yellow', 'purple', 'green', 'red', 'blue', 'orange'
        ];

        function startTetrisGame() {
            tetrisMenuScreen.style.display = 'none';
            tetrisEndScreen.style.display = 'none';
            tetrisScoreBoard.style.display = 'block';
            tetrisCanvas.style.display = 'block';
            resetTetrisGame();
            tetrisGameLoop = setInterval(runTetrisGame, 500);
            document.addEventListener('keydown', handleTetrisKeyPress);
        }

        function endTetrisGame() {
            clearInterval(tetrisGameLoop);
            tetrisFinalScoreElement.textContent = tetrisScore;
            tetrisFinalHighScoreElement.textContent = tetrisHighScore;
            tetrisEndScreen.style.display = 'block';
            tetrisCanvas.style.display = 'none';
            document.removeEventListener('keydown', handleTetrisKeyPress);
        }

        tetrisPlayButton.addEventListener('click', startTetrisGame);
        tetrisPlayAgainButton.addEventListener('click', startTetrisGame);

        function createPiece() {
            const shapeIndex = Math.floor(Math.random() * SHAPES.length);
            const color = COLORS[shapeIndex];
            const shape = SHAPES[shapeIndex];
            return {
                shape,
                color,
                x: Math.floor(COLS / 2) - Math.ceil(shape[0].length / 2),
                y: 0
            };
        }

        function drawTetrisBoard() {
            tetrisCtx.fillStyle = '#000';
            tetrisCtx.fillRect(0, 0, tetrisCanvas.width, tetrisCanvas.height);

            tetrisBoard.forEach((row, y) => {
                row.forEach((color, x) => {
                    if (color) {
                        tetrisCtx.fillStyle = color;
                        tetrisCtx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
                    }
                });
            });

            if (currentPiece) {
                currentPiece.shape.forEach((row, y) => {
                    row.forEach((value, x) => {
                        if (value) {
                            tetrisCtx.fillStyle = currentPiece.color;
                            tetrisCtx.fillRect(
                                (currentPiece.x + x) * BLOCK_SIZE,
                                (currentPiece.y + y) * BLOCK_SIZE,
                                BLOCK_SIZE - 1,
                                BLOCK_SIZE - 1
                            );
                        }
                    });
                });
            }
        }

        function movePiece(dx, dy) {
            currentPiece.x += dx;
            currentPiece.y += dy;
            if (hasCollision()) {
                currentPiece.x -= dx;
                currentPiece.y -= dy;
                return false;
            }
            return true;
        }

        function rotatePiece() {
            const rotated = currentPiece.shape[0].map((_, i) =>
                currentPiece.shape.map(row => row[i]).reverse()
            );
            const previousShape = currentPiece.shape;
            currentPiece.shape = rotated;
            if (hasCollision()) {
                currentPiece.shape = previousShape;
            }
        }

        function hasCollision() {
            return currentPiece.shape.some((row, dy) =>
                row.some((value, dx) =>
                    value &&
                    (currentPiece.y + dy >= ROWS ||
                    currentPiece.x + dx < 0 ||
                    currentPiece.x + dx >= COLS ||
                    tetrisBoard[currentPiece.y + dy] &&
                    tetrisBoard[currentPiece.y + dy][currentPiece.x + dx])
                )
            );
        }

        function placePiece() {
            currentPiece.shape.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value) {
                        tetrisBoard[currentPiece.y + y][currentPiece.x + x] = currentPiece.color;
                    }
                });
            });
        }

        function clearLines() {
            let linesCleared = 0;
            tetrisBoard = tetrisBoard.reduce((acc, row) => {
                if (row.every(cell => cell)) {
                    linesCleared++;
                    acc.unshift(new Array(COLS).fill(0));
                } else {
                    acc.push(row);
                }
                return acc;
            }, []);
            return linesCleared;
        }

        function updateTetrisScore(linesCleared) {
            const points = [0, 40, 100, 300, 1200];
            tetrisScore += points[linesCleared];
            tetrisCurrentScoreElement.textContent = tetrisScore;
            if (tetrisScore > tetrisHighScore) {
                tetrisHighScore = tetrisScore;
                localStorage.setItem('tetrisHighScore', tetrisHighScore);
                tetrisHighScoreElement.textContent = tetrisHighScore;
            }
        }

        function handleTetrisKeyPress(event) {
            if (tetrisGameOver) return;

            switch(event.keyCode) {
                case 37: // Left arrow
                    movePiece(-1, 0);
                    break;
                case 39: // Right arrow
                    movePiece(1, 0);
                    break;
                case 40: // Down arrow
                    movePiece(0, 1);
                    break;
                case 38: // Up arrow
                    rotatePiece();
                    break;
            }
            drawTetrisBoard();
        }

        function runTetrisGame() {
            if (!movePiece(0, 1)) {
                placePiece();
                const linesCleared = clearLines();
                updateTetrisScore(linesCleared);
                currentPiece = createPiece();
                if (hasCollision()) {
                    tetrisGameOver = true;
                    endTetrisGame();
                    return;
                }
            }
            drawTetrisBoard();
        }

        function resetTetrisGame() {
            tetrisBoard = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
            tetrisScore = 0;
            tetrisGameOver = false;
            currentPiece = createPiece();
            updateTetrisScore(0);
        }

        // Initialize high scores
        snakeHighScoreElement.textContent = snakeHighScore;
        tetrisHighScoreElement.textContent = tetrisHighScore;