import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import MatchTracker from "./pages/MatchTracker";
import PlayerStats from "./pages/PlayerStats";


function App() {
  return (
    <Router>
      <div>
        <h1>⚽ PitchPulse</h1>
        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/tracker">Match Tracker</Link> |{" "}
          <Link to="/stats">Player Stats</Link>
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
