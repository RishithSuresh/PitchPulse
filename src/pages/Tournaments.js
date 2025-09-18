import React, { useState, useEffect } from 'react';

function Tournaments() {
  const [tournaments, setTournaments] = useState(() => {
    try {
      const data = localStorage.getItem('tournaments');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });

  const [teams] = useState(() => {
    try {
      const data = localStorage.getItem('teams');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });

  const [tournamentName, setTournamentName] = useState('');
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [activeTournament, setActiveTournament] = useState(null);

  useEffect(() => {
    localStorage.setItem('tournaments', JSON.stringify(tournaments));
  }, [tournaments]);

  const createTournament = (e) => {
    e.preventDefault();
    if (!tournamentName || selectedTeams.length < 2) return;

    // Ensure we have a power of 2 teams for proper bracket
    const validTeamCounts = [2, 4, 8, 16];
    const teamCount = validTeamCounts.find(count => count >= selectedTeams.length) || 16;
    const tournamentTeams = [...selectedTeams];
    
    // Add bye teams if needed
    while (tournamentTeams.length < teamCount) {
      tournamentTeams.push({ name: 'BYE', players: [] });
    }

    const newTournament = {
      id: Date.now(),
      name: tournamentName,
      teams: tournamentTeams,
      bracket: generateBracket(tournamentTeams),
      status: 'active',
      createdAt: new Date().toISOString()
    };

    setTournaments([...tournaments, newTournament]);
    setTournamentName('');
    setSelectedTeams([]);
    setShowCreateForm(false);
  };

  const generateBracket = (teams) => {
    const rounds = Math.ceil(Math.log2(teams.length));
    const bracket = [];

    // First round
    const firstRound = [];
    for (let i = 0; i < teams.length; i += 2) {
      firstRound.push({
        id: `match-${i/2}`,
        team1: teams[i],
        team2: teams[i + 1],
        winner: null,
        score1: null,
        score2: null,
        round: 1
      });
    }
    bracket.push(firstRound);

    // Generate subsequent rounds
    for (let round = 2; round <= rounds; round++) {
      const roundMatches = [];
      const prevRoundSize = bracket[round - 2].length;
      
      for (let i = 0; i < prevRoundSize / 2; i++) {
        roundMatches.push({
          id: `match-${round}-${i}`,
          team1: null,
          team2: null,
          winner: null,
          score1: null,
          score2: null,
          round: round
        });
      }
      bracket.push(roundMatches);
    }

    return bracket;
  };

  const updateMatch = (tournamentId, roundIndex, matchIndex, score1, score2) => {
    setTournaments(tournaments.map(tournament => {
      if (tournament.id !== tournamentId) return tournament;

      const updatedBracket = [...tournament.bracket];
      const match = updatedBracket[roundIndex][matchIndex];
      
      match.score1 = parseInt(score1) || 0;
      match.score2 = parseInt(score2) || 0;
      
      // Determine winner
      if (match.score1 > match.score2) {
        match.winner = match.team1;
      } else if (match.score2 > match.score1) {
        match.winner = match.team2;
      } else {
        match.winner = null; // Draw - could implement penalty shootout
      }

      // Advance winner to next round
      if (match.winner && roundIndex < updatedBracket.length - 1) {
        const nextRound = updatedBracket[roundIndex + 1];
        const nextMatchIndex = Math.floor(matchIndex / 2);
        
        if (matchIndex % 2 === 0) {
          nextRound[nextMatchIndex].team1 = match.winner;
        } else {
          nextRound[nextMatchIndex].team2 = match.winner;
        }
      }

      return { ...tournament, bracket: updatedBracket };
    }));
  };

  const toggleTeamSelection = (team) => {
    if (selectedTeams.find(t => t.name === team.name)) {
      setSelectedTeams(selectedTeams.filter(t => t.name !== team.name));
    } else {
      setSelectedTeams([...selectedTeams, team]);
    }
  };

  const getRoundName = (roundIndex, totalRounds) => {
    const roundsFromEnd = totalRounds - roundIndex;
    switch (roundsFromEnd) {
      case 1: return 'Final';
      case 2: return 'Semi-Final';
      case 3: return 'Quarter-Final';
      default: return `Round ${roundIndex + 1}`;
    }
  };

  return (
    <div className="tournaments-container">
      <div className="container py-4">
        {/* Header */}
        <div className="tournaments-header text-center mb-5">
          <h1 className="page-title">🏆 Tournaments</h1>
          <p className="page-subtitle">
            Create and manage knockout tournaments with your custom teams
          </p>
          <button 
            className="btn btn-primary btn-lg"
            onClick={() => setShowCreateForm(true)}
          >
            <span>⚡</span> Create New Tournament
          </button>
        </div>

        {/* Create Tournament Modal */}
        {showCreateForm && (
          <div className="tournament-modal">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Create New Tournament</h3>
                <button 
                  className="btn-close"
                  onClick={() => setShowCreateForm(false)}
                >
                  ×
                </button>
              </div>
              <form onSubmit={createTournament}>
                <div className="modal-body">
                  <div className="form-group mb-4">
                    <label>Tournament Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={tournamentName}
                      onChange={(e) => setTournamentName(e.target.value)}
                      placeholder="Enter tournament name"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Select Teams (minimum 2)</label>
                    <div className="teams-grid">
                      {teams.map((team, index) => (
                        <div
                          key={index}
                          className={`team-selector ${selectedTeams.find(t => t.name === team.name) ? 'selected' : ''}`}
                          onClick={() => toggleTeamSelection(team)}
                        >
                          <div className="team-icon">⚽</div>
                          <div className="team-name">{team.name}</div>
                          <div className="team-players">{team.players.length} players</div>
                        </div>
                      ))}
                    </div>
                    {teams.length === 0 && (
                      <p className="text-muted">No teams available. Create teams first!</p>
                    )}
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowCreateForm(false)}>
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={selectedTeams.length < 2}
                  >
                    Create Tournament ({selectedTeams.length} teams)
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tournaments List */}
        <div className="tournaments-grid">
          {tournaments.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🏆</div>
              <h3>No Tournaments Yet</h3>
              <p>Create your first tournament to get started!</p>
            </div>
          ) : (
            tournaments.map((tournament) => (
              <div key={tournament.id} className="tournament-card">
                <div className="tournament-header">
                  <h3>{tournament.name}</h3>
                  <span className={`status-badge ${tournament.status}`}>
                    {tournament.status}
                  </span>
                </div>
                <div className="tournament-info">
                  <div className="info-item">
                    <span className="label">Teams:</span>
                    <span className="value">{tournament.teams.length}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Rounds:</span>
                    <span className="value">{tournament.bracket.length}</span>
                  </div>
                </div>
                <button 
                  className="btn btn-primary w-100"
                  onClick={() => setActiveTournament(tournament)}
                >
                  View Bracket
                </button>
              </div>
            ))
          )}
        </div>

        {/* Tournament Bracket View */}
        {activeTournament && (
          <div className="bracket-modal">
            <div className="bracket-content">
              <div className="bracket-header">
                <h2>{activeTournament.name} - Tournament Bracket</h2>
                <button 
                  className="btn-close"
                  onClick={() => setActiveTournament(null)}
                >
                  ×
                </button>
              </div>
              <div className="bracket-container">
                {activeTournament.bracket.map((round, roundIndex) => (
                  <div key={roundIndex} className="bracket-round">
                    <h4 className="round-title">
                      {getRoundName(roundIndex, activeTournament.bracket.length)}
                    </h4>
                    <div className="matches">
                      {round.map((match, matchIndex) => (
                        <div key={match.id} className="match-card">
                          <div className="match-teams">
                            <div className={`team ${match.winner?.name === match.team1?.name ? 'winner' : ''}`}>
                              <span className="team-name">
                                {match.team1?.name || 'TBD'}
                              </span>
                              <input
                                type="number"
                                className="score-input"
                                value={match.score1 || ''}
                                onChange={(e) => updateMatch(
                                  activeTournament.id, 
                                  roundIndex, 
                                  matchIndex, 
                                  e.target.value, 
                                  match.score2
                                )}
                                disabled={!match.team1 || !match.team2}
                                min="0"
                              />
                            </div>
                            <div className="vs">VS</div>
                            <div className={`team ${match.winner?.name === match.team2?.name ? 'winner' : ''}`}>
                              <span className="team-name">
                                {match.team2?.name || 'TBD'}
                              </span>
                              <input
                                type="number"
                                className="score-input"
                                value={match.score2 || ''}
                                onChange={(e) => updateMatch(
                                  activeTournament.id, 
                                  roundIndex, 
                                  matchIndex, 
                                  match.score1, 
                                  e.target.value
                                )}
                                disabled={!match.team1 || !match.team2}
                                min="0"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tournaments;
