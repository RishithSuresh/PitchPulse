import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import GameCanvas from './components/GameCanvas';
import GameControls from './components/GameControls';
import ScoreBoard from './components/ScoreBoard';
import GameState from './utils/GameState';

function App() {
  const [gameState, setGameState] = useState(null);
  const [score, setScore] = useState({ team1: 0, team2: 0 });
  const gameStateRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Initialize game
  useEffect(() => {
    const newGameState = new GameState();
    gameStateRef.current = newGameState;
    setGameState(newGameState);
  }, []);

  // Game loop
  useEffect(() => {
    if (!gameStateRef.current) return;

    const updateGame = () => {
      const state = gameStateRef.current;
      state.update();
      setScore({ team1: state.team1Score, team2: state.team2Score });
      animationFrameRef.current = requestAnimationFrame(updateGame);
    };

    animationFrameRef.current = requestAnimationFrame(updateGame);

    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [gameState]);

  const handleKickBall = (direction) => {
    if (gameStateRef.current && gameStateRef.current.selectedPlayer) {
      gameStateRef.current.kickBall(direction);
    }
  };

  const handleSelectPlayer = (teamId, playerId) => {
    if (gameStateRef.current) {
      gameStateRef.current.selectPlayer(teamId, playerId);
    }
  };

  const handleResetGame = () => {
    const newGameState = new GameState();
    gameStateRef.current = newGameState;
    setGameState(newGameState);
    setScore({ team1: 0, team2: 0 });
  };

  if (!gameState) return <div className="loading">Loading Game...</div>;

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>⚽ Football Game</h1>
      </header>

      <ScoreBoard score={score} />

      <GameCanvas 
        canvasRef={canvasRef} 
        gameState={gameStateRef.current}
        onPlayerClick={handleSelectPlayer}
      />

      <GameControls 
        onKick={handleKickBall}
        onReset={handleResetGame}
      />
    </div>
  );
}

export default App;
