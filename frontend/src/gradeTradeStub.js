// gradeTradeStub.js — the verdict seam for the UI-only frontend slice.
//
// TODO: This is a STUB. It returns hardcoded values for the REBUILDING
// future-grade (Bucks side) taken verbatim from the locked rubric in
// docs/design/scoring-philosophy-future-rebuilding.md. It exists so the
// verdict's visual shape can be built and pressure-tested before any real
// scorer lands. REPLACE this with the real REBUILDING future-grade scorer
// once Q3 (the pick value table) is committed — see open-questions.md.
//
// The Lakers (CONTENDING) side has no scorer yet (fit-grade is a later
// slice), so it returns a "not yet scored" placeholder on purpose. The
// asymmetry is intentional: one side is graded, the other is not.

// Bucks REBUILDING future-grade — locked anchor: 77 / B+.
// 0.45 × 82 + 0.30 × 63 + 0.25 × 85 − 0 = 77
const bucksVerdict = {
  team: "Milwaukee Bucks",
  goal: "REBUILDING",
  overallScore: 77,
  overallGrade: "B+",
  components: [
    {
      label: "Picks received (net)",
      weight: 0.45,
      score: 82,
      note: "3 unprotected firsts + a swap, but they convey late (18–27).",
    },
    {
      label: "Young/cheap talent (net)",
      weight: 0.3,
      score: 63,
      note: "Knecht (24) is the only real upside; the rest are useful flippable vets, not a foundational cornerstone.",
    },
    {
      label: "Salary shed (net relief)",
      weight: 0.25,
      score: 85,
      note: "$54M off a declining 31-yo max — major future FA optionality.",
    },
  ],
  penalty: {
    score: 0,
    note: "Nothing toxic or long-term taken back.",
  },
  formula: "0.45 × 82 + 0.30 × 63 + 0.25 × 85 − 0 = 77",
  commentary:
    "Strong rebuild haul, held below the A− band by two named limitations: no foundational young cornerstone, and picks that very likely convey late because the Luka-led Lakers stay competitive.",
};

// Lakers CONTENDING side — no fit-grade scorer exists yet.
const lakersVerdict = {
  team: "Los Angeles Lakers",
  goal: "CONTENDING",
  status: "not yet scored",
  note: "Fit-grade scorer not yet implemented — see scoring-philosophy.md.",
};

// Returns one verdict per team, in MIL-then-LAL order. A verdict is either a
// fully scored result (has overallScore/overallGrade/components) or a
// placeholder (has status === "not yet scored"). Consumers branch on `status`.
export function gradeTradeStub() {
  return [bucksVerdict, lakersVerdict];
}
