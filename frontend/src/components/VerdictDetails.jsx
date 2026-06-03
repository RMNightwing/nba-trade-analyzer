// Layer 3 of the verdict — the opt-in depth. Collapsed by default so the card
// stays clean at a glance; expands to reveal the trade-specific one-line verdict
// first, then the longer description. The body stays mounted so we can animate
// open/close via CSS (max-height + opacity), keyed off the open className.
//
// This is where the project's thesis lives: ESPN's Trade Machine gives you a
// legality check; this gives you the *read*. The number + tier is the glance;
// this is the explanation behind it.
import { useState } from "react";

export default function VerdictDetails({ oneLiner, description }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`details ${open ? "details--open" : ""}`}>
      <button
        type="button"
        className="details__toggle"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="details__chevron" aria-hidden="true">▸</span>
        {open ? "Hide the read" : "What this trade does"}
      </button>

      <div className="details__body" aria-hidden={!open}>
        <p className="details__oneliner">{oneLiner}</p>
        <p className="details__description">{description}</p>
      </div>
    </div>
  );
}
