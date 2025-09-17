

import React, { useState } from "react";

function MatchTracker() {
  const [matches, setMatches] = useState([]);
  const [form, setForm] = useState({ teamA: "", teamB: "", date: "", scoreA: "", scoreB: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.teamA || !form.teamB || !form.date) return;
    setMatches([
      ...matches,
      { ...form }
    ]);
    setForm({ teamA: "", teamB: "", date: "", scoreA: "", scoreB: "" });
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow-lg mb-4 border-warning position-relative" style={{overflow: 'hidden'}}>
            <div className="position-absolute top-0 end-0 opacity-10" style={{fontSize: '8rem', color: '#ffc107', zIndex: 0, pointerEvents: 'none'}}>
              <i className="bi bi-trophy-fill"></i>
            </div>
            <div className="card-header bg-dark text-warning d-flex align-items-center" style={{zIndex: 1, position: 'relative'}}>
              <i className="bi bi-soccer me-2" style={{fontSize: '2rem'}}></i>
              <h2 className="mb-0">Custom Match Tracker</h2>
            </div>
            <div className="card-body" style={{zIndex: 1, position: 'relative'}}>
              <form onSubmit={handleSubmit} className="row g-3 align-items-end mb-4">
                <div className="col-md-3">
                  <label className="form-label">Team A</label>
                  <input name="teamA" value={form.teamA} onChange={handleChange} placeholder="Team A" className="form-control border-success" />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Team B</label>
                  <input name="teamB" value={form.teamB} onChange={handleChange} placeholder="Team B" className="form-control border-primary" />
                </div>
                <div className="col-md-2">
                  <label className="form-label">Date</label>
                  <input name="date" value={form.date} onChange={handleChange} type="date" className="form-control border-warning" />
                </div>
                <div className="col-md-2">
                  <label className="form-label">Score A</label>
                  <input name="scoreA" value={form.scoreA} onChange={handleChange} placeholder="Score A" className="form-control border-success" type="number" min="0" />
                </div>
                <div className="col-md-2">
                  <label className="form-label">Score B</label>
                  <input name="scoreB" value={form.scoreB} onChange={handleChange} placeholder="Score B" className="form-control border-primary" type="number" min="0" />
                </div>
                <div className="col-12 text-end">
                  <button type="submit" className="btn btn-warning px-4 fw-bold"><i className="bi bi-plus-circle me-2"></i>Add Match</button>
                </div>
              </form>
              <div className="row">
                <div className="col-12">
                  <div className="card border-0 bg-light shadow-sm">
                    <div className="card-header bg-success text-white">
                      <h4 className="mb-0"><i className="bi bi-list-ol me-2"></i>Matches</h4>
                    </div>
                    <ul className="list-group list-group-flush">
                      {matches.length === 0 && <li className="list-group-item text-center text-muted">No matches added yet.</li>}
                      {matches.map((m, i) => (
                        <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                          <span>
                            <i className="bi bi-calendar-event me-2 text-warning"></i>
                            <strong>{m.date}</strong>: <span className="fw-bold text-success">{m.teamA}</span> <span className="badge bg-success mx-1">{m.scoreA || 0}</span> - <span className="badge bg-primary mx-1">{m.scoreB || 0}</span> <span className="fw-bold text-primary">{m.teamB}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
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

export default MatchTracker;
