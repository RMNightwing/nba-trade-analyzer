# Raw Roster Data

This document captures the source and date of the roster data encoded into `src/fixtures/teams/*.js`. Future-you (and anyone else reading the fixtures) should be able to trace any field back to its origin and known confidence.

## Source

Roster data provided manually by the project owner on **2026-05-29**.

| Field group | Confidence | Source |
| --- | --- | --- |
| Roster composition, ages, positions | high | SportBusy 2025-26 season data |
| 2025-26 salary (firm values, e.g. `$54.1M`) | high (`confidence: 'known'`) | ESPN NBA Salaries page, cross-referenced by project owner |
| 2025-26 salary (approximate, e.g. `~$11M`) | medium, ±10% (`confidence: 'approximate'`) | project owner approximation |
| 2025-26 salary (TODO) | none (`confidence: 'unknown'`, `amount: 0`) | not provided |
| Out-year salary, options, NTC, trade kicker, BYC | none — left as `// TODO` comments at call sites | not provided |
| Archetype | informed read by project owner | project owner; tunable later |
| `valueComposite` (0–100) | rough placeholder | project owner; refined when fit-grading slice arrives |
| `capState` (capSpace, deadCap, hardCapStatus, tradeExceptions) | none — left `null` | will be derived by cap engine |
| Owned draft picks | none — left as `[]` | not yet provided; matter for the realistic Giannis trade structure |

## Teams Captured

- **Milwaukee Bucks** — `src/fixtures/teams/bucks.js` — 21 players, record 32-50, mode `REBUILDING` with note `"ambiguous — record vs. ownership intent"`, head coach Doc Rivers
- **Los Angeles Lakers** — `src/fixtures/teams/lakers.js` — 20 players, record 53-29, mode `CONTENDING`, head coach JJ Redick

## How to Update

When refining a team:

1. Update the relevant `src/fixtures/teams/*.js` file.
2. If a salary moves from `unknown` → `approximate` or `known`, update the `confidence` flag on the salary entry and remove the corresponding `// TODO` comment.
3. When the cap engine arrives, populate the `capState` field on the snapshot. Until then, leave it `null`.
4. Update this document if the source or confidence categories change.

## Notes on Archetype Mapping

The project owner provided descriptive archetype labels (e.g. "scoring big / connector"). These were mapped to the closest enum value in `src/domain/player.js` (`Archetypes`). The mapping decisions are recorded as `// TODO` comments in the fixture files where the mapping was non-obvious — for example, "defensive forward" was mapped to `CONNECTOR` because no `DEFENSIVE_FORWARD` archetype exists yet. These are worth revisiting before fit grading goes live.
