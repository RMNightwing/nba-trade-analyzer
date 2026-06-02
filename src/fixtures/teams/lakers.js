import {
  createPlayer,
  Positions,
  Archetypes,
  createContract,
  createTeamSnapshot,
  Goals,
} from '../../domain/index.js';

// Source: roster provided manually by the project owner on 2026-05-29.
// See data/raw-rosters.md for confidence per field and source notes.
// Archetypes: arrays (per Option E design). Where a player has clearly multiple
// roles AND the current taxonomy captures them, we list all. Where the taxonomy
// is insufficient (LeBron), we deliberately under-tag rather than mis-tag.

export const lakersPlayers = [
  createPlayer({
    id: 'luka-doncic',
    name: 'Luka Dončić',
    team: 'LAL',
    position: Positions.PG,
    age: 26,
    archetypes: [Archetypes.PRIMARY_CREATOR],
    valueComposite: 98,
    contract: createContract({
      salaries: [{ year: 2026, amount: 46_000_000, confidence: 'approximate' }],
      // TODO: confirm exact 2025-26 salary; out-year salaries, options, NTC, trade kicker
    }),
  }),
  createPlayer({
    id: 'lebron-james',
    name: 'LeBron James',
    team: 'LAL',
    position: Positions.SF,
    age: 41,
    // Deliberately under-tagged. LeBron deserves multiple archetypes but the current vocabulary
    // doesn't capture him well (PLAYMAKING_BIG isn't quite right — he's a 6'9 wing, not a big;
    // SCORING_WING + SECONDARY_CREATOR overlap awkwardly). SECONDARY_CREATOR matches his
    // current deference to Luka. Better to under-tag than to mis-tag and pollute fit-grading.
    // TODO: revisit when wing/forward taxonomy is cleaner — LeBron deserves multiple archetypes
    // but the current vocabulary doesn't capture him well.
    archetypes: [Archetypes.SECONDARY_CREATOR],
    valueComposite: 88,
    contract: createContract({
      salaries: [{ year: 2026, amount: 52_000_000, confidence: 'approximate' }],
      // TODO: LeBron's deal historically has options and NTC — verify
    }),
  }),
  createPlayer({
    id: 'austin-reaves',
    name: 'Austin Reaves',
    team: 'LAL',
    position: Positions.SG,
    age: 27,
    archetypes: [Archetypes.SECONDARY_CREATOR],
    valueComposite: 78,
    contract: createContract({
      salaries: [{ year: 2026, amount: 13_000_000, confidence: 'approximate' }],
      // TODO: confirm exact salary; out-year fields
    }),
  }),
  createPlayer({
    id: 'rui-hachimura',
    name: 'Rui Hachimura',
    team: 'LAL',
    position: Positions.PF,
    age: 27,
    archetypes: [Archetypes.SCORING_WING],
    valueComposite: 70,
    contract: createContract({
      salaries: [{ year: 2026, amount: 17_000_000, confidence: 'approximate' }],
      // TODO: confirm exact salary; out-year fields
    }),
  }),
  createPlayer({
    id: 'deandre-ayton',
    name: 'Deandre Ayton',
    team: 'LAL',
    position: Positions.C,
    age: 27,
    archetypes: [Archetypes.RIM_PROTECTOR],
    valueComposite: 70,
    contract: createContract({
      salaries: [{ year: 2026, amount: 8_000_000, confidence: 'approximate' }],
      // TODO: confirm exact salary; out-year fields
    }),
  }),
  createPlayer({
    id: 'marcus-smart',
    name: 'Marcus Smart',
    team: 'LAL',
    position: Positions.SG,
    age: 31,
    archetypes: [Archetypes.DEFENSIVE_GUARD],
    valueComposite: 65,
    contract: createContract({
      salaries: [{ year: 2026, amount: 20_000_000, confidence: 'approximate' }],
      // TODO: confirm exact salary; user described as point-of-attack defender / connector
      //       — kept single-archetype (DEFENSIVE_GUARD) per under-tag principle
    }),
  }),
  createPlayer({
    id: 'jake-laravia',
    name: 'Jake LaRavia',
    team: 'LAL',
    position: Positions.PF,
    age: 24,
    archetypes: [Archetypes.CONNECTOR],
    valueComposite: 60,
    contract: createContract({
      salaries: [{ year: 2026, amount: 6_000_000, confidence: 'approximate' }],
      // TODO: confirm exact salary; out-year fields
    }),
  }),
  createPlayer({
    id: 'jaxson-hayes',
    name: 'Jaxson Hayes',
    team: 'LAL',
    position: Positions.C,
    age: 25,
    archetypes: [Archetypes.RIM_PROTECTOR],
    valueComposite: 52,
    contract: createContract({
      salaries: [{ year: 2026, amount: 3_400_000, confidence: 'known' }],
      // TODO: out-year fields
    }),
  }),
  createPlayer({
    id: 'jarred-vanderbilt',
    name: 'Jarred Vanderbilt',
    team: 'LAL',
    position: Positions.PF,
    age: 26,
    // Defense-and-energy specialist who can't shoot — DEFENSIVE_FORWARD captures this
    // specifically. CONNECTOR (the previous mapping) was wrong because Vando doesn't
    // connect offense.
    archetypes: [Archetypes.DEFENSIVE_FORWARD],
    valueComposite: 58,
    contract: createContract({
      salaries: [{ year: 2026, amount: 11_000_000, confidence: 'approximate' }],
      // TODO: confirm exact salary; out-year fields
    }),
  }),
  createPlayer({
    id: 'luke-kennard',
    name: 'Luke Kennard',
    team: 'LAL',
    position: Positions.SG,
    age: 29,
    archetypes: [Archetypes.SCORING_WING],
    valueComposite: 52,
    contract: createContract({
      salaries: [{ year: 2026, amount: 0, confidence: 'unknown' }],
      // TODO: salary unknown — verify
    }),
  }),
  createPlayer({
    id: 'gabe-vincent',
    name: 'Gabe Vincent',
    team: 'LAL',
    position: Positions.PG,
    age: 29,
    archetypes: [Archetypes.SECONDARY_CREATOR],
    valueComposite: 48,
    contract: createContract({
      salaries: [{ year: 2026, amount: 11_000_000, confidence: 'approximate' }],
      // TODO: confirm exact salary; out-year fields
    }),
  }),
  createPlayer({
    id: 'dalton-knecht',
    name: 'Dalton Knecht',
    team: 'LAL',
    position: Positions.SF,
    age: 24,
    archetypes: [Archetypes.SCORING_WING],
    valueComposite: 55,
    contract: createContract({
      salaries: [{ year: 2026, amount: 4_000_000, confidence: 'known' }],
      // TODO: out-year fields (rookie scale)
    }),
  }),
  createPlayer({
    id: 'nick-smith-jr',
    name: 'Nick Smith Jr.',
    team: 'LAL',
    position: Positions.SG,
    age: 21,
    archetypes: [Archetypes.SECONDARY_CREATOR],
    valueComposite: 42,
    contract: createContract({
      salaries: [{ year: 2026, amount: 0, confidence: 'unknown' }],
      // TODO: salary unknown — verify
    }),
  }),
  createPlayer({
    id: 'drew-timme',
    name: 'Drew Timme',
    team: 'LAL',
    position: Positions.PF,
    age: 25,
    archetypes: [Archetypes.PLAYMAKING_BIG],
    valueComposite: 40,
    contract: createContract({
      salaries: [{ year: 2026, amount: 0, confidence: 'unknown' }],
      // TODO: salary / contract status unknown — verify
    }),
  }),
  createPlayer({
    id: 'maxi-kleber',
    name: 'Maxi Kleber',
    team: 'LAL',
    position: Positions.PF,
    age: 34,
    archetypes: [Archetypes.FLOOR_SPACING_BIG],
    valueComposite: 45,
    contract: createContract({
      salaries: [{ year: 2026, amount: 0, confidence: 'unknown' }],
      // TODO: salary unknown — verify
    }),
  }),
  createPlayer({
    id: 'bronny-james',
    name: 'Bronny James',
    team: 'LAL',
    position: Positions.SG,
    age: 21,
    archetypes: [Archetypes.DEFENSIVE_GUARD],
    valueComposite: 35,
    contract: createContract({
      salaries: [{ year: 2026, amount: 0, confidence: 'unknown' }],
      // TODO: two-way / developmental — clarify contract status when known
    }),
  }),
  createPlayer({
    id: 'kobe-bufkin',
    name: 'Kobe Bufkin',
    team: 'LAL',
    position: Positions.SG,
    age: 22,
    archetypes: [Archetypes.SECONDARY_CREATOR],
    valueComposite: 38,
    contract: createContract({
      salaries: [{ year: 2026, amount: 0, confidence: 'unknown' }],
      // TODO: salary unknown — verify
    }),
  }),
  createPlayer({
    id: 'adou-thiero',
    name: 'Adou Thiero',
    team: 'LAL',
    position: Positions.SF,
    age: 21,
    archetypes: [Archetypes.CONNECTOR],
    valueComposite: 35,
    contract: createContract({
      salaries: [{ year: 2026, amount: 0, confidence: 'unknown' }],
      // TODO: salary / contract status unknown — verify
    }),
  }),
  createPlayer({
    id: 'chris-manon',
    name: 'Chris Mañon',
    team: 'LAL',
    position: Positions.SG,
    age: 24,
    archetypes: [Archetypes.CONNECTOR],
    valueComposite: 30,
    contract: createContract({
      salaries: [{ year: 2026, amount: 0, confidence: 'unknown' }],
      // TODO: salary / contract status unknown — verify
    }),
  }),
  createPlayer({
    id: 'christian-koloko',
    name: 'Christian Koloko',
    team: 'LAL',
    position: Positions.C,
    age: 25,
    archetypes: [Archetypes.RIM_PROTECTOR],
    valueComposite: 30,
    contract: createContract({
      salaries: [{ year: 2026, amount: 0, confidence: 'unknown' }],
      // TODO: salary / contract status unknown — verify
    }),
  }),
];

export const lakersSnapshot = createTeamSnapshot({
  abbreviation: 'LAL',
  name: 'Los Angeles Lakers',
  rosterPlayerIds: lakersPlayers.map((p) => p.id),
  // TODO: populate capState when cap engine arrives
  capState: null,
  // TODO: owned draft picks not yet specified — the Giannis trade fixture invents placeholder picks
  draftPicks: [],
  record: { wins: 53, losses: 29 },
  mode: Goals.CONTENDING,
  modeNote: null,
  headCoach: 'JJ Redick',
});
