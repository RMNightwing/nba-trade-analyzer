# NBA Trade Analyzer — Core Scoring Backend (Design Doc)

## Status (Living Document)

**Last updated:** 2026-05-30

**Scoring philosophy — Q1 + Q2 settled (REBUILDING future-grade):** 0–100 rubric locked (goal-relative, pure future-only — present-year impact is what differentiates REBUILDING from RETOOLING). **Q2 weights locked: picks 45 / youth 30 / salary-shed 25**, combined as a straight additive weighted sum, with bad-money-taken-on as a separate duration-scaled penalty (additive Path A chosen over non-linear). Giannis→Lakers Bucks return **re-anchored 88 → ~77** (B+ band): the additive formula caps its components (picks 82 / youth 63 / salary 85) so it can't reach the gut-set 88 — real haul, but no foundational cornerstone and picks likely convey late. The return is **3 firsts + swap** (was mis-stated as 4). Full rubric + weights + anchors in [`docs/design/scoring-philosophy-future-rebuilding.md`](../design/scoring-philosophy-future-rebuilding.md). Q3 (pick-value table), Q4 (failure mode), Q5 (RETOOLING canary) still open.

This document is the working design contract for the trade scoring engine. It is updated as decisions get made — when something below shifts from "deferred" to "settled," or when a default gets replaced with a real choice, update this header and the relevant body section.

### Implementation stack (settled 2026-05-29)
- Runtime: Node.js
- Language: plain JavaScript (no TypeScript). Rationale: lower learning overhead for the project owner; TypeScript can be adopted later if it earns its place.
- Test runner: Vitest

### Built so far
- Project scaffolding (`package.json`, Vitest, `.gitignore`, `README.md`)
- Domain factories in `src/domain/`: `createPlayer` (with `archetypes: []` array — multi-archetype players supported), `createContract` (with per-salary `confidence`), `createDraftPick`, `createTeamSnapshot` (with `rosterPlayerIds`, `mode`, `modeNote`, `record`, `headCoach`, optional `capState`) + `createCapState`, `createGoal`, `createAssetFlow`, `createTrade`, `createCapGrade`, `createFitGrade`, `createFutureGrade`, `createOverallGrade`, `createTeamVerdict`, `createTradeAnalysis`. Archetypes enum includes `DEFENSIVE_FORWARD`.
- Console formatter in `src/format/console.js` — `formatTradeAnalysis` and `formatTeamSnapshot` (handles TODO / missing fields; supports `verbose: true` to show all archetypes for multi-archetype players)
- Bucks (21 players, mode `REBUILDING`) and Lakers (20 players, mode `CONTENDING`) fixtures in `src/fixtures/teams/*.js`, with a combined `playerRegistry` keyed by ID. Giannis and Turner carry multi-archetype tags; Vanderbilt uses `DEFENSIVE_FORWARD`; LeBron is deliberately under-tagged
- Hypothetical RETOOLING stub team in `src/fixtures/teams/retooling-stub.js` so the `RETOOLING` goal value gets exercised in tests even though no real fixture team uses it
- Giannis → Lakers trade fixture (placeholder pick ownership) in `src/fixtures/trades/giannis-to-lakers.js`
- Scripts: `npm run show-teams`, `npm run show-teams:verbose`, `npm run show-giannis-trade`
- Test coverage for every factory, both fixtures, the registry, the RETOOLING stub, the trade fixture, and the formatter
- `decisions.md` at repo root — append-only running log of project decisions
- `data/raw-rosters.md` — sources and per-field confidence for the roster fixtures

### v1 implementation targets (still ahead)
- Three-dimension scoring pipeline (cap / fit / future)
- Full first-/second-apron rules engine for legality + cap grading
- `HeuristicGoalInferrer` + user override (hybrid goal source)
- Analyst persona layer with initial 4 personas (Windhorst-style, Lowe-style, Greene-style, neutral baseline)
- Multi-team trade support (N ≥ 2) wired through the pipeline
- Pick value table (simplified Pelton chart)
- Fixture suite: Giannis hypothetical (in progress, awaiting roster confirmation), historical trades, apron edge cases
- Pluggable data interfaces (`PlayerRepository`, `TeamRepository`, `ContractRepository`, `PickRepository`, `CapRulesProvider`, `GoalInferrer`) with in-memory fixture implementations

