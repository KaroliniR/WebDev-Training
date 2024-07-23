const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const paddleWidth = 15;
const paddleHeight = 100;
const ballSize = 20;

let leftPaddleY = HEIGHT / 2 - paddleHeight / 2;
let rightPaddleY = HEIGHT / 2 - paddleHeight / 2;
let ballX = WIDTH / 2 - ballSize / 2;
let ballY = HEIGHT / 2 - ballSize / 2;
let ballSpeedX = 3;
let ballSpeedY = 3;

let leftScore = 0;
let rightScore = 0;

document.addEventListener('keydown', movePaddles);

function movePaddles(event) {
    const key = event.key;

    if (key === 'w' && leftPaddleY > 0) {
        leftPaddleY -= 20;
    } else if (key === 's' && leftPaddleY < HEIGHT - paddleHeight) {
        leftPaddleY += 20;
    } else if (key === 'ArrowUp' && rightPaddleY > 0) {
        rightPaddleY -= 20;
    } else if (key === 'ArrowDown' && rightPaddleY < HEIGHT - paddleHeight) {
        rightPaddleY += 20;
    }
}

function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = 'white';

    // Left paddle
    ctx.fillRect(50, leftPaddleY, paddleWidth, paddleHeight);

    // Right paddle
    ctx.fillRect(WIDTH - 50 - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);

    // Ball
    ctx.fillRect(ballX, ballY, ballSize, ballSize);

    // Score
    ctx.font = '30px Arial';
    ctx.fillText(leftScore, WIDTH / 4, 50);
    ctx.fillText(rightScore, WIDTH * 3 / 4, 50);
}

function update() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY >= HEIGHT - ballSize) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX <= 50 + paddleWidth && ballY >= leftPaddleY && ballY <= leftPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX >= WIDTH - 50 - paddleWidth - ballSize && ballY >= rightPaddleY && ballY <= rightPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX <= 0) {
        rightScore += 1;
        resetBall();
    }

    if (ballX >= WIDTH - ballSize) {
        leftScore += 1;
        resetBall();
    }

    draw();
}

function resetBall() {
    ballX = WIDTH / 2 - ballSize / 2;
    ballY = HEIGHT / 2 - ballSize / 2;
    ballSpeedX = -ballSpeedX;
}

function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();
