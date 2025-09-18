import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const stats = [
    { number: '1,000+', label: 'Active Players', icon: '👥' },
    { number: '250+', label: 'Teams Created', icon: '⚽' },
    { number: '500+', label: 'Matches Played', icon: '🏆' },
    { number: '50+', label: 'Tournaments', icon: '🎯' }
  ];

  const features = [
    {
      title: 'Team Management',
      description: 'Create and manage your dream teams with custom formations and player positions.',
      icon: '👥',
      link: '/teams',
      color: 'var(--team-primary)'
    },
    {
      title: 'Tournament System',
      description: 'Organize knockout tournaments with bracket-style competition formats.',
      icon: '🏆',
      link: '/tournaments',
      color: 'var(--team-secondary)'
    },
    {
      title: 'Live Match Tracking',
      description: 'Track live scores, player statistics, and match events in real-time.',
      icon: '📊',
      link: '/tracker',
      color: 'var(--pitch-green)'
    },
    {
      title: 'Player Analytics',
      description: 'Comprehensive player statistics including goals, assists, and performance metrics.',
      icon: '📈',
      link: '/stats',
      color: 'var(--team-accent)'
    }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center min-vh-100">
            <div className="col-lg-6">
              <div className="hero-content fade-in-up">
                <h1 className="hero-title">
                  Welcome to <span className="gradient-text">PitchPulse</span>
                </h1>
                <p className="hero-subtitle">
                  The ultimate football management platform where you create teams,
                  organize tournaments, and track every moment of the beautiful game.
                </p>
                <div className="hero-buttons">
                  <Link to="/teams" className="btn btn-primary btn-lg me-3">
                    <span>⚽</span> Create Your Team
                  </Link>
                  <Link to="/tournaments" className="btn btn-secondary btn-lg">
                    <span>🏆</span> Start Tournament
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-visual slide-in-right">
                <div className="football-field">
                  <div className="field-lines">
                    <div className="center-circle"></div>
                    <div className="penalty-box left"></div>
                    <div className="penalty-box right"></div>
                    <div className="goal left"></div>
                    <div className="goal right"></div>
                  </div>
                  <div className="floating-ball pulse">⚽</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="row">
            {stats.map((stat, index) => (
              <div key={index} className="col-md-3 col-6 mb-4">
                <div className="stat-card text-center fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Powerful Features</h2>
            <p className="section-subtitle">
              Everything you need to manage your football universe
            </p>
          </div>
          <div className="row">
            {features.map((feature, index) => (
              <div key={index} className="col-lg-3 col-md-6 mb-4">
                <Link to={feature.link} className="feature-card-link">
                  <div className="feature-card fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                    <div className="feature-icon" style={{color: feature.color}}>
                      {feature.icon}
                    </div>
                    <h4 className="feature-title">{feature.title}</h4>
                    <p className="feature-description">{feature.description}</p>
                    <div className="feature-arrow">→</div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card text-center">
            <h2 className="cta-title">Ready to Start Your Football Journey?</h2>
            <p className="cta-subtitle">
              Join thousands of football enthusiasts managing their teams and tournaments
            </p>
            <div className="cta-buttons">
              <Link to="/teams" className="btn btn-primary btn-lg me-3">
                Get Started Now
              </Link>
              <Link to="/tournaments" className="btn btn-secondary btn-lg">
                Explore Tournaments
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
