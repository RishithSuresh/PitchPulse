
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


// Utility to get/set teams from localStorage
function getTeamsFromStorage() {
  try {
    const data = localStorage.getItem('teams');
    if (!data) return [];
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveTeamsToStorage(teams) {
  localStorage.setItem('teams', JSON.stringify(teams));
}


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function PlayerStats() {
  const query = useQuery();
  const navigate = useNavigate();
  const [teams, setTeams] = useState(() => {
    const stored = getTeamsFromStorage();
    if (stored.length === 0) {
      return [
        { name: "Red Lions", players: [
          { name: "Amit", stats: { goals: 2, assists: 1, yellow: 0, red: 0 } },
          { name: "Ravi", stats: { goals: 1, assists: 2, yellow: 1, red: 0 } }
        ]},
        { name: "Blue Hawks", players: [
          { name: "Sam", stats: { goals: 3, assists: 0, yellow: 0, red: 0 } },
          { name: "John", stats: { goals: 0, assists: 1, yellow: 0, red: 1 } }
        ]}
      ];
    }
    return stored.map(team => ({
      ...team,
      players: team.players.map(p => ({
        ...p,
        stats: p.stats || { goals: 0, assists: 0, yellow: 0, red: 0 }
      }))
    }));
  });
  // Read team/player from query params if present
  const initialTeam = Number(query.get('team')) || 0;
  const initialPlayer = Number(query.get('player')) || 0;
  const [selectedTeam, setSelectedTeam] = useState(initialTeam);
  const [selectedPlayer, setSelectedPlayer] = useState(initialPlayer);

  React.useEffect(() => {
    saveTeamsToStorage(teams);
  }, [teams]);

  // If query params change, update selection
  React.useEffect(() => {
    setSelectedTeam(Number(query.get('team')) || 0);
    setSelectedPlayer(Number(query.get('player')) || 0);
    // eslint-disable-next-line
  }, [useLocation().search]);

  const handleStatChange = (stat, value) => {
    setTeams(teams => teams.map((team, tIdx) =>
      tIdx === selectedTeam
        ? {
            ...team,
            players: team.players.map((p, pIdx) =>
              pIdx === selectedPlayer
                ? { ...p, stats: { ...p.stats, [stat]: value } }
                : p
            )
          }
        : team
    ));
  };

  const team = teams[selectedTeam] || { players: [] };
  const player = team.players[selectedPlayer] || { name: '', stats: { goals: 0, assists: 0, yellow: 0, red: 0 } };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg border-info mb-4">
            <div className="card-header bg-info text-white d-flex align-items-center gap-2">
              <i className="bi bi-bar-chart-fill" style={{fontSize: '2rem'}}></i>
              <h2 className="mb-0">Player Stats</h2>
            </div>
            <div className="card-body">
              <button className="btn btn-outline-secondary mb-3" onClick={() => navigate('/teams')}>
                <i className="bi bi-arrow-left me-1"></i>Back to Teams
              </button>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-bold">Select Team</label>
                  <select className="form-select" value={selectedTeam} onChange={e => { setSelectedTeam(Number(e.target.value)); setSelectedPlayer(0); }}>
                    {teams.map((t, i) => <option value={i} key={i}>{t.name}</option>)}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Select Player</label>
                  <select className="form-select" value={selectedPlayer} onChange={e => setSelectedPlayer(Number(e.target.value))}>
                    {team.players.map((p, i) => <option value={i} key={i}>{p.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="card border-0 bg-light shadow-sm">
                <div className="card-header bg-dark text-warning d-flex align-items-center gap-2">
                  <i className="bi bi-person-fill" style={{fontSize: '1.5rem'}}></i>
                  <h4 className="mb-0">{player.name}</h4>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-3">
                      <label className="form-label">Goals</label>
                      <input type="number" min="0" className="form-control border-success" value={player.stats.goals} onChange={e => handleStatChange('goals', Number(e.target.value))} />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Assists</label>
                      <input type="number" min="0" className="form-control border-primary" value={player.stats.assists} onChange={e => handleStatChange('assists', Number(e.target.value))} />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Yellow Cards</label>
                      <input type="number" min="0" className="form-control border-warning" value={player.stats.yellow} onChange={e => handleStatChange('yellow', Number(e.target.value))} />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Red Cards</label>
                      <input type="number" min="0" className="form-control border-danger" value={player.stats.red} onChange={e => handleStatChange('red', Number(e.target.value))} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerStats;
