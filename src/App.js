
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import MatchTracker from "./pages/Matchtracker";
import PlayerStats from "./pages/PlayerStats";
import Teams from "./pages/Teams";
import Tournaments from "./pages/Tournaments";


function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark shadow-lg">
          <div className="container-fluid">
            <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
              <span style={{fontSize: '2rem'}}>⚽</span>
              <span className="fw-bold" style={{letterSpacing: '2px'}}>PitchPulse</span>
            </Link>
            <div className="navbar-nav d-flex flex-row gap-3">
              <Link className="nav-link fw-bold" to="/">
                <span>🏠</span> Home
              </Link>
              <Link className="nav-link fw-bold" to="/teams">
                <span>👥</span> Teams
              </Link>
              <Link className="nav-link fw-bold" to="/tournaments">
                <span>🏆</span> Tournaments
              </Link>
              <Link className="nav-link fw-bold" to="/tracker">
                <span>📊</span> Matches
              </Link>
              <Link className="nav-link fw-bold" to="/stats">
                <span>📈</span> Stats
              </Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/tracker" element={<MatchTracker />} />
          <Route path="/stats" element={<PlayerStats />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
