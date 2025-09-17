
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
    <div>
      <h2>Custom Match Tracker</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <input name="teamA" value={form.teamA} onChange={handleChange} placeholder="Team A" className="form-control mb-2" />
          <input name="teamB" value={form.teamB} onChange={handleChange} placeholder="Team B" className="form-control mb-2" />
          <input name="date" value={form.date} onChange={handleChange} type="date" className="form-control mb-2" />
          <input name="scoreA" value={form.scoreA} onChange={handleChange} placeholder="Score A" className="form-control mb-2" type="number" min="0" />
          <input name="scoreB" value={form.scoreB} onChange={handleChange} placeholder="Score B" className="form-control mb-2" type="number" min="0" />
        </div>
        <button type="submit" className="btn btn-primary">Add Match</button>
      </form>
      <h4>Matches</h4>
      <ul className="list-group">
        {matches.length === 0 && <li className="list-group-item">No matches added yet.</li>}
        {matches.map((m, i) => (
          <li key={i} className="list-group-item">
            {m.date}: {m.teamA} {m.scoreA || 0} - {m.scoreB || 0} {m.teamB}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MatchTracker;
