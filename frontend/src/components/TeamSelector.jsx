// One side of the "two teams across the table" picker. The closed state is a
// big team-colored chip showing the currently-selected team (with a logo block
// + nickname); clicking it slides a panel of all 30 teams down beneath it, in
// the same row shape so the pattern reads top-to-bottom. The other side's
// pick gets disabled so the user can't pick the same team twice.
//
// Robert's design rules are upstream of this component (neutral score, neutral
// bar). The team-colored selector is an *identity* affordance, not a grade
// affordance — different surface, different rule.
import { useEffect, useRef, useState } from "react";
import { TEAMS } from "../data/teams.js";
import { logoUrlFor } from "../data/teamLogos.js";

export default function TeamSelector({ side, team, otherAbbr, onPick }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const listRef = useRef(null);

  // Close on outside click + Escape.
  useEffect(() => {
    if (!open) return;
    function onDocClick(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // When opened, scroll the selected team into view so it's not a hunt.
  useEffect(() => {
    if (!open || !team || !listRef.current) return;
    const el = listRef.current.querySelector(`[data-abbr="${team.abbr}"]`);
    if (el) el.scrollIntoView({ block: "center" });
  }, [open, team]);

  const placeholder = side === "left" ? "Pick Team A" : "Pick Team B";

  return (
    <div
      ref={rootRef}
      className={`selector ${open ? "selector--open" : ""}`}
      data-side={side}
    >
      <button
        type="button"
        className="selector__trigger"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((o) => !o)}
        style={
          team
            ? { "--team-primary": team.primary, "--team-secondary": team.secondary }
            : undefined
        }
        data-empty={team ? undefined : "true"}
      >
        {team ? (
          <TeamRow team={team} />
        ) : (
          <span className="selector__placeholder">{placeholder}</span>
        )}
        <span className="selector__chevron" aria-hidden="true">▾</span>
      </button>

      <div className="selector__panel" role="listbox" aria-label={`Team ${side}`}>
        <ul ref={listRef} className="selector__list">
          {TEAMS.map((t) => {
            const isPicked = team?.abbr === t.abbr;
            const isDisabled = otherAbbr === t.abbr;
            return (
              <li key={t.abbr}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isPicked}
                  data-abbr={t.abbr}
                  className={`team-row ${isPicked ? "team-row--picked" : ""} ${isDisabled ? "team-row--disabled" : ""}`}
                  disabled={isDisabled}
                  onClick={() => {
                    onPick(t.abbr);
                    setOpen(false);
                  }}
                  style={{
                    "--team-primary": t.primary,
                    "--team-secondary": t.secondary,
                  }}
                  title={isDisabled ? "Already on the other side" : t.name}
                >
                  <TeamRow team={t} />
                  {t.hasFixture && (
                    <span className="team-row__dot" title="Roster loaded" aria-hidden="true" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

// The row shape Ria specified: a uniform-sized logo block on the left, the
// nickname on the right. The wrapping button supplies the background = team
// primary; this sits on top of it. Logo comes from the NBA CDN (see
// data/teamLogos.js for the IP note).
function TeamRow({ team }) {
  const logoUrl = logoUrlFor(team.abbr);
  return (
    <span className="team-row__inner">
      <span className="team-row__logo">
        {logoUrl ? (
          <img
            className="team-row__logo-img"
            src={logoUrl}
            alt=""
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span className="team-row__abbr-fallback">{team.abbr}</span>
        )}
      </span>
      <span className="team-row__name">{team.nickname}</span>
    </span>
  );
}
