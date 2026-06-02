// One card per team, presented in three depth layers:
//   Layer 1 (glance): the number and tier word together — "77 · Strong".
//   Layer 2 (visible): the component bars (the visual center) + the formula.
//   Layer 3 (opt-in): an expandable disclosure with the verdict one-liner and
//                      the longer description (see VerdictDetails).
// An unscored verdict is intentionally quieter — the asymmetry tells the user
// one side has been graded and the other has not.
//
// No letter grades and no color-coded grade: the score is goal-relative, so the
// headline stays neutral (we don't paint "77" green to imply "good").
import ComponentBreakdown from "./ComponentBreakdown.jsx";
import VerdictDetails from "./VerdictDetails.jsx";
import NotYetScored from "./NotYetScored.jsx";
import CardHeader from "./CardHeader.jsx";

export default function VerdictCard({ verdict }) {
  if (verdict.status === "not yet scored") {
    return <NotYetScored verdict={verdict} />;
  }

  return (
    <article className="card card--scored">
      <CardHeader team={verdict.team} goal={verdict.goal} />

      <div className="card__headline">
        <span className="card__score">{verdict.overallScore}</span>
        <span className="card__headline-sep">·</span>
        <span className="card__tier">{verdict.tier}</span>
      </div>

      <ComponentBreakdown
        components={verdict.components}
        penalty={verdict.penalty}
      />

      <p className="card__formula">{verdict.formula}</p>

      <VerdictDetails
        oneLiner={verdict.verdict}
        description={verdict.description}
      />
    </article>
  );
}
