const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");
const scoreBoard = document.getElementById("scoreBoard");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const instructions = document.getElementById("instructions");

const box = 20;
const canvasSize = 400;
let snake, direction, food, score, game;

function startGame() {
  startBtn.style.display = "none";      // Esconde botão de iniciar
  canvas.style.display = "block";       // Mostra o canvas
  scoreBoard.style.display = "block";   // Mostra placar
  instructions.style.display = "block"; // Mostra instruções

  initGame(); // Começa o jogo
}

function restartGame() {
  restartBtn.style.display = "none";
  initGame();
}

function initGame() {
  snake = [{ x: 160, y: 160 }];
  direction = "right";
  score = 0;
  updateScore();

  food = {
    x: Math.floor(Math.random() * (canvasSize / box)) * box,
    y: Math.floor(Math.random() * (canvasSize / box)) * box,
  };

  clearInterval(game);
  game = setInterval(drawGame, 140);
}

document.addEventListener("keydown", updateDirection);

function updateDirection(event) {
  const key = event.key;
  if (key === "ArrowUp" && direction !== "down") direction = "up";
  if (key === "ArrowDown" && direction !== "up") direction = "down";
  if (key === "ArrowLeft" && direction !== "right") direction = "left";
  if (key === "ArrowRight" && direction !== "left") direction = "right";
}

function drawGame() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);

  snake.forEach((segment, i) => {
    ctx.fillStyle = i === 0 ? "lime" : "green";
    ctx.fillRect(segment.x, segment.y, box, box);
  });

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  let head = { ...snake[0] };
  if (direction === "up") head.y -= box;
  if (direction === "down") head.y += box;
  if (direction === "left") head.x -= box;
  if (direction === "right") head.x += box;

  if (
    head.x < 0 || head.y < 0 ||
    head.x >= canvasSize || head.y >= canvasSize ||
    snake.some((seg, i) => i !== 0 && seg.x === head.x && seg.y === head.y)
  ) {
    clearInterval(game);
    restartBtn.style.display = "inline-block";
    alert("Game Over! Pontuação: " + score);
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    updateScore();
    food = {
      x: Math.floor(Math.random() * (canvasSize / box)) * box,
      y: Math.floor(Math.random() * (canvasSize / box)) * box,
    };
  } else {
    snake.pop();
  }
}

function updateScore() {
  scoreDisplay.textContent = score;
}