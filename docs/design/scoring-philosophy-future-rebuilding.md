# Scoring Philosophy — REBUILDING Future-Grade

**Status:** Q1 + Q2 settled (Q1 2026-05-29; Q2 2026-05-30). Q3–Q5 TBD next session.

This document is the implementation contract for the **REBUILDING future-grade scorer** —
the first real scorer in the engine. Tomorrow-me reads this to start coding. It captures the
0–100 rubric, the anchored example trades, the component weights, and the foundational design
decisions. The pick-value table, the known failure mode, and the RETOOLING canary behavior are
still open (Q3–Q5 below).

The slice is validated against the **Bucks side of the Giannis→Lakers trade**, which under the
locked Q2 weights scores **~77** (pending Q3 firming the pick-value number). It was anchored at
88 by gut feel during Q1; the disciplined additive formula corrects it down to ~77 — see
[Q2 settled](#q2-settled--component-weights) and [The Giannis anchor](#the-giannis-anchor--why-77).

---

## Core framing — FutureGrade is goal-relative, not absolute basketball value

For a REBUILDING team the future-grade answers one narrow question:

> *Did this trade convert present-tense assets the team doesn't need (expensive aging vets,
> win-now salary) into future-tense value the team does need (picks, young cheap upside, cap
> flexibility, salary relief)?*

A trade that makes the team **worse next season** can still score a 95 if it stockpiles the
future. That asymmetry is the entire point of the project — it is what ESPN's Trade Machine
cannot see.

## Decision — REBUILDING is pure future-only

**REBUILDING future-grade ignores present-year impact entirely.** Present-year impact is the
dividing line between REBUILDING and RETOOLING, and collapsing them into one mode with a
tunable knob would destroy the conceptual clarity that distinct modes exist to provide.

- **REBUILDING** = future-only. Present-year wins are not rewarded and (lightly) not penalized.
  Design shape: *future-weights only.*
- **RETOOLING** (a later, separate slice) = "we still have a chance, competing soon, maybe
  next season, but we need to change something." Present-year matters meaningfully **and** so
  does the future. Design shape: *meaningful present-year weights + meaningful future weights.*

Do **not** smuggle present-year into REBUILDING via a "floor" or a "small weight." Keep the
modes conceptually distinct. The present-future balance lives in the RETOOLING scorer.

This clean separation is also what makes the RETOOLING scorer tractable when its slice comes
up: its job is explicitly "balance two weighted halves," vs. REBUILDING's "score one half."

---

## The rubric (0–100)

