import React, { useState } from "react";

function Teams() {
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(null);

  const addTeam = (e) => {
    e.preventDefault();
    if (!teamName) return;
    setTeams([...teams, { name: teamName, players: [] }]);
    setTeamName("");
  };

  const addPlayer = (e) => {
    e.preventDefault();
    if (!playerName || selectedTeam === null) return;
    setTeams(
      teams.map((team, idx) =>
        idx === selectedTeam
          ? { ...team, players: [...team.players, playerName] }
          : team
      )
    );
    setPlayerName("");
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow mb-4 border-success">
            <div className="card-header bg-success text-white d-flex align-items-center">
              <i className="bi bi-people-fill me-2" style={{fontSize: '1.5rem'}}></i>
              <h2 className="mb-0">Teams</h2>
            </div>
            <div className="card-body">
              <form onSubmit={addTeam} className="row g-3 align-items-end mb-3">
                <div className="col-md-8">
                  <input value={teamName} onChange={e => setTeamName(e.target.value)} placeholder="Team Name" className="form-control" />
                </div>
                <div className="col-md-4">
                  <button type="submit" className="btn btn-success w-100">Add Team</button>
                </div>
              </form>
              <div className="row">
                {teams.length === 0 && <div className="text-center text-muted">No teams yet.</div>}
                {teams.map((team, idx) => (
                  <div className="col-md-6 mb-3" key={idx}>
                    <div className="card border-primary h-100">
                      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                        <span><i className="bi bi-shield-fill me-2"></i>{team.name}</span>
                        <button className="btn btn-sm btn-light" onClick={() => setSelectedTeam(idx)}>
                          <i className="bi bi-person-plus-fill text-success"></i> Add Player
                        </button>
                      </div>
                      <ul className="list-group list-group-flush">
                        {team.players.length === 0 && <li className="list-group-item text-muted">No players yet.</li>}
                        {team.players.map((p, i) => (
                          <li className="list-group-item" key={i}><i className="bi bi-person-fill me-2 text-primary"></i>{p}</li>
                        ))}
                      </ul>
                      {selectedTeam === idx && (
                        <form onSubmit={addPlayer} className="p-3 bg-light border-top">
                          <div className="input-group">
                            <input value={playerName} onChange={e => setPlayerName(e.target.value)} placeholder="Player Name" className="form-control" />
                            <button type="submit" className="btn btn-primary">Add</button>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Teams;
