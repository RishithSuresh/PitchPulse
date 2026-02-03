// Menu System for PitchPulse

let gameMode = 'quick';
let selectedTeam1 = null;
let selectedTeam2 = null;
let gameSettings = {
  difficulty: 'medium',
  matchDuration: 120,
  soundEffects: true
};

// Load settings from localStorage
function loadSettings() {
  const saved = localStorage.getItem('pitchpulse_settings');
  if (saved) {
    gameSettings = JSON.parse(saved);
    document.getElementById('difficulty').value = gameSettings.difficulty;
    document.getElementById('matchDuration').value = gameSettings.matchDuration;
    document.getElementById('soundEffects').checked = gameSettings.soundEffects;
  }
}

// Save settings to localStorage
function saveSettings() {
  gameSettings.difficulty = document.getElementById('difficulty').value;
  gameSettings.matchDuration = parseInt(document.getElementById('matchDuration').value);
  gameSettings.soundEffects = document.getElementById('soundEffects').checked;
  
  localStorage.setItem('pitchpulse_settings', JSON.stringify(gameSettings));
  
  // Show success message
  alert('✅ Settings saved successfully!');
  closeModal();
}

// Show team selection modal
function showTeamSelection(mode) {
  gameMode = mode;
  selectedTeam1 = null;
  selectedTeam2 = null;
  
  const modal = document.getElementById('teamSelectionModal');
  const teamGrid = document.getElementById('teamGrid');
  
  // Clear previous teams
  teamGrid.innerHTML = '';
  
  // Get all teams
  const teams = getAllTeams();
  
  // Create team cards
  teams.forEach(team => {
    const card = document.createElement('div');
    card.className = 'team-card';
    card.onclick = () => selectTeam(team.id, card);
    
    card.innerHTML = `
      <span class="team-flag">${team.flag}</span>
      <div class="team-name">${team.name}</div>
      <div class="team-rating">⭐ ${team.rating}</div>
      <div class="team-stats">
        <div class="stat-item">
          <div class="stat-label">ATK</div>
          <div class="stat-value">${team.stats.attack}</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">DEF</div>
          <div class="stat-value">${team.stats.defense}</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">MID</div>
          <div class="stat-value">${team.stats.midfield}</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">SPD</div>
          <div class="stat-value">${team.stats.speed}</div>
        </div>
      </div>
      <div style="margin-top: 10px; font-size: 12px; color: var(--accent);">
        ${team.formation} • ${team.specialAbility}
      </div>
    `;
    
    teamGrid.appendChild(card);
  });
  
  modal.classList.add('active');
  document.getElementById('startGameBtn').disabled = true;
}

// Select team
function selectTeam(teamId, cardElement) {
  if (!selectedTeam1) {
    selectedTeam1 = teamId;
    cardElement.classList.add('selected');
    cardElement.innerHTML += '<div style="position: absolute; top: 10px; right: 10px; background: var(--accent); color: var(--dark); padding: 5px 10px; border-radius: 20px; font-weight: 700; font-size: 12px;">PLAYER 1</div>';
  } else if (!selectedTeam2 && teamId !== selectedTeam1) {
    selectedTeam2 = teamId;
    cardElement.classList.add('selected');
    cardElement.innerHTML += '<div style="position: absolute; top: 10px; right: 10px; background: var(--secondary); color: white; padding: 5px 10px; border-radius: 20px; font-weight: 700; font-size: 12px;">PLAYER 2</div>';
    document.getElementById('startGameBtn').disabled = false;
  } else if (teamId === selectedTeam1 || teamId === selectedTeam2) {
    // Deselect team
    cardElement.classList.remove('selected');
    const badge = cardElement.querySelector('div[style*="position: absolute"]');
    if (badge) badge.remove();
    
    if (teamId === selectedTeam1) {
      selectedTeam1 = null;
    } else {
      selectedTeam2 = null;
    }
    document.getElementById('startGameBtn').disabled = true;
  }
}

// Start game
function startGame() {
  if (!selectedTeam1 || !selectedTeam2) {
    alert('Please select two teams!');
    return;
  }
  
  // Save selections to localStorage
  localStorage.setItem('pitchpulse_team1', selectedTeam1);
  localStorage.setItem('pitchpulse_team2', selectedTeam2);
  localStorage.setItem('pitchpulse_mode', gameMode);
  
  // Redirect to game
  window.location.href = 'index.html';
}

// Show settings modal
function showSettings() {
  document.getElementById('settingsModal').classList.add('active');
}

// Close modal
function closeModal() {
  document.getElementById('teamSelectionModal').classList.remove('active');
  document.getElementById('settingsModal').classList.remove('active');
}

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
  loadSettings();
});

