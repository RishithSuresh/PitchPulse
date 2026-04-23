import React from 'react';

function GameCanvas() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>🎮 PitchPulse Football Game</h2>
      <p>The game has been moved to a standalone HTML version.</p>
      <p>Please open <strong>public/menu.html</strong> to play!</p>
      <a 
        href="/menu.html" 
        style={{
          display: 'inline-block',
          padding: '15px 30px',
          background: 'linear-gradient(135deg, #00d4ff, #0099cc)',
          color: '#000',
          textDecoration: 'none',
          borderRadius: '50px',
          fontWeight: 'bold',
          marginTop: '20px'
        }}
      >
        🚀 LAUNCH GAME
      </a>
    </div>
  );
}

export default GameCanvas;

