// gradeTradeStub.js — the verdict seam for the UI-only frontend slice.
//
// TODO: This is a STUB. It returns hardcoded values for the REBUILDING
// future-grade (Bucks side) taken verbatim from the locked rubric in
// docs/design/scoring-philosophy-future-rebuilding.md. It exists so the
// verdict's visual shape can be built and pressure-tested before any real
// scorer lands. REPLACE this with the real REBUILDING future-grade scorer
// once Q3 (the pick value table) is committed — see open-questions.md.
//
// THE OUTPUT CONTRACT — two distinct kinds of text, do not conflate them:
//   - score (number) + tier (word): MECHANICAL. The tier is a trivial lookup
//     from the score band (tierForScore), shared with the domain and the real
//     scorer. Cheap, deterministic, always present.
//   - verdict (one line) + description (paragraph): TRADE-SPECIFIC GENERATED
//     PROSE. The "what this trade does for this team," currently hardcoded
//     here; the real REBUILDING scorer / explanation layer must GENERATE these.
//     `band`/letter grades are gone (see decisions.md).
// The richer fields below (tier/verdict/description, weightedContribution) are
// the contract the real scorer must fulfill — the UI renders against this shape.
import { tierForScore } from "../../src/domain/grades.js";

const BUCKS_SCORE = 77;

// Bucks REBUILDING future-grade — locked anchor: 77, tier "Strong".
// 0.45 × 82 + 0.30 × 63 + 0.25 × 85 − 0 = 77
const bucksVerdict = {
  team: "Milwaukee Bucks",
  goal: "REBUILDING",
  overallScore: BUCKS_SCORE,
  // Mechanical: derived from the score via the single-source band lookup —
  // exactly what the real scorer will do (it is not generated prose).
  tier: tierForScore(BUCKS_SCORE),
  // Trade-specific prose #1: the punchy one-liner (the real scorer generates this).
  verdict:
    "A strong rebuild haul — premium pick capital and major salary relief, held back from elite by the absence of a young cornerstone.",
  // Trade-specific prose #2: the longer explanation behind the disclosure (the
  // real scorer / explanation layer generates this). Honest about provisionality.
  description:
    "Milwaukee turned an expensive, declining 31-year-old into future value across three " +
    "fronts. Pick capital scores 82 — three unprotected first-round picks plus a swap is an " +
    "excellent count, but they convey late (likely 18–27) because a Luka-led Lakers stays " +
    "competitive, so quantity is high and quality is capped. Young/cheap talent scores 63: " +
    "Knecht (24) is the only real upside, with Reaves, Hachimura, and Vanderbilt as useful " +
    "flippable pieces rather than a foundational cornerstone. Salary relief scores 85 — $54M " +
    "off the books reopens future free-agency optionality. The result is clearly goal-positive " +
    "but short of elite for one reason: no young cornerstone came back. Treat the 77 as " +
    "provisional — it rests on an illustrative pick-value estimate and will firm up once the " +
    "real pick-value table lands.",
  components: [
    {
      label: "Picks received (net)",
      weight: 0.45,
      score: 82,
      weightedContribution: 36.9, // 0.45 × 82
      note: "3 unprotected firsts + a swap, but they convey late (18–27).",
    },
    {
      label: "Young/cheap talent (net)",
      weight: 0.3,
      score: 63,
      weightedContribution: 18.9, // 0.30 × 63
      note: "Knecht (24) is the only real upside; the rest are useful flippable vets, not a foundational cornerstone.",
    },
    {
      label: "Salary shed (net relief)",
      weight: 0.25,
      score: 85,
      weightedContribution: 21.25, // 0.25 × 85
      note: "$54M off a declining 31-yo max — major future FA optionality.",
    },
  ],
  penalty: {
    score: 0,
    note: "Nothing toxic or long-term taken back.",
  },
  formula: "0.45 × 82 + 0.30 × 63 + 0.25 × 85 − 0 = 77",
};

// Lakers CONTENDING side — no fit-grade scorer exists yet. No score, no tier,
// no verdict prose: it isn't scored. The asymmetry is intentional.
const lakersVerdict = {
  team: "Los Angeles Lakers",
  goal: "CONTENDING",
  status: "not yet scored",
  note: "This side will be graded once the basketball-fit scorer is built.",
};

// Returns one verdict per team, in MIL-then-LAL order. A verdict is either a
// fully scored result (has overallScore/tier/components) or a placeholder (has
// status === "not yet scored"). Consumers branch on `status`.
export function gradeTradeStub() {
  return [bucksVerdict, lakersVerdict];
}
