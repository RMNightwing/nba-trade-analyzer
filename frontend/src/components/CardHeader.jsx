// Shared header for verdict cards — both the scored card and the
// not-yet-scored marker label their team identically (team · goal).
export default function CardHeader({ team, goal }) {
  return (
    <header className="card__header">
      <span className="card__team">{team}</span>
      <span className="card__sep">·</span>
      <span className="card__goal">{goal}</span>
    </header>
  );
}
