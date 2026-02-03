// Football Game - Physics-based game with country flag players
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game state
const game = {
  score1: 0,
  score2: 0,
  keys: {},
  mouse: { x: 0, y: 0 }
};

// Ball object
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 15,
  vx: 0,
  vy: 0,
  friction: 0.98,
  bounce: 0.7,
  trail: []
};

// Player objects (country flags)
const player1 = {
  x: 200,
  y: canvas.height / 2,
  radius: 30,
  speed: 4,
  flag: '🇩🇪',
  color: '#000'
};

const player2 = {
  x: canvas.width - 200,
  y: canvas.height / 2,
  radius: 30,
  speed: 4,
  flag: '🇧🇷',
  color: '#009c3b'
};

// Goal posts
const goals = {
  left: { x: 0, y: canvas.height / 2 - 80, width: 20, height: 160 },
  right: { x: canvas.width - 20, y: canvas.height / 2 - 80, width: 20, height: 160 }
};

// Draw football pitch
function drawPitch() {
  // Grass background
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#2d8b3d');
  gradient.addColorStop(0.5, '#3da84f');
  gradient.addColorStop(1, '#2d8b3d');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Grass stripes
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  for (let i = 0; i < canvas.width; i += 80) {
    ctx.fillRect(i, 0, 40, canvas.height);
  }

  // Center line
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();

  // Center circle
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 80, 0, Math.PI * 2);
  ctx.stroke();

  // Center dot
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 5, 0, Math.PI * 2);
  ctx.fill();

  // Penalty areas
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.strokeRect(0, canvas.height / 2 - 120, 150, 240);
  ctx.strokeRect(canvas.width - 150, canvas.height / 2 - 120, 150, 240);

  // Goal areas
  ctx.strokeRect(0, canvas.height / 2 - 60, 60, 120);
  ctx.strokeRect(canvas.width - 60, canvas.height / 2 - 60, 60, 120);
}

// Draw goals
function drawGoals() {
  // Left goal
  ctx.fillStyle = '#c41e3a';
  ctx.fillRect(goals.left.x, goals.left.y, goals.left.width, 5);
  ctx.fillRect(goals.left.x, goals.left.y + goals.left.height - 5, goals.left.width, 5);

  // Goal net pattern
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 1;
  for (let i = 0; i < goals.left.height; i += 10) {
    ctx.beginPath();
    ctx.moveTo(goals.left.x, goals.left.y + i);
    ctx.lineTo(goals.left.x + goals.left.width, goals.left.y + i);
    ctx.stroke();
  }

  // Right goal
  ctx.fillStyle = '#c41e3a';
  ctx.fillRect(goals.right.x, goals.right.y, goals.right.width, 5);
  ctx.fillRect(goals.right.x, goals.right.y + goals.right.height - 5, goals.right.width, 5);

  // Goal net pattern
  for (let i = 0; i < goals.right.height; i += 10) {
    ctx.beginPath();
    ctx.moveTo(goals.right.x, goals.right.y + i);
    ctx.lineTo(goals.right.x + goals.right.width, goals.right.y + i);
    ctx.stroke();
  }
}

