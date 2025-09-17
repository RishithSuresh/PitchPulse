import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import MatchTracker from "./pages/Matchtracker";
import PlayerStats from "./pages/PlayerStats";


function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">⚽ PitchPulse</a>
              <div>
                <Link className="nav-link d-inline text-white" to="/">Home</Link>
                <Link className="nav-link d-inline text-white" to="/tracker">Match Tracker</Link>
                <Link className="nav-link d-inline text-white" to="/stats">Player Stats</Link>
              </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tracker" element={<MatchTracker />} />
          <Route path="/stats" element={<PlayerStats />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
