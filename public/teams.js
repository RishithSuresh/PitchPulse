// Comprehensive Teams Database
const TEAMS = {
  germany: {
    name: 'Germany',
    flag: '🇩🇪',
    colors: { primary: '#000000', secondary: '#DD0000', accent: '#FFCE00' },
    rating: 85,
    formation: '4-3-3',
    specialAbility: 'Precision',
    stats: { attack: 84, defense: 86, midfield: 85, speed: 82 }
  },
  brazil: {
    name: 'Brazil',
    flag: '🇧🇷',
    colors: { primary: '#009c3b', secondary: '#FFDF00', accent: '#002776' },
    rating: 90,
    formation: '4-2-3-1',
    specialAbility: 'Samba Style',
    stats: { attack: 92, defense: 82, midfield: 88, speed: 90 }
  },
  argentina: {
    name: 'Argentina',
    flag: '🇦🇷',
    colors: { primary: '#74ACDF', secondary: '#FFFFFF', accent: '#F6B40E' },
    rating: 88,
    formation: '4-4-2',
    specialAbility: 'Tiki-Taka',
    stats: { attack: 90, defense: 84, midfield: 87, speed: 85 }
  },
  france: {
    name: 'France',
    flag: '🇫🇷',
    colors: { primary: '#002395', secondary: '#ED2939', accent: '#FFFFFF' },
    rating: 89,
    formation: '4-3-3',
    specialAbility: 'Counter Attack',
    stats: { attack: 88, defense: 86, midfield: 87, speed: 91 }
  },
  spain: {
    name: 'Spain',
    flag: '🇪🇸',
    colors: { primary: '#AA151B', secondary: '#F1BF00', accent: '#FFFFFF' },
    rating: 86,
    formation: '4-3-3',
    specialAbility: 'Possession',
    stats: { attack: 85, defense: 84, midfield: 90, speed: 83 }
  },
  england: {
    name: 'England',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    colors: { primary: '#FFFFFF', secondary: '#CE1124', accent: '#012169' },
    rating: 84,
    formation: '4-2-3-1',
    specialAbility: 'Power Play',
    stats: { attack: 86, defense: 85, midfield: 82, speed: 84 }
  },
  portugal: {
    name: 'Portugal',
    flag: '🇵🇹',
    colors: { primary: '#006600', secondary: '#FF0000', accent: '#FFD700' },
    rating: 85,
    formation: '4-3-3',
    specialAbility: 'Wing Play',
    stats: { attack: 87, defense: 82, midfield: 84, speed: 86 }
  },
  italy: {
    name: 'Italy',
    flag: '🇮🇹',
    colors: { primary: '#009246', secondary: '#FFFFFF', accent: '#CE2B37' },
    rating: 85,
    formation: '3-5-2',
    specialAbility: 'Defensive Wall',
    stats: { attack: 82, defense: 90, midfield: 85, speed: 80 }
  },
  netherlands: {
    name: 'Netherlands',
    flag: '🇳🇱',
    colors: { primary: '#FF4F00', secondary: '#FFFFFF', accent: '#21468B' },
    rating: 84,
    formation: '4-3-3',
    specialAbility: 'Total Football',
    stats: { attack: 85, defense: 83, midfield: 86, speed: 84 }
  },
  belgium: {
    name: 'Belgium',
    flag: '🇧🇪',
    colors: { primary: '#000000', secondary: '#FDDA24', accent: '#EF3340' },
    rating: 83,
    formation: '3-4-3',
    specialAbility: 'Golden Generation',
    stats: { attack: 86, defense: 81, midfield: 84, speed: 83 }
  },
  croatia: {
    name: 'Croatia',
    flag: '🇭🇷',
    colors: { primary: '#FF0000', secondary: '#FFFFFF', accent: '#171796' },
    rating: 82,
    formation: '4-3-3',
    specialAbility: 'Resilience',
    stats: { attack: 81, defense: 83, midfield: 85, speed: 80 }
  },
  uruguay: {
    name: 'Uruguay',
    flag: '🇺🇾',
    colors: { primary: '#0038A8', secondary: '#FFFFFF', accent: '#FCD116' },
    rating: 82,
    formation: '4-4-2',
    specialAbility: 'Fighting Spirit',
    stats: { attack: 84, defense: 82, midfield: 80, speed: 81 }
  },
  mexico: {
    name: 'Mexico',
    flag: '🇲🇽',
    colors: { primary: '#006847', secondary: '#FFFFFF', accent: '#CE1126' },
    rating: 79,
    formation: '4-3-3',
    specialAbility: 'Passion',
    stats: { attack: 80, defense: 78, midfield: 79, speed: 82 }
  },
  japan: {
    name: 'Japan',
    flag: '🇯🇵',
    colors: { primary: '#FFFFFF', secondary: '#BC002D', accent: '#000000' },
    rating: 78,
    formation: '4-2-3-1',
    specialAbility: 'Discipline',
    stats: { attack: 77, defense: 79, midfield: 80, speed: 83 }
  },
  southkorea: {
    name: 'South Korea',
    flag: '🇰🇷',
    colors: { primary: '#FFFFFF', secondary: '#CD2E3A', accent: '#0047A0' },
    rating: 77,
    formation: '4-4-2',
    specialAbility: 'Stamina',
    stats: { attack: 76, defense: 78, midfield: 77, speed: 84 }
  },
  usa: {
    name: 'USA',
    flag: '🇺🇸',
    colors: { primary: '#FFFFFF', secondary: '#B22234', accent: '#3C3B6E' },
    rating: 76,
    formation: '4-3-3',
    specialAbility: 'Athletic',
    stats: { attack: 77, defense: 76, midfield: 75, speed: 85 }
  }
};

// Get team by ID
function getTeam(teamId) {
  return TEAMS[teamId] || TEAMS.germany;
}

// Get all teams as array
function getAllTeams() {
  return Object.keys(TEAMS).map(id => ({ id, ...TEAMS[id] }));
}

// Get teams sorted by rating
function getTeamsByRating() {
  return getAllTeams().sort((a, b) => b.rating - a.rating);
}
