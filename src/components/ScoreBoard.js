import React from 'react';

function ScoreBoard({ score = { team1: 0, team2: 0 } }) {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-around', 
      padding: '20px',
      background: 'linear-gradient(135deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1))',
      borderRadius: '15px',
      margin: '20px'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#00d4ff' }}>
          {score.team1}
        </div>
        <div style={{ fontSize: '18px', marginTop: '10px' }}>
          Player 1
        </div>
      </div>
      <div style={{ fontSize: '36px', alignSelf: 'center', color: '#ffd700' }}>
        VS
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#ff6b35' }}>
          {score.team2}
        </div>
        <div style={{ fontSize: '18px', marginTop: '10px' }}>
          Player 2
        </div>
      </div>
    </div>
  );
}

export default ScoreBoard;

