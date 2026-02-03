// Football Game - Physics-based game with country flag players
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game state
const game = {
  score1: 0,
  score2: 0,
  keys: {},
  mouse: { x: 0, y: 0 },
  particles: [],
  powerUps: [],
  gameTime: 0,
  matchDuration: 120, // 2 minutes
  isPaused: false,
  lastGoalScorer: null,
  celebrationTime: 0
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
  baseSpeed: 4,
  flag: '🇩🇪',
  color: '#000',
  powerUp: null,
  powerUpTimer: 0,
  chargeShot: 0,
  maxCharge: 60,
  dashCooldown: 0,
  maxDashCooldown: 120,
  vx: 0,
  vy: 0
};

const player2 = {
  x: canvas.width - 200,
  y: canvas.height / 2,
  radius: 30,
  speed: 4,
  baseSpeed: 4,
  flag: '🇧🇷',
  color: '#009c3b',
  powerUp: null,
  powerUpTimer: 0,
  chargeShot: 0,
  maxCharge: 60,
  dashCooldown: 0,
  maxDashCooldown: 120,
  vx: 0,
  vy: 0
};

// Goal posts
const goals = {
  left: { x: 0, y: canvas.height / 2 - 80, width: 20, height: 160 },
  right: { x: canvas.width - 20, y: canvas.height / 2 - 80, width: 20, height: 160 }
};

// Particle class for visual effects
class Particle {
  constructor(x, y, color, size, vx, vy, life) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
    this.vx = vx;
    this.vy = vy;
    this.life = life;
    this.maxLife = life;
    this.gravity = 0.2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.life--;
    this.vx *= 0.98;
  }

  draw() {
    const alpha = this.life / this.maxLife;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  isDead() {
    return this.life <= 0;
  }
}

// Power-up class
class PowerUp {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type; // 'speed', 'power', 'shield'
    this.radius = 20;
    this.rotation = 0;
    this.bobOffset = 0;
    this.collected = false;
  }

  update() {
    this.rotation += 0.05;
    this.bobOffset = Math.sin(Date.now() / 200) * 5;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y + this.bobOffset);
    ctx.rotate(this.rotation);

    // Glow effect
    ctx.shadowBlur = 20;
    ctx.shadowColor = this.getColor();

    // Power-up circle
    ctx.fillStyle = this.getColor();
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.fill();

    // Icon
    ctx.shadowBlur = 0;
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#fff';
    ctx.fillText(this.getIcon(), 0, 0);

    ctx.restore();
  }

  getColor() {
    switch(this.type) {
      case 'speed': return '#00d4ff';
      case 'power': return '#ff6b35';
      case 'shield': return '#ffd700';
      default: return '#fff';
    }
  }

  getIcon() {
    switch(this.type) {
      case 'speed': return '⚡';
      case 'power': return '💥';
      case 'shield': return '🛡️';
      default: return '⭐';
    }
  }

  checkCollision(player) {
    const dx = this.x - player.x;
    const dy = this.y - player.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < this.radius + player.radius;
  }
}

// Create particles
function createParticles(x, y, count, color) {
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count;
    const speed = 2 + Math.random() * 3;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;
    const size = 3 + Math.random() * 4;
    const life = 30 + Math.random() * 30;
    game.particles.push(new Particle(x, y, color, size, vx, vy, life));
  }
}

