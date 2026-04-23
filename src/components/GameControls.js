import React from 'react';

function GameControls() {
  return (
    <div style={{ padding: '20px', background: 'rgba(0,0,0,0.1)', borderRadius: '10px', margin: '20px' }}>
      <h3>🎮 Game Controls</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
        <div>
          <h4>Player 1 (Left)</h4>
          <p>WASD - Move</p>
          <p>Q - Charge Shot</p>
          <p>E - Dash</p>
        </div>
        <div>
          <h4>Player 2 (Right)</h4>
          <p>Arrow Keys - Move</p>
          <p>Shift - Charge Shot</p>
          <p>Enter - Dash</p>
        </div>
      </div>
    </div>
  );
}

export default GameControls;

