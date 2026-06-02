// HYPOTHETICAL fixture — not a real team. Exists so that goal-aware scoring
// logic for RETOOLING gets exercised in tests, even though no current real-team
// fixture is in RETOOLING mode. When future-grade scoring lands, the RETOOLING
// branch should grade this team's hypothetical trades. If the RETOOLING branch
// is missing, the snapshot test below should make that obvious.

import {
  createPlayer,
  Positions,
  Archetypes,
  createContract,
  createTeamSnapshot,
  Goals,
} from '../../domain/index.js';

export const retoolersPlayers = [
  createPlayer({
    id: 'rt-star',
    name: 'Marcus Sterling',
    team: 'RTL',
    position: Positions.PG,
    age: 29,
    archetypes: [Archetypes.PRIMARY_CREATOR],
    valueComposite: 90,
    contract: createContract({ salaries: [{ year: 2026, amount: 40_000_000, confidence: 'known' }] }),
  }),
  createPlayer({
    id: 'rt-wing',
    name: 'Damien Hart',
    team: 'RTL',
    position: Positions.SF,
    age: 28,
    archetypes: [Archetypes.SCORING_WING],
    valueComposite: 82,
    contract: createContract({ salaries: [{ year: 2026, amount: 32_000_000, confidence: 'known' }] }),
  }),
  createPlayer({
    id: 'rt-anchor',
    name: 'Theo Bishop',
    team: 'RTL',
    position: Positions.C,
    age: 27,
    archetypes: [Archetypes.RIM_PROTECTOR],
    valueComposite: 72,
    contract: createContract({ salaries: [{ year: 2026, amount: 20_000_000, confidence: 'known' }] }),
  }),
  createPlayer({
    id: 'rt-young-guard',
    name: 'Jordan Cole',
    team: 'RTL',
    position: Positions.PG,
    age: 24,
    archetypes: [Archetypes.SECONDARY_CREATOR],
    valueComposite: 68,
    contract: createContract({ salaries: [{ year: 2026, amount: 7_000_000, confidence: 'known' }] }),
  }),
  createPlayer({
    id: 'rt-vet-3d',
    name: 'Brandon Reese',
    team: 'RTL',
    position: Positions.SG,
    age: 31,
    archetypes: [Archetypes.THREE_AND_D_WING],
    valueComposite: 60,
    contract: createContract({ salaries: [{ year: 2026, amount: 15_000_000, confidence: 'known' }] }),
  }),
  createPlayer({
    id: 'rt-stretch',
    name: 'Lucas Vance',
    team: 'RTL',
    position: Positions.PF,
    age: 26,
    archetypes: [Archetypes.FLOOR_SPACING_BIG],
    valueComposite: 65,
    contract: createContract({ salaries: [{ year: 2026, amount: 12_000_000, confidence: 'known' }] }),
  }),
  createPlayer({
    id: 'rt-bench-pg',
    name: 'Tobias Fox',
    team: 'RTL',
    position: Positions.PG,
    age: 30,
    archetypes: [Archetypes.SECONDARY_CREATOR],
    valueComposite: 55,
    contract: createContract({ salaries: [{ year: 2026, amount: 5_000_000, confidence: 'known' }] }),
  }),
  createPlayer({
    id: 'rt-project-wing',
    name: 'Drew Lin',
    team: 'RTL',
    position: Positions.SF,
    age: 22,
    archetypes: [Archetypes.CONNECTOR],
    valueComposite: 50,
    contract: createContract({ salaries: [{ year: 2026, amount: 4_000_000, confidence: 'known' }] }),
  }),
  createPlayer({
    id: 'rt-energy-big',
    name: 'Ezra Knight',
    team: 'RTL',
    position: Positions.C,
    age: 25,
    archetypes: [Archetypes.RIM_PROTECTOR],
    valueComposite: 48,
    contract: createContract({ salaries: [{ year: 2026, amount: 3_000_000, confidence: 'known' }] }),
  }),
  createPlayer({
    id: 'rt-end-bench',
    name: 'Wesley Chambers',
    team: 'RTL',
    position: Positions.SG,
    age: 28,
    archetypes: [Archetypes.CONNECTOR],
    valueComposite: 40,
    contract: createContract({ salaries: [{ year: 2026, amount: 2_000_000, confidence: 'known' }] }),
  }),
];

export const retoolersSnapshot = createTeamSnapshot({
  abbreviation: 'RTL',
  name: 'Hypothetical Retoolers',
  rosterPlayerIds: retoolersPlayers.map((p) => p.id),
  capState: null,
  draftPicks: [],
  record: { wins: 45, losses: 37 },
  mode: Goals.RETOOLING,
  modeNote: 'hypothetical fixture for test coverage — not a real team',
  headCoach: null,
});

export const retoolersRegistry = Object.fromEntries(
  retoolersPlayers.map((p) => [p.id, p])
);
