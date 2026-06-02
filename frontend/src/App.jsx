// The frontend reads the trade straight from the existing /src fixtures via
// Vite — no backend server, no re-declared trade data. The verdict comes from
// the local gradeTradeStub (a stand-in for the real REBUILDING scorer).
import { useState, useEffect } from "react";
import { giannisToLakers } from "../../src/fixtures/index.js";
import { gradeTradeStub } from "./gradeTradeStub.js";
import TradeColumns from "./components/TradeColumns.jsx";
import VerdictCard from "./components/VerdictCard.jsx";

export default function App() {
  const trade = giannisToLakers;
  const verdicts = gradeTradeStub();

  // Theme is React state only — no localStorage persistence this slice. The
  // whole palette lives in CSS variables; flipping data-theme on the document
  // root swaps the [data-theme="dark"] block in for :root.
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <main className="app">
      <div className="app__topbar">
        <button
          type="button"
          className="theme-toggle"
          aria-pressed={theme === "dark"}
          onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
        >
          {theme === "light" ? "🌙 Dark" : "☀ Light"}
        </button>
      </div>

      <header className="app__header">
        <h1 className="app__title">
          Giannis <span className="app__arrow">→</span> Lakers
        </h1>
        <p className="app__subtitle">
          A trade is “good” when each team meets <em>its own</em> goal — not when
          it’s fair. ESPN’s Trade Machine only checks legality; this shows the
          read.
        </p>
      </header>

      <TradeColumns trade={trade} />

      <section className="verdicts">
        <h2 className="verdicts__title">Verdict</h2>
        <div className="verdicts__grid">
          {verdicts.map((verdict) => (
            <VerdictCard key={verdict.team} verdict={verdict} />
          ))}
        </div>
      </section>
    </main>
  );
}
