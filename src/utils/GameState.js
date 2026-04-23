// Placeholder GameState class for React app
// The actual game is now in public/game.js

class GameState {
  constructor() {
    this.team1Score = 0;
    this.team2Score = 0;
    this.gameTime = 0;
    this.isRunning = false;
  }

  update() {
    if (this.isRunning) {
      this.gameTime++;
    }
  }

  start() {
    this.isRunning = true;
  }

  pause() {
    this.isRunning = false;
  }

  reset() {
    this.team1Score = 0;
    this.team2Score = 0;
    this.gameTime = 0;
    this.isRunning = false;
  }
}

export default GameState;

