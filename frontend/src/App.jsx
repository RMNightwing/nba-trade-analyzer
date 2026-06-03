// The frontend reads the trade straight from the existing /src fixtures via
// Vite — no backend server, no re-declared trade data. The verdict comes from
// the local gradeTradeStub (a stand-in for the real REBUILDING scorer).
//
// UX shape: a two-team "across-the-table" picker — one team on each side. If
// the picked pair has fixture data (MIL + LAL), the locked Giannis trade and
// its real verdict render below. Any other pair lands on a friendly "roster
// not loaded yet" placeholder — no fake data.
import { useEffect, useState } from "react";
import { giannisToLakers } from "../../src/fixtures/index.js";
import { gradeTradeStub } from "./gradeTradeStub.js";
import TradeColumns from "./components/TradeColumns.jsx";
import VerdictCard from "./components/VerdictCard.jsx";
import TeamSelector from "./components/TeamSelector.jsx";
import EmptyTradeState from "./components/EmptyTradeState.jsx";
import { TEAM_BY_ABBR, FIXTURE_PAIR, isFixturePair } from "./data/teams.js";

export default function App() {
  // Theme is persisted via localStorage; initial value comes from the <html>
  // data-theme attribute that index.html resolves before paint (no flash).
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute("data-theme") || "light",
  );
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // One slot per side. Defaults to the demo pair so the page is "alive" on
  // first visit. Either slot can be null while the user is mid-pick.
  const [leftAbbr, setLeftAbbr] = useState(FIXTURE_PAIR[0]);
  const [rightAbbr, setRightAbbr] = useState(FIXTURE_PAIR[1]);

  const teamLeft = leftAbbr ? TEAM_BY_ABBR[leftAbbr] : null;
  const teamRight = rightAbbr ? TEAM_BY_ABBR[rightAbbr] : null;
  const showRealTrade =
    !!leftAbbr && !!rightAbbr && isFixturePair(leftAbbr, rightAbbr);
  const verdicts = showRealTrade ? gradeTradeStub() : [];

  // Drive the page glow off the picked teams' primaries so the background
  // takes on those colors. Falls through to transparent if a slot is empty.
  const appStyle = {
    "--page-glow-a": teamLeft?.primary ?? "transparent",
    "--page-glow-b": teamRight?.primary ?? "transparent",
  };

  return (
    <div className="page" style={appStyle}>
      <header className="topbar">
        <div className="topbar__inner">
          <a className="brand" href="/">
            <span className="brand__mark" aria-hidden="true">
              <span className="brand__mark-inner">↔</span>
            </span>
            <span className="brand__name">Trade Analyzer</span>
          </a>
          <button
            type="button"
            className="theme-toggle"
            aria-label="Toggle theme"
            aria-pressed={theme === "dark"}
            onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
          >
            {theme === "light" ? "🌙" : "☀"}
          </button>
        </div>
      </header>

      <main className="app">
        <section className="hero">
          <h1 className="hero__title">NBA Trade Analyzer</h1>
          <p className="hero__subtitle">
            Pick two teams, see the trade, and read a goal-aware verdict for
            each side — broken down across cap, fit, and future.
          </p>
        </section>

        <section className="matchup" aria-label="Pick two teams">
          <TeamSelector
            side="left"
            team={teamLeft}
            otherAbbr={rightAbbr}
            onPick={(abbr) => setLeftAbbr(abbr)}
          />
          <div className="matchup__divider" aria-hidden="true">
            <span className="matchup__bolt">↔</span>
          </div>
          <TeamSelector
            side="right"
            team={teamRight}
            otherAbbr={leftAbbr}
            onPick={(abbr) => setRightAbbr(abbr)}
          />
        </section>

        {showRealTrade ? (
          <>
            <section className="section">
              <h2 className="section__title">The Trade</h2>
              <TradeColumns trade={giannisToLakers} />
            </section>

            <section className="section">
              <h2 className="section__title">Verdict</h2>
              <div className="verdicts__grid">
                {verdicts.map((verdict) => (
                  <VerdictCard key={verdict.team} verdict={verdict} />
                ))}
              </div>
            </section>
          </>
        ) : (
          <EmptyTradeState teamA={teamLeft} teamB={teamRight} />
        )}
      </main>
    </div>
  );
}
