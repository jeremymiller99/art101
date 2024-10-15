const snakeCanvas = document.getElementById('snakeCanvas');
        const snakeCtx = snakeCanvas.getContext('2d');
        const snakeCurrentScoreElement = document.getElementById('snakeCurrentScore');
        const snakeHighScoreElement = document.getElementById('snakeHighScore');
        const snakeFinalScoreElement = document.getElementById('snakeFinalScore');
        const snakeFinalHighScoreElement = document.getElementById('snakeFinalHighScore');
        const snakeScoreBoard = document.getElementById('snakeScoreBoard');
        const snakeMenuScreen = document.getElementById('snakeMenuScreen');
        const snakeEndScreen = document.getElementById('snakeEndScreen');
        const snakePlayButton = document.getElementById('snakePlayButton');
        const snakePlayAgainButton = document.getElementById('snakePlayAgainButton');

        const gridSize = 20;
        const tileCount = 20;
        let snake = [{x: 10, y: 10}];
        let food = {x: 15, y: 15};
        let dx = 0;
        let dy = 0;
        let snakeScore = 0;
        let snakeHighScore = localStorage.getItem('snakeHighScore') || 0;
        let snakeGameOver = false;
        let snakeGameLoop;

        snakeHighScoreElement.textContent = snakeHighScore;

        function startSnakeGame() {
            snakeMenuScreen.style.display = 'none';
            snakeEndScreen.style.display = 'none';
            snakeScoreBoard.style.display = 'block';
            snakeCanvas.style.display = 'block';
            resetSnakeGame();
            snakeGameLoop = setInterval(runSnakeGame, 100);
        }

        function endSnakeGame() {
            clearInterval(snakeGameLoop);
            snakeFinalScoreElement.textContent = snakeScore;
            snakeFinalHighScoreElement.textContent = snakeHighScore;
            snakeEndScreen.style.display = 'block';
            snakeCanvas.style.display = 'none';
        }

        snakePlayButton.addEventListener('click', startSnakeGame);
        snakePlayAgainButton.addEventListener('click', startSnakeGame);

        document.addEventListener('keydown', function(event) {
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(event.code) > -1) {
                event.preventDefault();
            }
            changeSnakeDirection(event);
        });

        function changeSnakeDirection(event) {
            const LEFT_KEY = 37;
            const RIGHT_KEY = 39;
            const UP_KEY = 38;
            const DOWN_KEY = 40;

            const keyPressed = event.keyCode;
            const goingUp = dy === -1;
            const goingDown = dy === 1;
            const goingRight = dx === 1;
            const goingLeft = dx === -1;

            if (keyPressed === LEFT_KEY && !goingRight) {
                dx = -1;
                dy = 0;
            }
            if (keyPressed === UP_KEY && !goingDown) {
                dx = 0;
                dy = -1;
            }
            if (keyPressed === RIGHT_KEY && !goingLeft) {
                dx = 1;
                dy = 0;
            }
            if (keyPressed === DOWN_KEY && !goingUp) {
                dx = 0;
                dy = 1;
            }
        }

        function moveSnake() {
            const head = {x: snake[0].x + dx, y: snake[0].y + dy};
            snake.unshift(head);

            if (head.x === food.x && head.y === food.y) {
                snakeScore++;
                updateSnakeScore();
                generateFood();
            } else {
                snake.pop();
            }
        }

        function generateFood() {
            food.x = Math.floor(Math.random() * tileCount);
            food.y = Math.floor(Math.random() * tileCount);
        }

        function drawSnakeGame() {
            snakeCtx.fillStyle = 'white';
            snakeCtx.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);

            snakeCtx.fillStyle = 'green';
            for (let i = 0; i < snake.length; i++) {
                snakeCtx.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize - 2, gridSize - 2);
            }

            snakeCtx.fillStyle = 'red';
            snakeCtx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
        }

        function checkSnakeCollision() {
            const head = snake[0];

            if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
                snakeGameOver = true;
            }

            for (let i = 1; i < snake.length; i++) {
                if (head.x === snake[i].x && head.y === snake[i].y) {
                    snakeGameOver = true;
                }
            }

            if (snakeGameOver) {
                updateSnakeHighScore();
                endSnakeGame();
            }
        }

        function updateSnakeScore() {
            snakeCurrentScoreElement.textContent = snakeScore;
        }

        function updateSnakeHighScore() {
            if (snakeScore > snakeHighScore) {
                snakeHighScore = snakeScore;
                localStorage.setItem('snakeHighScore', snakeHighScore);
                snakeHighScoreElement.textContent = snakeHighScore;
            }
        }

        function runSnakeGame() {
            moveSnake();
            checkSnakeCollision();
            drawSnakeGame();
        }

        function resetSnakeGame() {
            snake = [{x: 10, y: 10}];
            food = {x: 15, y: 15};
            dx = 0;
            dy = 0;
            snakeScore = 0;
            snakeGameOver = false;
            updateSnakeScore();
        }