// Draw player (country flag badge)
function drawPlayer(player) {
  // Shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.beginPath();
  ctx.ellipse(player.x, player.y + player.radius + 5, player.radius * 0.8, player.radius * 0.3, 0, 0, Math.PI * 2);
  ctx.fill();

  // Player circle
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
  ctx.fill();

  // Border
  ctx.strokeStyle = player.color;
  ctx.lineWidth = 4;
  ctx.stroke();

  // Flag emoji
  ctx.font = `${player.radius * 1.2}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(player.flag, player.x, player.y);
}

// Draw ball with trail
function drawBall() {
  // Draw trail
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i < ball.trail.length; i++) {
    const point = ball.trail[i];
    if (i === 0) {
      ctx.moveTo(point.x, point.y);
    } else {
      ctx.lineTo(point.x, point.y);
    }
  }
  ctx.stroke();

  // Shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.beginPath();
  ctx.ellipse(ball.x, ball.y + ball.radius + 3, ball.radius * 0.8, ball.radius * 0.3, 0, 0, Math.PI * 2);
  ctx.fill();

  // Ball
  const ballGradient = ctx.createRadialGradient(ball.x - 5, ball.y - 5, 0, ball.x, ball.y, ball.radius);
  ballGradient.addColorStop(0, '#fff');
  ballGradient.addColorStop(1, '#ddd');
  ctx.fillStyle = ballGradient;
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fill();

  // Ball pattern (pentagon shapes)
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.arc(ball.x, ball.y - 5, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(ball.x - 6, ball.y + 3, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(ball.x + 6, ball.y + 3, 3, 0, Math.PI * 2);
  ctx.fill();
}

// Update ball physics
function updateBall() {
  // Apply friction
  ball.vx *= ball.friction;
  ball.vy *= ball.friction;

  // Update position
  ball.x += ball.vx;
  ball.y += ball.vy;

  // Wall collisions (top and bottom)
  if (ball.y - ball.radius < 0) {
    ball.y = ball.radius;
    ball.vy *= -ball.bounce;
  }
  if (ball.y + ball.radius > canvas.height) {
    ball.y = canvas.height - ball.radius;
    ball.vy *= -ball.bounce;
  }

  // Side wall collisions (not in goal)
  if (ball.x - ball.radius < 0 && (ball.y < goals.left.y || ball.y > goals.left.y + goals.left.height)) {
    ball.x = ball.radius;
    ball.vx *= -ball.bounce;
  }
  if (ball.x + ball.radius > canvas.width && (ball.y < goals.right.y || ball.y > goals.right.y + goals.right.height)) {
    ball.x = canvas.width - ball.radius;
    ball.vx *= -ball.bounce;
  }

  // Goal detection
  if (ball.x - ball.radius < 0 && ball.y > goals.left.y && ball.y < goals.left.y + goals.left.height) {
    // Goal for player 2
    game.score2++;
    document.getElementById('score2').textContent = game.score2;
    resetBall();
  }
  if (ball.x + ball.radius > canvas.width && ball.y > goals.right.y && ball.y < goals.right.y + goals.right.height) {
    // Goal for player 1
    game.score1++;
    document.getElementById('score1').textContent = game.score1;
    resetBall();
  }

  // Update trail
  ball.trail.push({ x: ball.x, y: ball.y });
  if (ball.trail.length > 15) {
    ball.trail.shift();
  }

  // Clear trail if ball is slow
  if (Math.abs(ball.vx) < 0.5 && Math.abs(ball.vy) < 0.5) {
    ball.trail = [];
  }
}

// Reset ball to center
function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.vx = 0;
  ball.vy = 0;
  ball.trail = [];
}

// Check collision between ball and player
function checkBallPlayerCollision(player) {
  const dx = ball.x - player.x;
  const dy = ball.y - player.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < ball.radius + player.radius) {
    // Calculate collision angle
    const angle = Math.atan2(dy, dx);

    // Push ball away
    const overlap = ball.radius + player.radius - distance;
    ball.x += Math.cos(angle) * overlap;
    ball.y += Math.sin(angle) * overlap;

    // Transfer velocity
    const speed = Math.sqrt(player.vx * player.vx + player.vy * player.vy) || 5;
    ball.vx = Math.cos(angle) * speed * 2;
    ball.vy = Math.sin(angle) * speed * 2;
  }
}

// Update player movement
function updatePlayer(player, up, down, left, right) {
  player.vx = 0;
  player.vy = 0;

  if (game.keys[up]) {
    player.y -= player.speed;
    player.vy = -player.speed;
  }
  if (game.keys[down]) {
    player.y += player.speed;
    player.vy = player.speed;
  }
  if (game.keys[left]) {
    player.x -= player.speed;
    player.vx = -player.speed;
  }
  if (game.keys[right]) {
    player.x += player.speed;
    player.vx = player.speed;
  }

  // Keep player in bounds
  player.x = Math.max(player.radius, Math.min(canvas.width - player.radius, player.x));
  player.y = Math.max(player.radius, Math.min(canvas.height - player.radius, player.y));
}

// Main game loop
function gameLoop() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw everything
  drawPitch();
  drawGoals();
  drawBall();
  drawPlayer(player1);
  drawPlayer(player2);

  // Update physics
  updateBall();
  updatePlayer(player1, 'w', 's', 'a', 'd');
  updatePlayer(player2, 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight');

  // Check collisions
  checkBallPlayerCollision(player1);
  checkBallPlayerCollision(player2);

  // Continue loop
  requestAnimationFrame(gameLoop);
}

// Event listeners
document.addEventListener('keydown', (e) => {
  game.keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
  game.keys[e.key] = false;
});

canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  game.mouse.x = e.clientX - rect.left;
  game.mouse.y = e.clientY - rect.top;
});

canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const clickY = e.clientY - rect.top;

  // Shoot ball towards click position
  const dx = clickX - ball.x;
  const dy = clickY - ball.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > 0) {
    const power = 15;
    ball.vx = (dx / distance) * power;
    ball.vy = (dy / distance) * power;
  }
});

// Start the game
gameLoop();

