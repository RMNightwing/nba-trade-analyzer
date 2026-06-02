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
// Salaries: known where the user provided a firm number; approximate where the
// user wrote ~$X; unknown (amount: 0) where the user wrote TODO.
// Archetypes: arrays (per Option E design); multi-archetype players list all
// equally-weighted roles they fill.

export const bucksPlayers = [
  createPlayer({
    id: 'giannis-antetokounmpo',
    name: 'Giannis Antetokounmpo',
    team: 'MIL',
    position: Positions.PF,
    age: 31,
    // Multi-archetype: legit top-tier rim defender in addition to primary creation.
    // TODO: revisit if a RIM_ATTACKER / SLASHER archetype is added — would replace RIM_PROTECTOR
    // for some downhill-finisher cases but Giannis is genuinely both on offense and defense.
    archetypes: [Archetypes.PRIMARY_CREATOR, Archetypes.RIM_PROTECTOR],
    valueComposite: 99,
    contract: createContract({
      salaries: [{ year: 2026, amount: 54_100_000, confidence: 'known' }],
      // TODO: out-year salaries, player option, no-trade clause, trade kicker
    }),
  }),
  createPlayer({
    id: 'kevin-porter-jr',
    name: 'Kevin Porter Jr.',
    team: 'MIL',
    position: Positions.PG,
    age: 25,
    archetypes: [Archetypes.SECONDARY_CREATOR],
    valueComposite: 68,
    contract: createContract({
      salaries: [{ year: 2026, amount: 11_000_000, confidence: 'approximate' }],
      // TODO: confirm exact 2025-26 salary; add out-year salaries and options
    }),
  }),
  createPlayer({
    id: 'ryan-rollins',
    name: 'Ryan Rollins',
    team: 'MIL',
    position: Positions.PG,
    age: 23,
    archetypes: [Archetypes.SECONDARY_CREATOR],
    valueComposite: 70,
    contract: createContract({
      salaries: [{ year: 2026, amount: 4_000_000, confidence: 'known' }],
      // TODO: out-year salaries, options, NTC, trade kicker
    }),
  }),
  createPlayer({
    id: 'cormac-ryan',
    name: 'Cormac Ryan',
    team: 'MIL',
    position: Positions.SG,
    age: 27,
    archetypes: [Archetypes.SCORING_WING],
    valueComposite: 50,
    contract: createContract({
      salaries: [{ year: 2026, amount: 0, confidence: 'unknown' }],
      // TODO: actual 2025-26 salary unknown — verify and update
      // TODO: out-year salaries, options, NTC, trade kicker
    }),
  }),
  createPlayer({
    id: 'bobby-portis',
    name: 'Bobby Portis',
    team: 'MIL',
    position: Positions.PF,
    age: 30,
    archetypes: [Archetypes.FLOOR_SPACING_BIG],
    valueComposite: 67,
    contract: createContract({
      salaries: [{ year: 2026, amount: 13_000_000, confidence: 'approximate' }],
      // TODO: confirm exact salary; user described as scoring big / connector — kept single-archetype per "under-tag rather than mis-tag" principle
      // TODO: out-year salaries, options, NTC, trade kicker
    }),
  }),
  createPlayer({
    id: 'kyle-kuzma',
    name: 'Kyle Kuzma',
    team: 'MIL',
    position: Positions.PF,
    age: 30,
    archetypes: [Archetypes.SCORING_WING],
    valueComposite: 65,
    contract: createContract({
      salaries: [{ year: 2026, amount: 22_500_000, confidence: 'known' }],
      // TODO: out-year salaries, options, NTC, trade kicker
    }),
  }),
  createPlayer({
    id: 'myles-turner',
    name: 'Myles Turner',
    team: 'MIL',
    position: Positions.C,
    age: 29,
    // Multi-archetype: top-10 shot blocker AND 38%+ three-point shooter for years.
    // This is the canonical multi-archetype case that drove the Option E design.
    archetypes: [Archetypes.FLOOR_SPACING_BIG, Archetypes.RIM_PROTECTOR],
    valueComposite: 75,
    contract: createContract({
      salaries: [{ year: 2026, amount: 24_000_000, confidence: 'approximate' }],
      // TODO: confirm exact salary; out-year fields
    }),
  }),
  createPlayer({
    id: 'ousmane-dieng',
    name: 'Ousmane Dieng',
    team: 'MIL',
    position: Positions.C,
    age: 22,
    archetypes: [Archetypes.FLOOR_SPACING_BIG],
    valueComposite: 52,
    contract: createContract({
      salaries: [{ year: 2026, amount: 0, confidence: 'unknown' }],
      // TODO: actual 2025-26 salary unknown — verify and update
      // TODO: out-year salaries, options, NTC, trade kicker
    }),
  }),
  createPlayer({
    id: 'cam-thomas',
    name: 'Cam Thomas',
    team: 'MIL',
    position: Positions.SG,
    age: 24,
    archetypes: [Archetypes.SCORING_WING],
    valueComposite: 58,
    contract: createContract({
      salaries: [{ year: 2026, amount: 0, confidence: 'unknown' }],
      // TODO: salary unknown — verify
    }),
  }),
  createPlayer({
    id: 'aj-green',
    name: 'A.J. Green',
    team: 'MIL',
    position: Positions.SG,
    age: 26,
    archetypes: [Archetypes.THREE_AND_D_WING],
    valueComposite: 62,
    contract: createContract({
      salaries: [{ year: 2026, amount: 0, confidence: 'unknown' }],
      // TODO: salary unknown — verify
    }),
  }),
  createPlayer({
    id: 'taurean-prince',
    name: 'Taurean Prince',
    team: 'MIL',
    position: Positions.SF,
    age: 31,
    archetypes: [Archetypes.THREE_AND_D_WING],
    valueComposite: 53,
    contract: createContract({
      salaries: [{ year: 2026, amount: 3_300_000, confidence: 'known' }],
      // TODO: out-year salaries, options, NTC, trade kicker
    }),
  }),
  createPlayer({
    id: 'gary-trent-jr',
    name: 'Gary Trent Jr.',
    team: 'MIL',
    position: Positions.SG,
    age: 27,
    archetypes: [Archetypes.THREE_AND_D_WING],
    valueComposite: 56,
    contract: createContract({
      salaries: [{ year: 2026, amount: 3_700_000, confidence: 'known' }],
      // TODO: out-year salaries, options, NTC, trade kicker
    }),
  }),
  createPlayer({
    id: 'cole-anthony',
    name: 'Cole Anthony',
    team: 'MIL',
    position: Positions.PG,
    age: 25,
    archetypes: [Archetypes.SECONDARY_CREATOR],
    valueComposite: 55,
    contract: createContract({
      salaries: [{ year: 2026, amount: 13_000_000, confidence: 'approximate' }],
      // TODO: confirm exact salary; out-year fields
    }),
  }),
  createPlayer({
    id: 'pete-nance',
    name: 'Pete Nance',
    team: 'MIL',
    position: Positions.PF,
    age: 25,
    archetypes: [Archetypes.FLOOR_SPACING_BIG],
    valueComposite: 45,
    contract: createContract({
      salaries: [{ year: 2026, amount: 0, confidence: 'unknown' }],
      // TODO: salary unknown — verify
    }),
  }),
  createPlayer({
    id: 'jericho-sims',
    name: 'Jericho Sims',
    team: 'MIL',
    position: Positions.C,
    age: 27,
    archetypes: [Archetypes.RIM_PROTECTOR],
    valueComposite: 48,
    contract: createContract({
      salaries: [{ year: 2026, amount: 0, confidence: 'unknown' }],
      // TODO: salary unknown — verify
    }),
  }),
  createPlayer({
    id: 'gary-harris',
    name: 'Gary Harris',
    team: 'MIL',
    position: Positions.SG,
    age: 31,
    archetypes: [Archetypes.THREE_AND_D_WING],
    valueComposite: 50,
    contract: createContract({
      salaries: [{ year: 2026, amount: 3_600_000, confidence: 'known' }],
      // TODO: out-year fields
    }),
  }),
  createPlayer({
    id: 'amir-coffey',
    name: 'Amir Coffey',
    team: 'MIL',
    position: Positions.SG,
    age: 28,
    archetypes: [Archetypes.THREE_AND_D_WING],
    valueComposite: 40,
    contract: createContract({
      salaries: [{ year: 2026, amount: 0, confidence: 'unknown' }],
      // TODO: end-of-bench wing; archetype is a generic fallback
    }),
  }),
  createPlayer({
    id: 'andre-jackson-jr',
    name: 'Andre Jackson Jr.',
    team: 'MIL',
    position: Positions.SG,
    age: 24,
    archetypes: [Archetypes.DEFENSIVE_GUARD],
    valueComposite: 42,
    contract: createContract({
      salaries: [{ year: 2026, amount: 0, confidence: 'unknown' }],
      // TODO: salary unknown — verify
    }),
  }),
  createPlayer({
    id: 'mark-sears',
    name: 'Mark Sears',
    team: 'MIL',
    position: Positions.PG,
    age: 23,
    archetypes: [Archetypes.SECONDARY_CREATOR],
    valueComposite: 40,
    contract: createContract({
      salaries: [{ year: 2026, amount: 0, confidence: 'unknown' }],
      // TODO: two-way / rookie — clarify contract status when known
    }),
  }),
  createPlayer({
    id: 'alex-antetokounmpo',
    name: 'Alex Antetokounmpo',
    team: 'MIL',
    position: Positions.SF,
    age: 24,
    archetypes: [Archetypes.CONNECTOR],
    valueComposite: 35,
    contract: createContract({
      salaries: [{ year: 2026, amount: 0, confidence: 'unknown' }],
      // TODO: salary / contract status unknown — verify
    }),
  }),
  createPlayer({
    id: 'thanasis-antetokounmpo',
    name: 'Thanasis Antetokounmpo',
    team: 'MIL',
    position: Positions.SF,
    age: 33,
    archetypes: [Archetypes.CONNECTOR],
    valueComposite: 35,
    contract: createContract({
      salaries: [{ year: 2026, amount: 0, confidence: 'unknown' }],
      // TODO: salary / contract status unknown — verify
    }),
  }),
];

export const bucksSnapshot = createTeamSnapshot({
  abbreviation: 'MIL',
  name: 'Milwaukee Bucks',
  rosterPlayerIds: bucksPlayers.map((p) => p.id),
  // TODO: populate capState when cap engine arrives (capSpace, deadCap, hardCapStatus, tradeExceptions, apron status)
  capState: null,
  // TODO: owned draft picks not yet specified — the Giannis trade fixture invents placeholder picks
  draftPicks: [],
  record: { wins: 32, losses: 50 },
  // Mode confirmed REBUILDING per project owner: public front-office statements indicate they
  // want blue-chip prospects and/or draft picks (textbook REBUILDING posture). The modeNote
  // preserves the ambiguity signal (record vs. perceived ownership intent) for the persona layer.
  mode: Goals.REBUILDING,
  modeNote: 'record vs. ownership intent — front office has publicly stated REBUILDING posture',
  headCoach: 'Doc Rivers',
});
