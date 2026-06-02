// One card per team. A scored verdict leads with the headline number, then the
// component breakdown (the visual center), the formula, and the commentary as
// the closer. An unscored verdict is intentionally quieter — the asymmetry
// tells the user one side has been graded and the other has not.
import ComponentBreakdown from "./ComponentBreakdown.jsx";

// Only the LETTER grade is color-coded; the 0–100 number stays neutral.
function gradeClass(grade) {
  const letter = grade?.[0]?.toUpperCase();
  if (letter === "A") return "grade--a";
  if (letter === "B") return "grade--b";
  if (letter === "C") return "grade--c";
  if (letter === "D" || letter === "F") return "grade--df";
  return "grade--neutral";
}

function CardHeader({ team, goal }) {
  return (
    <header className="card__header">
      <span className="card__team">{team}</span>
      <span className="card__sep">·</span>
      <span className="card__goal">{goal}</span>
    </header>
  );
}

export default function VerdictCard({ verdict }) {
  if (verdict.status === "not yet scored") {
    return (
      <article className="card card--unscored">
        <CardHeader team={verdict.team} goal={verdict.goal} />
        <p className="card__unscored-label">Not yet scored</p>
        <p className="card__unscored-note">{verdict.note}</p>
      </article>
    );
  }

  return (
    <article className="card card--scored">
      <CardHeader team={verdict.team} goal={verdict.goal} />

      <div className="card__headline">
        <span className="card__score">{verdict.overallScore}</span>
        <span className="card__slash">/</span>
        <span className={`card__grade ${gradeClass(verdict.overallGrade)}`}>
          {verdict.overallGrade}
        </span>
      </div>

      <ComponentBreakdown
        components={verdict.components}
        penalty={verdict.penalty}
      />

      <p className="card__formula">{verdict.formula}</p>

      <p className="card__commentary">{verdict.commentary}</p>
    </article>
  );
}
