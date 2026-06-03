// The not-yet-scored side of the trade. The asymmetry is intentional — one
// team's goal has a scorer (the Bucks' REBUILDING future-grade), the other's
// (the Lakers' basketball-fit grade) does not yet. This panel makes that
// emptiness read as DELIBERATE: a roadmap marker for the slot the real
// fit-grade scorer will fill, not an error or an unfinished hole. It stays
// visually quieter than the scored card on purpose, but "quiet" should still
// look designed.
//
// Structured as its own component so swapping in the real fit-grade verdict
// later is a clean replacement at the VerdictCard branch, not a rewrite.
import CardHeader from "./CardHeader.jsx";
import { teamSlugFromName } from "./teamSlug.js";

export default function NotYetScored({ verdict }) {
  return (
    <article className="card card--unscored" data-team={teamSlugFromName(verdict.team)}>
      <CardHeader team={verdict.team} goal={verdict.goal} />

      <div className="not-scored">
        <span className="not-scored__tag">On the roadmap</span>
        <p className="not-scored__label">Fit-grade not yet scored</p>
        <p className="not-scored__note">{verdict.note}</p>
      </div>
    </article>
  );
}
