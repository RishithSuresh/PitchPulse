
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import MatchTracker from "./pages/Matchtracker";
import PlayerStats from "./pages/PlayerStats";
import Teams from "./pages/Teams";


function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 shadow-lg border-bottom border-warning" style={{background: 'linear-gradient(90deg, #212529 80%, #ffc107 100%)'}}>
          <div className="container-fluid">
            <a className="navbar-brand d-flex align-items-center gap-2" href="/">
              <span style={{fontSize: '2rem'}}>⚽</span>
              <span className="fw-bold" style={{letterSpacing: '2px'}}>PitchPulse</span>
            </a>
            <div>
              <Link className="nav-link d-inline text-white fw-bold mx-2" to="/">Home</Link>
              <Link className="nav-link d-inline text-warning fw-bold mx-2" to="/tracker"><i className="bi bi-trophy-fill me-1"></i>Match Tracker</Link>
              <Link className="nav-link d-inline text-success fw-bold mx-2" to="/teams"><i className="bi bi-people-fill me-1"></i>Teams</Link>
              <Link className="nav-link d-inline text-info fw-bold mx-2" to="/stats"><i className="bi bi-bar-chart-fill me-1"></i>Player Stats</Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tracker" element={<MatchTracker />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/stats" element={<PlayerStats />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
