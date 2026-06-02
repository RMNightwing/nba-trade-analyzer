import { describe, it, expect } from "vitest";
import { gradeTradeStub } from "./gradeTradeStub.js";

// Regression guard: the rubric's locked anchor (77 / B+ for the Bucks side of
// the Giannis→Lakers trade) must survive end-to-end through the UI's data
// layer. If the real REBUILDING scorer replaces this stub later, this test is
// what proves the anchor still holds. See scoring-philosophy.md.
describe("gradeTradeStub", () => {
  it("anchors the Bucks REBUILDING verdict at 77 / B+", () => {
    const verdicts = gradeTradeStub();
    const bucks = verdicts.find((v) => v.team === "Milwaukee Bucks");

    expect(bucks).toBeDefined();
    expect(bucks.overallScore).toBe(77);
    expect(bucks.overallGrade).toBe("B+");
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

  it("leaves the Lakers side explicitly unscored (no fake fit-grade)", () => {
    const verdicts = gradeTradeStub();
    const lakers = verdicts.find((v) => v.team === "Los Angeles Lakers");

    expect(lakers.status).toBe("not yet scored");
    expect(lakers.overallScore).toBeUndefined();
    expect(lakers.components).toBeUndefined();
  });
});
