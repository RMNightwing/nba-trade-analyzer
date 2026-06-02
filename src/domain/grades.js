// Grading output model: a 0–100 score plus a domain-meaningful TIER word.
//
// We dropped letter grades (A+/B-/…) entirely — the academic scale carried
// baggage that fought the score's domain meaning (a "B+" implies "good
// student," but a 77 here means "good rebuild haul for THIS team's goal").
// The tier is a mechanical property of the SCORE BAND: same band boundaries as
// the rubric, just labeled with words. See decisions.md and
// docs/design/scoring-philosophy-future-rebuilding.md.
//
// SINGLE SOURCE OF TRUTH for the word↔band mapping. Anything that needs a tier
// word — the real scorer, the console formatter, the frontend stub — derives it
// from here via tierForScore(). Do not scatter the band edges anywhere else.
export const TIERS = Object.freeze([
  { min: 85, max: 100, word: 'Franchise Win' },
  { min: 75, max: 84, word: 'Strong' },
  { min: 70, max: 74, word: 'Solid' },
  { min: 55, max: 69, word: 'Lateral' },
  { min: 40, max: 54, word: 'Negative' },
  { min: 0, max: 39, word: 'Damaging' },
]);

// Mechanical score → tier word. Cheap, deterministic, always available. The
// bands cover 0–100 with no gaps, so a valid score always resolves to a tier.
export function tierForScore(score) {
  if (typeof score !== 'number' || Number.isNaN(score) || score < 0 || score > 100) {
    throw new Error('Score must be a number between 0 and 100.');
  }
  return TIERS.find((t) => score >= t.min && score <= t.max).word;
}

function validateGrade({ score, headline, evidence }) {
  if (typeof score !== 'number' || Number.isNaN(score) || score < 0 || score > 100) {
    throw new Error('Grade score must be a number between 0 and 100.');
  }
  if (typeof headline !== 'string' || headline.length === 0) {
    throw new Error('Grade requires a non-empty headline.');
  }
  if (evidence !== null && typeof evidence !== 'object') {
    throw new Error('Grade evidence must be an object or null.');
  }
}

// Each factory stores the derived `tier` (mechanical) alongside the score. The
// trade-specific prose (one-line verdict, longer description) is NOT a grade
// concern — it lives in the verdict/stub layer, produced by the scorer.
export function createCapGrade({ score, headline, evidence = {} }) {
  validateGrade({ score, headline, evidence });
  return { dimension: 'cap', tier: tierForScore(score), score, headline, evidence };
}

export function createFitGrade({ score, headline, evidence = {} }) {
  validateGrade({ score, headline, evidence });
  return { dimension: 'fit', tier: tierForScore(score), score, headline, evidence };
}

export function createFutureGrade({ score, headline, evidence = {} }) {
  validateGrade({ score, headline, evidence });
  return { dimension: 'future', tier: tierForScore(score), score, headline, evidence };
}

export function createOverallGrade({ score, headline, evidence = {} }) {
  validateGrade({ score, headline, evidence });
  return { dimension: 'overall', tier: tierForScore(score), score, headline, evidence };
}
