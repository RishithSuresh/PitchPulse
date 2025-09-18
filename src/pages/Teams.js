import React, { useState } from "react";

function Teams() {
  const [teams, setTeams] = useState(() => {
    try {
      const data = localStorage.getItem('teams');
      if (!data) return [];
      return JSON.parse(data);
    } catch {
      return [];
    }
  });
  const [teamName, setTeamName] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [playerPosition, setPlayerPosition] = useState("midfielder");
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "pitch"
  const [selectedTeamForPitch, setSelectedTeamForPitch] = useState(0);

  const positions = [
    { id: "goalkeeper", name: "Goalkeeper", shortName: "GK" },
    { id: "defender", name: "Defender", shortName: "DEF" },
    { id: "midfielder", name: "Midfielder", shortName: "MID" },
    { id: "forward", name: "Forward", shortName: "FWD" }
  ];

  const formations = {
    "4-4-2": {
      goalkeeper: [{ x: 50, y: 90 }],
      defender: [{ x: 20, y: 75 }, { x: 40, y: 75 }, { x: 60, y: 75 }, { x: 80, y: 75 }],
      midfielder: [{ x: 25, y: 50 }, { x: 45, y: 50 }, { x: 55, y: 50 }, { x: 75, y: 50 }],
      forward: [{ x: 35, y: 25 }, { x: 65, y: 25 }]
    },
    "4-3-3": {
      goalkeeper: [{ x: 50, y: 90 }],
      defender: [{ x: 20, y: 75 }, { x: 40, y: 75 }, { x: 60, y: 75 }, { x: 80, y: 75 }],
      midfielder: [{ x: 30, y: 55 }, { x: 50, y: 55 }, { x: 70, y: 55 }],
      forward: [{ x: 25, y: 25 }, { x: 50, y: 25 }, { x: 75, y: 25 }]
    },
    "3-5-2": {
      goalkeeper: [{ x: 50, y: 90 }],
      defender: [{ x: 30, y: 75 }, { x: 50, y: 75 }, { x: 70, y: 75 }],
      midfielder: [{ x: 15, y: 50 }, { x: 35, y: 50 }, { x: 50, y: 50 }, { x: 65, y: 50 }, { x: 85, y: 50 }],
      forward: [{ x: 40, y: 25 }, { x: 60, y: 25 }]
    }
  };

  const [selectedFormation, setSelectedFormation] = useState("4-4-2");

  const addTeam = (e) => {
    e.preventDefault();
    if (!teamName) return;
    const newTeams = [...teams, { name: teamName, players: [] }];
    setTeams(newTeams);
    localStorage.setItem('teams', JSON.stringify(newTeams));
    setTeamName("");
  };

  const addPlayer = (e) => {
    e.preventDefault();
    if (!playerName || selectedTeam === null) return;
    const newTeams = teams.map((team, idx) =>
      idx === selectedTeam
        ? {
            ...team,
            players: [...team.players, {
              name: playerName,
              position: playerPosition,
              stats: { goals: 0, assists: 0, yellow: 0, red: 0 }
            }]
          }
        : team
    );
    setTeams(newTeams);
    localStorage.setItem('teams', JSON.stringify(newTeams));
    setPlayerName("");
    setPlayerPosition("midfielder");
  };

  const getPlayersByPosition = (team, position) => {
    return team.players.filter(player => player.position === position);
  };

  const getPositionColor = (position) => {
    const colors = {
      goalkeeper: "#ff6b35",
      defender: "#004e89",
      midfielder: "#22a04a",
      forward: "#ffd23f"
    };
    return colors[position] || "#6b7280";
  };

  return (
    <div className="teams-container">
      <div className="container py-4">
        {/* Header */}
        <div className="teams-header text-center mb-4">
          <h1 className="page-title">👥 Teams Management</h1>
          <p className="page-subtitle">
            Create and manage your teams with football pitch formations
          </p>

          {/* View Mode Toggle */}
          <div className="view-toggle mb-4">
            <button
              className={`btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-secondary'} me-2`}
              onClick={() => setViewMode('grid')}
            >
              📋 Grid View
            </button>
            <button
              className={`btn ${viewMode === 'pitch' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setViewMode('pitch')}
            >
              ⚽ Pitch View
            </button>
          </div>
        </div>

        {viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid-view">
            {/* Create Team Form */}
            <div className="create-team-card mb-4">
              <div className="card">
                <div className="card-header">
                  <h3>⚡ Create New Team</h3>
                </div>
                <div className="card-body">
                  <form onSubmit={addTeam} className="row g-3 align-items-end">
                    <div className="col-md-8">
                      <input
                        value={teamName}
                        onChange={e => setTeamName(e.target.value)}
                        placeholder="Enter team name"
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <button type="submit" className="btn btn-primary w-100">
                        Create Team
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Teams Grid */}
            <div className="teams-grid">
              {teams.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">⚽</div>
                  <h3>No Teams Yet</h3>
                  <p>Create your first team to get started!</p>
                </div>
              ) : (
                teams.map((team, idx) => (
                  <div className="team-card" key={idx}>
                    <div className="team-header">
                      <h4>🛡️ {team.name}</h4>
                      <div className="team-actions">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => setSelectedTeam(selectedTeam === idx ? null : idx)}
                        >
                          {selectedTeam === idx ? '✕' : '➕'} Player
                        </button>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => {
                            setSelectedTeamForPitch(idx);
                            setViewMode('pitch');
                          }}
                        >
                          ⚽ View Pitch
                        </button>
                      </div>
                    </div>

                    {/* Players by Position */}
                    <div className="players-by-position">
                      {positions.map(position => {
                        const positionPlayers = getPlayersByPosition(team, position.id);
                        return (
                          <div key={position.id} className="position-group">
                            <div className="position-header">
                              <span className="position-name">{position.name}</span>
                              <span className="position-count">({positionPlayers.length})</span>
                            </div>
                            <div className="position-players">
                              {positionPlayers.map((player, playerIdx) => (
                                <div
                                  key={playerIdx}
                                  className="player-chip"
                                  style={{backgroundColor: getPositionColor(position.id)}}
                                >
                                  <span className="player-name">{player.name}</span>
                                  <span className="player-position">{position.shortName}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Add Player Form */}
                    {selectedTeam === idx && (
                      <div className="add-player-form">
                        <form onSubmit={addPlayer}>
                          <div className="form-row">
                            <input
                              value={playerName}
                              onChange={e => setPlayerName(e.target.value)}
                              placeholder="Player name"
                              className="form-control"
                              required
                            />
                            <select
                              value={playerPosition}
                              onChange={e => setPlayerPosition(e.target.value)}
                              className="form-control"
                            >
                              {positions.map(pos => (
                                <option key={pos.id} value={pos.id}>
                                  {pos.name}
                                </option>
                              ))}
                            </select>
                            <button type="submit" className="btn btn-primary">
                              Add
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          /* Pitch View */
          <div className="pitch-view">
            {teams.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">⚽</div>
                <h3>No Teams Available</h3>
                <p>Create teams first to view them on the pitch!</p>
                <button
                  className="btn btn-primary"
                  onClick={() => setViewMode('grid')}
                >
                  Create Teams
                </button>
              </div>
            ) : (
              <>
                {/* Team Selector */}
                <div className="team-selector-bar">
                  <div className="team-selector">
                    <label>Select Team:</label>
                    <select
                      value={selectedTeamForPitch}
                      onChange={e => setSelectedTeamForPitch(parseInt(e.target.value))}
                      className="form-control"
                    >
                      {teams.map((team, idx) => (
                        <option key={idx} value={idx}>
                          {team.name} ({team.players.length} players)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="formation-selector">
                    <label>Formation:</label>
                    <select
                      value={selectedFormation}
                      onChange={e => setSelectedFormation(e.target.value)}
                      className="form-control"
                    >
                      {Object.keys(formations).map(formation => (
                        <option key={formation} value={formation}>
                          {formation}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Football Pitch */}
                <div className="football-pitch-container">
                  <div className="football-pitch">
                    {/* Pitch markings */}
                    <div className="pitch-markings">
                      <div className="center-line"></div>
                      <div className="center-circle"></div>
                      <div className="penalty-area top"></div>
                      <div className="penalty-area bottom"></div>
                      <div className="goal-area top"></div>
                      <div className="goal-area bottom"></div>
                      <div className="corner-arcs"></div>
                    </div>

                    {/* Player positions */}
                    {Object.entries(formations[selectedFormation]).map(([position, coords]) =>
                      coords.map((coord, idx) => {
                        const positionPlayers = getPlayersByPosition(teams[selectedTeamForPitch], position);
                        const player = positionPlayers[idx];

                        return (
                          <div
                            key={`${position}-${idx}`}
                            className={`player-position ${position} ${!player ? 'empty' : ''}`}
                            style={{
                              left: `${coord.x}%`,
                              top: `${coord.y}%`,
                              backgroundColor: player ? getPositionColor(position) : 'rgba(255,255,255,0.3)'
                            }}
                          >
                            {player ? (
                              <>
                                <div className="player-name">{player.name}</div>
                                <div className="player-position-label">
                                  {positions.find(p => p.id === position)?.shortName}
                                </div>
                              </>
                            ) : (
                              <div className="empty-position">
                                {positions.find(p => p.id === position)?.shortName}
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Team Stats */}
                <div className="team-stats">
                  <div className="stats-grid">
                    <div className="stat-item">
                      <span className="stat-label">Total Players</span>
                      <span className="stat-value">{teams[selectedTeamForPitch].players.length}</span>
                    </div>
                    {positions.map(position => (
                      <div key={position.id} className="stat-item">
                        <span className="stat-label">{position.name}s</span>
                        <span className="stat-value">
                          {getPlayersByPosition(teams[selectedTeamForPitch], position.id).length}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Teams;
