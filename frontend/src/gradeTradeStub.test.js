import { describe, it, expect } from "vitest";
import { gradeTradeStub } from "./gradeTradeStub.js";

// Regression guard: the rubric's locked anchor (77, tier "Strong" for the Bucks
// side of the Giannis→Lakers trade) must survive end-to-end through the UI's
// data layer. If the real REBUILDING scorer replaces this stub later, this test
// is what proves the anchor still holds. See scoring-philosophy.md.
describe("gradeTradeStub", () => {
  it("anchors the Bucks REBUILDING verdict at 77 / Strong", () => {
    const verdicts = gradeTradeStub();
    const bucks = verdicts.find((v) => v.team === "Milwaukee Bucks");

    expect(bucks).toBeDefined();
    expect(bucks.overallScore).toBe(77);
    expect(bucks.tier).toBe("Strong"); // mechanical: tierForScore(77)
  });

  it("carries trade-specific verdict + description prose (the scorer's job)", () => {
    const [bucks] = gradeTradeStub();
    expect(typeof bucks.verdict).toBe("string");
    expect(bucks.verdict.length).toBeGreaterThan(0);
    expect(typeof bucks.description).toBe("string");
    expect(bucks.description.length).toBeGreaterThan(0);
    // tier (mechanical word) and verdict (generated sentence) are distinct fields.
    expect(bucks.verdict).not.toBe(bucks.tier);
  });

  it("matches the locked component weights and scores", () => {
    const [bucks] = gradeTradeStub();
    const byLabel = Object.fromEntries(
      bucks.components.map((c) => [c.label, c]),
    );

    expect(byLabel["Picks received (net)"]).toMatchObject({ weight: 0.45, score: 82 });
    expect(byLabel["Young/cheap talent (net)"]).toMatchObject({ weight: 0.3, score: 63 });
    expect(byLabel["Salary shed (net relief)"]).toMatchObject({ weight: 0.25, score: 85 });

    // Weighted sum minus penalty reproduces the headline 77.
    const weighted = bucks.components.reduce((sum, c) => sum + c.weight * c.score, 0);
    expect(Math.round(weighted - bucks.penalty.score)).toBe(bucks.overallScore);
  });

  it("has weightedContributions that sum (minus penalty) to the overall score", () => {
    const [bucks] = gradeTradeStub();

    // Each component carries its own weight × score contribution...
    bucks.components.forEach((c) => {
      expect(c.weightedContribution).toBeCloseTo(c.weight * c.score, 2);
    });

    // ...and the three contributions, minus the penalty, reproduce the headline.
    // 36.9 + 18.9 + 21.25 − 0 = 77.05 ≈ 77. Guards the formula's internal
    // consistency end-to-end.
    const contributionSum = bucks.components.reduce(
      (sum, c) => sum + c.weightedContribution,
      0,
    );
    expect(contributionSum - bucks.penalty.score).toBeCloseTo(bucks.overallScore, 0);
  });

  it("leaves the Lakers side explicitly unscored (no fake fit-grade, no tier)", () => {
    const verdicts = gradeTradeStub();
    const lakers = verdicts.find((v) => v.team === "Los Angeles Lakers");

    expect(lakers.status).toBe("not yet scored");
    expect(lakers.overallScore).toBeUndefined();
    expect(lakers.tier).toBeUndefined();
    expect(lakers.components).toBeUndefined();
  });
});