// Spawn power-up
function spawnPowerUp() {
  const types = ['speed', 'power', 'shield'];
  const type = types[Math.floor(Math.random() * types.length)];
  const x = 200 + Math.random() * (canvas.width - 400);
  const y = 100 + Math.random() * (canvas.height - 200);
  game.powerUps.push(new PowerUp(x, y, type));
}

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
  // Power-up glow effect
  if (player.powerUp) {
    ctx.shadowBlur = 30;
    ctx.shadowColor = player.powerUp === 'speed' ? '#00d4ff' :
                      player.powerUp === 'power' ? '#ff6b35' : '#ffd700';
  }

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

  ctx.shadowBlur = 0;

  // Flag emoji
  ctx.font = `${player.radius * 1.2}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(player.flag, player.x, player.y);

  // Charge shot indicator
  if (player.chargeShot > 0) {
    const chargePercent = player.chargeShot / player.maxCharge;
    ctx.strokeStyle = '#ff6b35';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius + 8, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * chargePercent));
    ctx.stroke();
  }

  // Dash cooldown indicator
  if (player.dashCooldown > 0) {
    const cooldownPercent = 1 - (player.dashCooldown / player.maxDashCooldown);
    ctx.fillStyle = 'rgba(0, 212, 255, 0.3)';
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius + 5, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * cooldownPercent));
    ctx.lineTo(player.x, player.y);
    ctx.fill();
  }

  // Power-up icon above player
  if (player.powerUp) {
    ctx.font = '20px Arial';
    ctx.fillText(
      player.powerUp === 'speed' ? '⚡' :
      player.powerUp === 'power' ? '💥' : '🛡️',
      player.x, player.y - player.radius - 15
    );
  }
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
    game.lastGoalScorer = 2;
    game.celebrationTime = 120;
    createParticles(ball.x, ball.y, 30, '#ffd700');
    createParticles(ball.x, ball.y, 20, '#ff6b35');
    resetBall();
  }
  if (ball.x + ball.radius > canvas.width && ball.y > goals.right.y && ball.y < goals.right.y + goals.right.height) {
    // Goal for player 1
    game.score1++;
    document.getElementById('score1').textContent = game.score1;
    game.lastGoalScorer = 1;
    game.celebrationTime = 120;
    createParticles(ball.x, ball.y, 30, '#ffd700');
    createParticles(ball.x, ball.y, 20, '#ff6b35');
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

    // Push ball away from player
    const overlap = ball.radius + player.radius - distance;
    ball.x += Math.cos(angle) * overlap;
    ball.y += Math.sin(angle) * overlap;

    // Calculate kick power based on player movement speed
    const playerSpeed = Math.sqrt(player.vx * player.vx + player.vy * player.vy);

    // Base kick power
    let kickPower = 3.5;

    // Power-up bonuses
    if (player.powerUp === 'power') {
      kickPower *= 2;
      createParticles(ball.x, ball.y, 15, '#ff6b35');
    }

    // Charged shot bonus
    if (player.chargeShot >= player.maxCharge) {
      kickPower *= 1.8;
      createParticles(ball.x, ball.y, 20, '#ffd700');
      player.chargeShot = 0;
    }

    // If player is moving, kick with power based on movement
    if (playerSpeed > 0.5) {
      // Kick in the direction the player is moving
      ball.vx = player.vx * kickPower;
      ball.vy = player.vy * kickPower;
      createParticles(ball.x, ball.y, 8, '#fff');
    } else {
      // If player is stationary, just push ball away gently
      const pushPower = 3;
      ball.vx = Math.cos(angle) * pushPower;
      ball.vy = Math.sin(angle) * pushPower;
    }
  }
}

// Update player movement
function updatePlayer(player, up, down, left, right, charge, dash) {
  player.vx = 0;
  player.vy = 0;

  // Update power-up timer
  if (player.powerUpTimer > 0) {
    player.powerUpTimer--;
    if (player.powerUpTimer === 0) {
      player.powerUp = null;
      player.speed = player.baseSpeed;
    }
  }

  // Update cooldowns
  if (player.dashCooldown > 0) player.dashCooldown--;

  // Apply speed power-up
  if (player.powerUp === 'speed') {
    player.speed = player.baseSpeed * 1.8;
  } else if (!player.powerUp) {
    player.speed = player.baseSpeed;
  }

  // Normal movement
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

  // Charge shot (hold key)
  if (game.keys[charge] && player.chargeShot < player.maxCharge) {
    player.chargeShot++;
  } else if (!game.keys[charge] && player.chargeShot > 0 && player.chargeShot < player.maxCharge) {
    player.chargeShot = 0; // Reset if released early
  }

  // Dash ability (press key)
  if (game.keys[dash] && player.dashCooldown === 0 && (player.vx !== 0 || player.vy !== 0)) {
    const dashPower = 15;
    player.x += player.vx * dashPower / player.speed;
    player.y += player.vy * dashPower / player.speed;
    player.dashCooldown = player.maxDashCooldown;
    createParticles(player.x, player.y, 12, '#00d4ff');
    game.keys[dash] = false; // Prevent holding
  }

  // Keep player in bounds
  player.x = Math.max(player.radius, Math.min(canvas.width - player.radius, player.x));
  player.y = Math.max(player.radius, Math.min(canvas.height - player.radius, player.y));
}

// Main game loop
function gameLoop() {
  if (!game.isPaused) {
    game.gameTime++;

    // Spawn power-ups randomly
    if (game.gameTime % 300 === 0 && game.powerUps.length < 2) {
      spawnPowerUp();
    }
  }

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw everything
  drawPitch();
  drawGoals();

  // Draw and update power-ups
  game.powerUps.forEach((powerUp, index) => {
    powerUp.update();
    powerUp.draw();

    // Check collection by players
    if (powerUp.checkCollision(player1)) {
      player1.powerUp = powerUp.type;
      player1.powerUpTimer = 300; // 5 seconds
      createParticles(powerUp.x, powerUp.y, 20, powerUp.getColor());
      game.powerUps.splice(index, 1);
    } else if (powerUp.checkCollision(player2)) {
      player2.powerUp = powerUp.type;
      player2.powerUpTimer = 300;
      createParticles(powerUp.x, powerUp.y, 20, powerUp.getColor());
      game.powerUps.splice(index, 1);
    }
  });

  // Draw and update particles
  game.particles = game.particles.filter(particle => {
    particle.update();
    particle.draw();
    return !particle.isDead();
  });

  drawBall();
  drawPlayer(player1);
  drawPlayer(player2);

  // Draw celebration
  if (game.celebrationTime > 0) {
    game.celebrationTime--;
    ctx.font = 'bold 60px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffd700';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    const text = game.lastGoalScorer === 1 ? '🇩🇪 GOAL! 🎉' : '🇧🇷 GOAL! 🎉';
    ctx.strokeText(text, canvas.width / 2, 100);
    ctx.fillText(text, canvas.width / 2, 100);
  }

  // Draw timer
  const timeLeft = Math.max(0, game.matchDuration - Math.floor(game.gameTime / 60));
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fff';
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 3;
  ctx.strokeText(`${minutes}:${seconds.toString().padStart(2, '0')}`, canvas.width / 2, 30);
  ctx.fillText(`${minutes}:${seconds.toString().padStart(2, '0')}`, canvas.width / 2, 30);

  // Check game over
  if (timeLeft === 0 && !game.isPaused) {
    game.isPaused = true;
    setTimeout(() => {
      const winner = game.score1 > game.score2 ? '🇩🇪 Germany' :
                     game.score2 > game.score1 ? '🇧🇷 Brazil' : 'Draw';
      alert(`Game Over!\n${winner} wins!\nFinal Score: ${game.score1} - ${game.score2}`);
    }, 100);
  }

  if (!game.isPaused) {
    // Update physics
    updateBall();
    updatePlayer(player1, 'w', 's', 'a', 'd', 'q', 'e');
    updatePlayer(player2, 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Shift', 'Enter');

    // Check collisions
    checkBallPlayerCollision(player1);
    checkBallPlayerCollision(player2);
  }

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

// Removed click-to-shoot - players now kick the ball by moving into it!

// Start the game
gameLoop();

