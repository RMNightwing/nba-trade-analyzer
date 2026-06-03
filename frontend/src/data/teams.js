// All 30 NBA teams: brand colors + nickname (just the team name, not the city)
// for compact UI use. Only MIL and LAL have fixture data in /src today; the rest
// render as "roster not loaded yet" placeholders when picked.
//
// Colors are widely-known team brand colors. If Robert wants official Pantone
// matches he can tune them here — keep this the single source of truth.
export const TEAMS = [
  { abbr: "ATL", name: "Atlanta Hawks",          nickname: "Hawks",         primary: "#E03A3E", secondary: "#C1D32F", hasFixture: false },
  { abbr: "BOS", name: "Boston Celtics",         nickname: "Celtics",       primary: "#007A33", secondary: "#BA9653", hasFixture: false },
  { abbr: "BKN", name: "Brooklyn Nets",          nickname: "Nets",          primary: "#000000", secondary: "#FFFFFF", hasFixture: false },
  { abbr: "CHA", name: "Charlotte Hornets",      nickname: "Hornets",       primary: "#1D1160", secondary: "#00788C", hasFixture: false },
  { abbr: "CHI", name: "Chicago Bulls",          nickname: "Bulls",         primary: "#CE1141", secondary: "#000000", hasFixture: false },
  { abbr: "CLE", name: "Cleveland Cavaliers",    nickname: "Cavaliers",     primary: "#860038", secondary: "#FDBB30", hasFixture: false },
  { abbr: "DAL", name: "Dallas Mavericks",       nickname: "Mavericks",     primary: "#00538C", secondary: "#002B5E", hasFixture: false },
  { abbr: "DEN", name: "Denver Nuggets",         nickname: "Nuggets",       primary: "#0E2240", secondary: "#FEC524", hasFixture: false },
  { abbr: "DET", name: "Detroit Pistons",        nickname: "Pistons",       primary: "#C8102E", secondary: "#1D42BA", hasFixture: false },
  { abbr: "GSW", name: "Golden State Warriors",  nickname: "Warriors",      primary: "#1D428A", secondary: "#FFC72C", hasFixture: false },
  { abbr: "HOU", name: "Houston Rockets",        nickname: "Rockets",       primary: "#CE1141", secondary: "#000000", hasFixture: false },
  { abbr: "IND", name: "Indiana Pacers",         nickname: "Pacers",        primary: "#002D62", secondary: "#FDBB30", hasFixture: false },
  { abbr: "LAC", name: "LA Clippers",            nickname: "Clippers",      primary: "#C8102E", secondary: "#1D428A", hasFixture: false },
  { abbr: "LAL", name: "Los Angeles Lakers",     nickname: "Lakers",        primary: "#552583", secondary: "#FDB927", hasFixture: true  },
  { abbr: "MEM", name: "Memphis Grizzlies",      nickname: "Grizzlies",     primary: "#5D76A9", secondary: "#12173F", hasFixture: false },
  { abbr: "MIA", name: "Miami Heat",             nickname: "Heat",          primary: "#98002E", secondary: "#F9A01B", hasFixture: false },
  { abbr: "MIL", name: "Milwaukee Bucks",        nickname: "Bucks",         primary: "#00471B", secondary: "#EEE1C6", hasFixture: true  },
  { abbr: "MIN", name: "Minnesota Timberwolves", nickname: "Timberwolves",  primary: "#0C2340", secondary: "#78BE20", hasFixture: false },
  { abbr: "NOP", name: "New Orleans Pelicans",   nickname: "Pelicans",      primary: "#0C2340", secondary: "#C8102E", hasFixture: false },
  { abbr: "NYK", name: "New York Knicks",        nickname: "Knicks",        primary: "#006BB6", secondary: "#F58426", hasFixture: false },
  { abbr: "OKC", name: "Oklahoma City Thunder",  nickname: "Thunder",       primary: "#007AC1", secondary: "#EF3B24", hasFixture: false },
  { abbr: "ORL", name: "Orlando Magic",          nickname: "Magic",         primary: "#0077C0", secondary: "#C4CED4", hasFixture: false },
  { abbr: "PHI", name: "Philadelphia 76ers",     nickname: "76ers",         primary: "#006BB6", secondary: "#ED174C", hasFixture: false },
  { abbr: "PHX", name: "Phoenix Suns",           nickname: "Suns",          primary: "#1D1160", secondary: "#E56020", hasFixture: false },
  { abbr: "POR", name: "Portland Trail Blazers", nickname: "Trail Blazers", primary: "#E03A3E", secondary: "#000000", hasFixture: false },
  { abbr: "SAC", name: "Sacramento Kings",       nickname: "Kings",         primary: "#5A2D81", secondary: "#63727A", hasFixture: false },
  { abbr: "SAS", name: "San Antonio Spurs",      nickname: "Spurs",         primary: "#1B1B1B", secondary: "#C4CED4", hasFixture: false },
  { abbr: "TOR", name: "Toronto Raptors",        nickname: "Raptors",       primary: "#CE1141", secondary: "#000000", hasFixture: false },
  { abbr: "UTA", name: "Utah Jazz",              nickname: "Jazz",          primary: "#002B5C", secondary: "#F9A01B", hasFixture: false },
  { abbr: "WAS", name: "Washington Wizards",     nickname: "Wizards",       primary: "#002B5C", secondary: "#E31837", hasFixture: false },
];

export const TEAM_BY_ABBR = Object.fromEntries(TEAMS.map((t) => [t.abbr, t]));

// The locked fixture: picking these two teams shows the real Giannis trade and
// the locked REBUILDING verdict for the Bucks side. Any other pair shows an
// "roster not loaded" placeholder until Robert adds the data.
export const FIXTURE_PAIR = ["MIL", "LAL"];

export function isFixturePair(a, b) {
  if (!a || !b) return false;
  const set = new Set([a, b]);
  return set.has(FIXTURE_PAIR[0]) && set.has(FIXTURE_PAIR[1]);
}
