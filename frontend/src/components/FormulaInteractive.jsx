// Interactive formula: every number is a hoverable token whose tooltip says
// what the number means (weight, score, penalty, total). The math is
// derived from the verdict's structured `components` + `penalty` rather than
// the pre-rendered string, so it stays in sync if the rubric tunes.
//
// Tokens cascade in left-to-right on mount; hover (or keyboard focus) reveals
// the meaning. Color hover-shift uses the card's --team-primary so the
// section feels like the team.
function fmt(n) {
  // Drop trailing zeros so 0.30 → "0.3" doesn't surprise — but keep 0.45 etc.
  // Match the existing display: weights as 0.45 / 0.30 / 0.25, scores integer.
  if (Number.isInteger(n)) return String(n);
  return n.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
}

function buildTokens(components, penalty, overallScore) {
  const tokens = [];
  let key = 0;

  components.forEach((c, i) => {
    if (i > 0) tokens.push({ kind: "op", text: "+", key: key++ });
    tokens.push({
      kind: "val",
      text: fmt(c.weight),
      label: `${c.label} — weight`,
      key: key++,
    });
    tokens.push({ kind: "op", text: "×", key: key++ });
    tokens.push({
      kind: "val",
      text: fmt(c.score),
      label: `${c.label} — score`,
      key: key++,
    });
  });

  // Penalty (subtractive). Even when 0, render it so the structure of the
  // formula is honest about the bad-money term.
  tokens.push({ kind: "op", text: "−", key: key++ });
  tokens.push({
    kind: "val",
    text: fmt(penalty.score),
    label: "Bad-money penalty",
    key: key++,
  });

  tokens.push({ kind: "op", text: "=", key: key++ });
  tokens.push({
    kind: "val",
    text: fmt(overallScore),
    label: "Overall score",
    key: key++,
    isResult: true,
  });

  return tokens;
}

export default function FormulaInteractive({ components, penalty, overallScore }) {
  const tokens = buildTokens(components, penalty, overallScore);

  return (
    <div className="formula" aria-label="Score formula, hover any number for its meaning">
      {tokens.map((t, i) => {
        const delay = `${i * 45}ms`;
        if (t.kind === "op") {
          return (
            <span
              key={t.key}
              className="formula__op"
              style={{ animationDelay: delay }}
              aria-hidden="true"
            >
              {t.text}
            </span>
          );
        }
        return (
          <span
            key={t.key}
            className={`formula__val ${t.isResult ? "formula__val--result" : ""}`}
            style={{ animationDelay: delay }}
            tabIndex={0}
            data-label={t.label}
            title={t.label}
          >
            {t.text}
          </span>
        );
      })}
    </div>
  );
}