| Band | Tier | Meaning for a REBUILDING team |
|------|------|-------------------------------|
| **95–100** | Franchise Win | Franchise-altering teardown win. Sheds the expensive vet *and* lands a foundational young cornerstone (≤22, rookie-scale, blue-chip upside) **plus** premium picks (unprotected, from teams likely to pick high) **plus** real cap relief. The realistic ceiling. |
| **85–94** | Franchise Win | Excellent rebuild haul. Lots of future value — multiple unprotected-ish firsts + swaps + young players on good deals + major salary shed — but the youth is "useful," not foundational, **or** the picks are likely low-value. *(No real-fixture trade anchors this band yet — the ~97 hypothetical anchors the ceiling above it; see the example ladder.)* |
| **75–84** | Strong | Clearly goal-positive, with a visible flaw: picks heavily protected, some medium-term money taken back, or unproven youth without pick capital. Still a "yes." **The Giannis→Lakers Bucks return lands at ~77 here** — strong pick *count* + major salary relief, dragged by no foundational cornerstone and late-conveying picks. |
| **70–74** | Solid | Marginal pass (the project's "good trade" floor). Net-positive but thin — one good pick + filler, or youth without picks. |
| **55–69** | Lateral | Doesn't advance the rebuild — mid-vet for mid-vet, picks wash, no flexibility gained. |
| **40–54** | Negative | Goal-negative. Gives up future assets or takes on long-term money for a win-now piece the team doesn't need. |
| **0–39** | Damaging | Catastrophic. Trades away youth **and** picks for an aging expensive vet — locks in worse future *and* worse flexibility. The fan-Twitter mistake applied to a team that should be tearing down. |

> **Tier model.** We dropped letter grades — the academic A–F scale (and the
> briefly-considered idea of just reusing the standard academic scale) carried
> baggage that fought the score's domain meaning. The tier word is now a
> mechanical property of the score band; `tierForScore()` in
> `src/domain/grades.js` is the single source of truth. The 85–100 **Franchise
> Win** tier spans the two top rows above — the 95–100 ceiling and the 85–94
> excellent-but-not-foundational range are shades of the same tier. And the
> bottom of the scale is now spread across three distinct words — **Lateral**
> (no progress), **Negative** (goal-negative), **Damaging** (catastrophic) —
> rather than compressed.

### Anchored example trades

- **~97 — Franchise Win** — Giannis out for a 21-yo former top-3 pick on rookie scale + 3
  unprotected firsts from a likely-bad team + a cheap young big + full cap relief.
  *Cornerstone + premium picks.* This is the headroom that keeps the actual Giannis return
  below the ceiling.
- **~77 — Strong — the actual Giannis→Lakers Bucks return.** Computed from the locked Q2
  weights, not gut feel (it was anchored at 88 during Q1; the formula corrects it down). See below.
- **~70–72 — Solid** — Giannis for 2 *protected* firsts + one young player + filler that
  includes a medium-term contract. Good but flawed: thinner pick capital than the actual
  Giannis trade (protected vs. unprotected, fewer bites), and a chunk of taken-back money
  that dents flexibility — so it sits just below the actual return.
- **~50 — Negative** — Giannis for an established 28-yo All-Star on a max + one first. They
  re-tooled around a different expensive vet instead of tearing down — wrong for REBUILDING.
  (At ~50 this sits in the Negative band, 40–54; a true *Lateral* — picks wash, no flexibility
  gained — would land in 55–69.)
- **~30 — Damaging** — Giannis *plus* Knecht *plus* a pick for an aging, expensive veteran.
  Catastrophic.

## The Giannis anchor — why ~77

The Bucks side is a high-quality rebuild haul: **3 LAL firsts + a 2032 swap, plus Knecht (24,
cheap), useful young-ish vets to flip later, and $54M of declining-31-yo salary erased —
costing only a top-3-protected first.** That is genuinely good for a team optimizing for the
future — but "good" is not "excellent," and the Q2 formula now says so explicitly.

Under the locked Q2 weights (picks 45 / youth 30 / salary-shed 25, bad-money penalty applied
after), scoring each component 0–100 against the realistic Giannis-caliber ceiling:

| Component | Score | Why |
|-----------|-------|-----|
| Picks (net) | **82** | Excellent *count* — 3 unprotected firsts + a swap, minus the one top-3-protected first sent back — but they convey **late (18–27)**, so quantity is high and quality is capped. |
| Youth/talent (net) | **63** | Knecht (24) is the only real youth-with-upside, ceiling a rotation player. Reaves (27), Hachimura (27), Vanderbilt (26) are *useful flippable* assets, not 21-yo blue-chips — intermediate value, not the prize. **No foundational cornerstone.** |
| Salary shed | **85** | $54M off a declining 31-yo max — elite long-term relief that reopens future free-agency optionality. |
| Bad-money penalty | **0** | Nothing toxic or long-term in the return. |

`0.45 × 82 + 0.30 × 63 + 0.25 × 85 − 0 = 36.9 + 18.9 + 21.25 = ~77`

So the two named limitations are no longer hand-wavy "headroom" arguments — they *are* the
capped component scores:

1. **No foundational cornerstone** → the youth component scores 63, not 85+. Reaves, Hachimura,
   and Vanderbilt are intermediate assets a rebuilder flips for *more* futures, not the prize.
2. **The picks very likely convey late (18–27)** → the picks component scores 82, not 95+.
   Sharpened by a fit observation: Luka and Giannis are both extremely ball-dominant primary
   creators with overlapping needs (both want 3&D wings; neither pairs well with another
   high-usage creator). Adding Giannis to a Luka team is a *redundancy* problem, not a clean
   upgrade — which makes the Lakers staying competitive (and the picks staying low-value)
   *more* likely, not less.

So ~77 sits in the Strong band: real value, with named limitations that the additive formula
captures mechanically. The Franchise Win band above it stays open because a better Giannis
return (cornerstone + premium picks, the ~97 example) demonstrably exists on paper.

> **Why not 88?** The Q1 anchor of 88 was set by gut feel, before the weights existed. An
> additive weighted average cannot exceed its inputs: with picks capped at 82 and youth at 63
> by the two named limitations, no defensible weighting reaches 88. We chose to keep the simple,
> debuggable additive model (Path A) and re-anchor 88 → ~77 rather than add non-linear machinery
> to preserve 88. The ~77 is **pending Q3** — the picks score (82) is illustrative until the
> pick-value table lands; that table is the most likely thing to move this number.

> **Cross-slice note (free fixture for the fit-grade slice):** the Giannis-Luka redundancy is
> exactly the analytical depth the fit-grade slice must produce. Future-grade gives the Bucks
> ~77; fit-grade should give the Lakers a *meaningfully lower* score for the same trade. That
> asymmetry — great asset return for one team, messy fit for the other — is the whole point of
> the analyzer. Use this trade as the "high asset-value, poor fit" test fixture when fit-grade
> is built.

---

## Q2 settled — component weights

**Settled 2026-05-30.** REBUILDING future-grade = a weighted sum of three positive "value
built" components, minus a separate bad-money penalty.

### Weights (positive components sum to 100%)

| Component | Weight | Notes |
|-----------|--------|-------|
| **Picks received (net)** | **45%** | Heaviest — asset accumulation is the definition of rebuilding. Capped below 60% on purpose: a pure pick-hoard with no usable talent maxes at ~45 + 25 = 70/100, so the formula refuses to call "hoarding lottery tickets" a great rebuild. Net = picks in − picks out, scored by count × quality (draft slot) × year-discount × protection class. |
| **Young/cheap talent received (net)** | **30%** | The 30% is a *budget*; inside it each incoming young player is quality-scaled on age curve × contract value × established-vs-unproven. A 20-yo blue-chip on rookie scale approaches the component ceiling; a 24-yo fringe rotation guy contributes a sliver. Same weight, very different output. |
| **Salary shed (net relief)** | **25%** | Secondary to picks/youth but a meaningful quarter of the score — erasing a max reopens *future* free-agency optionality, not just current cap. Bumped from an initial 20% because relief matters more for a rebuilder than the conventional read suggests. |

### Bad money taken on — separate penalty, not a fourth weight

Applied **after** the weighted sum as a subtractive, duration-scaled penalty (0 to ~ −25 pts):
`penalty ≈ (toxic $ taken back) × (guaranteed years beyond the expiring season)`, capped near
−25. This structure is deliberate: a deduction can scale a 2-year mistake far more gently than
a 5-year albatross, which a fixed co-equal weight cannot.

### Combination — additive (Path A)

Straight weighted sum of the three positives → a 0–100 "value built" score, then minus the
bad-money penalty. We chose this simple, debuggable model over a non-linear one (accumulation
bonus / band-then-position). Trade-off accepted and recorded: an additive average **cannot
reproduce the Q1 gut-anchor of 88** for the Giannis trade (its components cap at 82/63/85), so
we re-anchored 88 → ~77 rather than add tunable machinery. Fewer knobs matters because Q3's
pick-value table is already flagged as the likeliest source of wrong grades.

### Data gap (recorded, not blocking this slice)

Fixtures currently carry **only 2026 salaries — every out-year is `TODO`**. Consequences:

- **Salary shed** can see only one year (Giannis $54M out, $45M in → net +$9M), not the
  multi-year relief the 85 score is really about. **v1: score salary-shed on gross outgoing
  vet salary** so $54M reads as the big relief it is.
- **Bad-money duration penalty** has nothing to scale against (no out-year data → duration
  unknown). **v1: penalty is inert (0)** until out-year fixture data lands. It is 0 on Giannis
  regardless, so it does not block this slice.
- **Young-player contract-length** subfactor likewise awaits out-year data.

When out-year salary/option data is added to the fixtures, revisit salary-shed and the
bad-money penalty so they use real multi-year numbers.

---

## Open questions — TBD next session

### Q3 — Pick value table
**TBD.** Source decision (implement Pelton directly / approximate / roll our own) plus full
numerical values for pick slots 1–30, the future-year discount, and the protection adjustment.
Table must live in `analyzerConfig.js` so it is tunable without editing scoring logic. Most
likely source of wrong grades — commit the actual numbers before coding.

### Q4 — Failure mode
**TBD.** Identify the obvious blind spot in the proposed formula (e.g., "team trades 5
expiring contracts for a young star, formula says it's bad because no picks came back") and
decide: fix it or document it explicitly.

### Q5 — RETOOLING canary confirmation
**TBD.** Confirm the dispatcher, once REBUILDING lands, makes the RETOOLING test fail with an
informative message ("REBUILDING scorer registered; RETOOLING scorer not yet implemented")
rather than a generic crash.
