// One card per team, presented in three depth layers:
//   Layer 1 (glance): big "77" + tiny "/100" on the left, tier word ("Strong")
//                     right-aligned on the same baseline, color-keyed to the
//                     tier band (Strong = positive green, Damaging = red, etc.)
//                     Robert's rule that the *score* stays neutral is intact —
//                     only the *tier word* picks up the band color, because the
//                     band IS a semantic category (not a goal-relative number).
//   Layer 2 (visible): the component bars (the visual center) + the formula.
//   Layer 3 (opt-in): an expandable disclosure with the verdict one-liner and
//                      the longer description (see VerdictDetails).
// An unscored verdict is intentionally quieter — the asymmetry tells the user
// one side has been graded and the other has not.
import ComponentBreakdown from "./ComponentBreakdown.jsx";
import VerdictDetails from "./VerdictDetails.jsx";
import NotYetScored from "./NotYetScored.jsx";
import CardHeader from "./CardHeader.jsx";
import AnimatedScore from "./AnimatedScore.jsx";
import FormulaInteractive from "./FormulaInteractive.jsx";
import { teamSlugFromName } from "./teamSlug.js";

// Tier word → CSS modifier. The CSS owns the actual colors so the palette can
// be tuned in one place (App.css). Mirrors src/domain/grades.js TIERS.
const TIER_SLUG = {
  "Franchise Win": "franchise",
  Strong: "strong",
  Solid: "solid",
  Lateral: "lateral",
  Negative: "negative",
  Damaging: "damaging",
};

export default function VerdictCard({ verdict }) {
  if (verdict.status === "not yet scored") {
    return <NotYetScored verdict={verdict} />;
  }

  const tierSlug = TIER_SLUG[verdict.tier] ?? "neutral";

  return (
    <article className="card card--scored" data-team={teamSlugFromName(verdict.team)}>
      <CardHeader team={verdict.team} goal={verdict.goal} />

      <div className="card__headline">
        <span className="card__score-block">
          <AnimatedScore value={verdict.overallScore} className="card__score" />
          <span className="card__score-of">/100</span>
        </span>
        <span className={`card__tier card__tier--${tierSlug}`}>
          {verdict.tier}
        </span>
      </div>

      <ComponentBreakdown
        components={verdict.components}
        penalty={verdict.penalty}
      />

      <FormulaInteractive
        components={verdict.components}
        penalty={verdict.penalty}
        overallScore={verdict.overallScore}
      />

      <VerdictDetails
        oneLiner={verdict.verdict}
        description={verdict.description}
      />
    </article>
  );
}