### Deferred / future
- UI / frontend (the eventual frontend goal informs data shape but is out of scope here)
- HTTP / API layer
- Real data sources for stats, contracts, pick ownership
- `WebResearchGoalInferrer` (slots in behind the existing `GoalInferrer` interface)
- Real per-player stat composite source (BPM / EPM / RAPTOR / LEBRON / etc.) — v1 uses a placeholder `valueComposite` field
- Lineup-level synergy modeling for the fit grade (on/off splits, spacing overlap)
- Sign-and-trade / extend-and-trade *construction* (we evaluate them if presented; we don't build them)
- Persistence, auth, hosting
- Refinement of the simplified pick-value chart

### Defaults adopted to unblock v1 (all configurable)
| Decision | v1 default | Notes |
| --- | --- | --- |
| Stat composite source | Placeholder `valueComposite` field (0–100) per player on the fixture | Real source slots in behind `PlayerRepository` later |
| Pick value table | Simplified Kevin Pelton chart, hardcoded in a single data file | Tune later |
| Grade scale | Both letter (A–F) and 0–100 surfaced | — |
| Dimension weights | cap 30 / fit 30 / future 40 | Configurable per call |
| Multi-team "good trade" threshold | Every team's overall grade must be ≥ B− (70) | Configurable |

### Decisions still open
- None blocking implementation. The defaults above are explicit placeholders, not architectural commitments — when a real signal exists, replace it.

---

## Context

The standing public tool for evaluating NBA trades is ESPN's Trade Machine, which essentially only enforces salary-match legality. It says nothing about basketball fit, nothing about whether a trade *makes sense* for each team's competitive timeline, and nothing about the current CBA's apron-tier restrictions that increasingly govern what big-market teams can and can't do. As a result, fan-Twitter trade ideas routinely pass the Trade Machine while being incoherent — most famously, the recurring "put Giannis on my team" proposals that ignore apron consequences, roster fit, and the basic asymmetry that Milwaukee and a contender have different goals from a Giannis trade.

We're building a backend scoring engine that addresses those gaps. A trade is "good" when each team achieves its own goal — fairness is irrelevant; goal-achievement per team is what matters. This document covers the core scoring logic only — no UI, no API surface, no real data fetching. We design against in-memory fixtures so the engine and its dimensions can be validated before any data plumbing or interface work begins.

## Scope

**In scope**
- Domain model for trades, teams, players, picks, contracts, goals, and grades
- Scoring pipeline producing a per-team verdict + dimensional breakdown
- Three scoring dimensions: cap, basketball fit, future-projection-vs-goal
- Hybrid goal-source: deterministic inferrer + user override
- Full first-/second-apron rules engine for legality and cap grading
- Analyst-persona layer that re-presents the same scoring output through known commentator biases
- Multi-team trade support (N ≥ 2)
- Players and draft picks as tradable assets
- Fixture-driven test harness using real historical trades + the Giannis hypothetical

**Out of scope (deferred for later)**
- UI / frontend (the "less clunky frontend" goal informs the data model — grades must be presentable — but is built separately)
- HTTP / API layer
- Real data sources (player stats, contract data, pick ownership) — stubbed via fixtures
- Web-research goal inference (slots in later behind the existing `GoalInferrer` interface)
- Persistence, auth, hosting
- Sign-and-trade / extend-and-trade *creation* (we evaluate them if presented; we don't construct them)

## Architecture

The engine is structured as a pipeline with pluggable inputs at the edges so the same scoring core can later sit behind a UI, an API, or a research module without changes.

```
Trade (input)
  ↓
[1] Legality check (CBA rules engine)
  ↓
[2] Per-team scoring loop:
      ├─ Goal resolution (user override OR GoalInferrer)
      ├─ Cap grade        (cap-state delta + apron consequences)
      ├─ Fit grade        (advanced-stat delta + role-need fit)
      └─ Future grade     (asset trajectory vs goal)
  ↓
[3] Per-team verdict (weighted combine → letter + win/loss)
  ↓
[4] Analyst persona layer (re-presents structured grade as commentary)
  ↓
TradeAnalysis (output)
```

Persona commentary is a *presentation layer* over the same scored output — personas do not run their own scoring. Windhorst-as-persona reads the grade structure and amplifies whatever the cap-grade subsystem already concluded. This avoids N scoring models and keeps voices consistent with the data.

## Domain Model

These are the entities the engine reasons about. Field-level types and exact storage shape are deferred to implementation.

- **Player** — identity, current team, position, **role archetypes (array of one or more equally-weighted roles**; e.g. *primary creator*, *3&D wing*, *rim protector*, *floor-spacing big*, *defensive forward*, *connector*), contract terms (nested), a `valueComposite` field (0–100, placeholder for a real advanced-stat composite later). Multi-archetype players (Turner = floor-spacing big + rim protector; Giannis = primary creator + rim protector) are first-class — fit-grading iterates the array; persona layer chooses what to lead with.
- **Contract** — annual salaries through end-of-deal, player/team options, ETOs, no-trade clauses, trade kickers, base-year compensation flags, recent-extension restrictions
- **DraftPick** — year, owning team, original team, protections, swap rights, conveyance triggers
- **TeamSnapshot** — current roster, full cap state (salary total, cap, tax line, first apron, second apron, hard-cap status this season, trade exceptions, $ available), recent record proxy, draft picks owned (own + others')
- **Goal** — enum: `CONTENDING`, `WIN_NOW`, `PLAYOFF_PUSH`, `RETOOLING`, `REBUILDING`, `STAR_HUNTING`, plus optional free-text notes carried alongside (e.g. "must shed Beal money")
- **Trade** — N team participants, asset flows (`{asset, from_team, to_team}`), conditional add-ons (cash, swap rights triggered, etc.)
- **CapGrade / FitGrade / FutureGrade** — each carries a letter, a 0–100 score, the headline finding, and structured evidence (numeric deltas, triggered rules, archetype matches) that personas can later quote
- **TeamVerdict** — `{team, goalUsed, winLoss, overallGrade, [cap, fit, future] grades, keyDrivers}`
- **TradeAnalysis** — `{trade, legal, [TeamVerdict], personaCommentary[]}`

## Scoring Dimensions

### Cap grade (full apron-rules engine)

The first/second apron rules drive both *legality* and *grading*. The engine models:

- **Salary matching** appropriate to each participating team's apron tier (luxury-tax teams, first-apron teams, and second-apron teams have different matching rules)
- **Hard-cap triggers** — what actions in the trade hard-cap each team for the rest of the season, at which line
- **Aggregation restrictions** — second-apron teams cannot aggregate salaries in trade; this fails legality before grading
- **Frozen first-round pick** — second-apron teams' picks become unusable in specific situations
- **Sign-and-trade / extend-and-trade** consequences if applicable
- **TPE generation / usage**
- **Cash considerations** ($ limits)

Cap grade output: where each team lands (under cap / over cap / luxury tax / first apron / second apron), the restrictions newly triggered or lifted, the trajectory change (does this team gain or lose flexibility?), and a letter + 0–100 score. The grade penalizes legal-but-painful trades — pushing further into the second apron carries a real cost even when the math checks out.

### Basketball fit grade

For each team:

- **Net value delta** — sum of incoming player `valueComposite` minus outgoing
- **Role-need fit** — compare team's roster archetype gaps against what's incoming; reward filling gaps, penalize redundancy (e.g., adding a second primary creator to a team that already has one)
- **Positional balance** — does the post-trade roster still have viable starting and bench rotations at all five positions?
- **Age curve fit** — does the player's age trajectory match the team's competitive window?

Output: letter + 0–100, plus structured findings ("gains plus-spacing wing, loses primary rim protector"). No lineup-level synergy modeling in v1; it's data-hungry and the hardest to debug when scores feel wrong. Slotted as a future enhancement if needed.

### Future-projection grade (vs goal)

The grade depends on the team's `Goal`:

- **CONTENDING / WIN_NOW** — weight current-year impact: does this raise the ceiling now? Picks given up matter less; veterans gained matter more
- **PLAYOFF_PUSH** — middle ground; net-rating impact + 1-year flexibility
- **RETOOLING** — balance of present and future; reward roster-improving moves that don't sacrifice flexibility
- **REBUILDING** — weight assets accumulated: incoming picks, young players on cheap deals, expiring contracts, cap relief; current-year wins penalized lightly or ignored
- **STAR_HUNTING** — weight optionality: cap room, tradable young talent, picks preserved for a future swing

Output: letter + 0–100, with the headline phrased in the goal's terms ("Bucks: gains 3 future firsts and sheds long-term salary — strong rebuild move").

## Goal Inference (Hybrid)

A `GoalInferrer` interface so today's heuristic can be swapped for a web-research module later without touching scoring.

- **`HeuristicGoalInferrer`** (v1) — infers from `TeamSnapshot`:
  - Roster age curve (median age of top-8 by minutes)
  - Contract structure (length × $ commitment, win-now veterans vs young cheap deals)
  - Draft capital (owned vs traded away)
  - Recent record proxy
  - Cap posture (in tax/apron vs flexible)
  - Returns `{goal, confidence, reasoning}` so the upstream layer can show "We think Bucks = REBUILDING, change?"
- **User override** — if the caller supplies a `Goal`, the inferrer is bypassed. Overrides always win.
- **`WebResearchGoalInferrer`** — interface left in place; not implemented now.

## Analyst Persona Layer

Each persona is `{name, dimensionWeights, voiceTemplate, signaturePhrases, evidenceFilter}`. Personas operate on `TradeAnalysis`, not on raw trades:

1. Apply the persona's dimension weights to the structured grades to find which finding is "the one this persona would lead with"
2. Pull supporting evidence the persona's `evidenceFilter` cares about (Windhorst: apron-rule triggers, hard-cap consequences; Lowe: archetype overlaps, spacing implications; etc.)
3. Render via `voiceTemplate` with `signaturePhrases`

Initial persona set (v1):
- **Windhorst-style** — cap consequences, especially second-apron pain; "the math just doesn't work"
- **Lowe-style** — basketball fit and lineup implications; archetype redundancy
- **Greene-style** — pick valuation and rebuild trajectory
- **A "reasonable analyst" baseline** — non-persona summary for when commentary is unnecessary

Adding a new persona is a config change, not a code change.

## Assets

- **Player valuation** stays multi-dimensional through the pipeline — no collapse to a single "trade value number" — until per-team verdict assembly. Cap math uses contract salary; fit math uses `valueComposite` + archetype; future math uses age + contract length + goal-weighted projection.
- **Pick valuation** uses a simplified Kevin Pelton value chart, hardcoded in a single data file, indexed by expected draft slot, year (discounted further out), and protection class. Conditional picks score at expected-value across conveyance scenarios. The chart is a tunable starting point, not a final answer.

## Multi-Team Trades

- N teams, each gets its own `TeamVerdict`
- Trade-level "good trade" = every participating team's overall grade is ≥ B− (70). Configurable.
- The CBA legality engine handles three-team-trade routing rules (cap math is *not* just bilateral summed)
- The asset-flow model already supports `{asset, from, to}` triples, so N-team is the same code path as 2-team

## Data Layer

Everything the engine consumes is behind an interface:

- `PlayerRepository`, `TeamRepository`, `ContractRepository`, `PickRepository`, `CapRulesProvider`, `GoalInferrer`

v1 implementations are in-memory fixture-backed. This gives us a complete engine, full test coverage, and demonstrable example trades without committing to a stats API, contract source, or pick-tracking source. Real data sources slot in behind the same interfaces later.

## Verification

Validate the design without real data and without a UI:

- **Fixture suite of historical trades** — known-good outcomes the engine should grade plausibly: Luka → Lakers, Harden → 76ers, KD → Suns, Dame → Bucks, Ben Simmons → Nets, etc. We don't expect the engine to predict outcomes; we expect grades to be defensible to a basketball fan
- **Fixture suite of absurd trades** — rookie + two 2nds for an MVP — should grade harshly and the legality engine should usually reject before scoring
- **The Giannis hypothetical** from the spec — explicitly modeled, including the asymmetric-goal case (Bucks = REBUILDING, contender = CONTENDING) where both verdicts can be A's
- **Apron edge cases** — second-apron team trying to aggregate (must fail legality); first-apron team taking back >100% (must fail); hard-cap triggered mid-trade
- **Property tests** — every legal trade produces a complete `TradeAnalysis`; every illegal trade returns the specific legality failure
- **Persona snapshot tests** — Windhorst commentary on a cap-bad trade must mention the apron; Lowe commentary on a redundancy must mention the role overlap

## File / Module Sketch (for implementation phase)

When code begins, the expected module layout under `src/` is roughly:

- `domain/` — `Player`, `Contract`, `DraftPick`, `TeamSnapshot`, `Trade`, `Goal`, grade/verdict types
- `cap/` — apron-rules engine: `legality.js`, `apronConsequences.js`, `salaryMatching.js`
- `fit/` — fit grading: `archetype.js`, `roleFit.js`, `valueDelta.js`
- `future/` — goal-aware projection: `goalInferrer.js`, per-goal scorers
- `scoring/` — pipeline orchestrator + verdict assembly + weights
- `personas/` — persona definitions + commentary renderer
- `valuation/` — pick value table, player value composites

Plus repo-root `fixtures/` for trade scenarios and team snapshots, and colocated `*.test.js` files for Vitest. This is a sketch, not a commitment — module boundaries get finalized as we go.
