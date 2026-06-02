// The component breakdown is the feature, not a debug panel: it is the visual
// center of the scored card. Each component's 0–100 score is a horizontal bar
// so the reader grasps "picks scored high, youth dragged it down" by looking,
// not reading; the weightedContribution under each bar shows how the three
// pieces sum to the headline number. Bars are deliberately NOT color-coded
// good/bad — they use one neutral fill — because the scores are goal-relative
// (63 is "no cornerstone," not "bad"). Only the overall letter grade is colored.

function ComponentRow({ label, weight, score, note, weightedContribution }) {
  return (
    <div className="component">
      <div className="component__head">
        <span className="component__label">{label}</span>
        <span className="component__weight">{Math.round(weight * 100)}%</span>
        <span className="component__score">{score}</span>
      </div>
      <div className="component__bar" aria-hidden="true">
        <div className="component__bar-fill" style={{ width: `${score}%` }} />
      </div>
      <div className="component__meta">
        {weightedContribution != null && (
          <span className="component__contribution">
            contributes <strong>{weightedContribution}</strong> to the total
          </span>
        )}
        <p className="component__note">{note}</p>
      </div>
    </div>
  );
}

export default function ComponentBreakdown({ components, penalty }) {
  const hasPenalty = penalty && penalty.score !== 0;

  return (
    <div className="breakdown">
      {components.map((c) => (
        <ComponentRow
          key={c.label}
          label={c.label}
          weight={c.weight}
          score={c.score}
          weightedContribution={c.weightedContribution}
          note={c.note}
        />
      ))}

      {hasPenalty && (
        <div className="component component--penalty">
          <div className="component__head">
            <span className="component__label">Bad-money penalty</span>
            <span className="component__weight">subtracted</span>
            <span className="component__score">−{penalty.score}</span>
          </div>
          <p className="component__note">{penalty.note}</p>
        </div>
      )}
    </div>
  );
}
