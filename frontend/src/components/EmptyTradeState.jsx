// Shown when the user picks a team pair that doesn't have fixture data yet.
// Robert has only loaded MIL + LAL rosters so far; any other pair lands here.
// Stays friendly — "roster not loaded yet," not "error."
export default function EmptyTradeState({ teamA, teamB }) {
  if (!teamA || !teamB) {
    return (
      <section className="empty-trade empty-trade--prompt">
        <p className="empty-trade__line">
          {teamA || teamB
            ? "Pick one more team to build a trade."
            : "Pick two teams above to start."}
        </p>
      </section>
    );
  }

  return (
    <section className="empty-trade">
      <span className="empty-trade__tag">Roster not loaded yet</span>
      <h3 className="empty-trade__title">
        <span
          className="empty-trade__team"
          style={{
            "--team-primary": teamA.primary,
            "--team-secondary": teamA.secondary,
          }}
        >
          {teamA.nickname}
        </span>
        <span className="empty-trade__sep" aria-hidden="true">↔</span>
        <span
          className="empty-trade__team"
          style={{
            "--team-primary": teamB.primary,
            "--team-secondary": teamB.secondary,
          }}
        >
          {teamB.nickname}
        </span>
      </h3>
      <p className="empty-trade__note">
        Only Milwaukee and the Lakers have full rosters in the system right now.
        Pick that pair to see the locked Giannis trade with its REBUILDING
        future-grade. More teams come online as Robert adds their data.
      </p>
    </section>
  );
}
