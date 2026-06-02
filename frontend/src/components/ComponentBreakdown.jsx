// The component breakdown is the feature, not a debug panel: it is the visual
// center of the scored card. Scores are shown as plain neutral numbers with an
// optional bar — deliberately NOT color-coded good/bad, because they are
// goal-relative (63 is "no cornerstone," not "bad").

function ComponentRow({ label, weight, score, note }) {
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
      <p className="component__note">{note}</p>
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
