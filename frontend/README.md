# NBA Trade Analyzer — Frontend

## What this is

A minimal React UI that renders the existing Giannis→Lakers trade and its
REBUILDING future-grade verdict, with the verdict supplied through the
`src/gradeTradeStub.js` seam.

## Run it

```bash
npm run dev
```

Then open <http://localhost:5173/>.

## What to know before editing

- **Verdict data comes from `src/gradeTradeStub.js`** — a hardcoded stand-in
  that will be replaced by the real REBUILDING scorer once Q3 (the pick value
  table) lands. It is the seam, not real scoring logic.
- **The four-component breakdown is the visual center of the verdict card by
  design** — it makes the analyzer's read legible and is the differentiator vs.
  ESPN's Trade Machine. It is not a debug panel; don't bury it.
- **The Lakers card is intentionally quieter** because fit-grade is a later
  slice. The asymmetry signals "one side graded, one side not yet."
