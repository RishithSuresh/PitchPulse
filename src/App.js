import React, { useState } from 'react';
import './App.css';
import GameCanvas from './components/GameCanvas';
import GameControls from './components/GameControls';
import ScoreBoard from './components/ScoreBoard';

function App() {
  const [score] = useState({ team1: 0, team2: 0 });

  return (
    <div className="App" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0e27 0%, #050814 100%)',
      color: '#fff',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{
          textAlign: 'center',
          fontSize: '48px',
          background: 'linear-gradient(135deg, #00d4ff, #ff6b35, #ffd700)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '30px'
        }}>
          ⚽ PITCHPULSE
        </h1>

        <ScoreBoard score={score} />
        <GameCanvas />
        <GameControls />

        <div style={{
          textAlign: 'center',
          marginTop: '30px',
          padding: '20px',
          background: 'rgba(255, 215, 0, 0.1)',
          borderRadius: '15px',
          border: '2px solid rgba(255, 215, 0, 0.3)'
        }}>
          <p style={{ fontSize: '18px', marginBottom: '10px' }}>
            💡 <strong>Note:</strong> This React app is a placeholder.
          </p>
          <p style={{ fontSize: '16px', color: '#00d4ff' }}>
            The full game with all features is available at <strong>public/menu.html</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
