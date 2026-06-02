const VALID_LETTERS = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];

function validateGrade({ letter, score, headline, evidence }) {
  if (!VALID_LETTERS.includes(letter)) {
    throw new Error(`Invalid letter grade: ${letter}`);
  }
  if (typeof score !== 'number' || score < 0 || score > 100) {
    throw new Error('Grade score must be a number between 0 and 100.');
  }
  if (typeof headline !== 'string' || headline.length === 0) {
    throw new Error('Grade requires a non-empty headline.');
  }
  if (evidence !== null && typeof evidence !== 'object') {
    throw new Error('Grade evidence must be an object or null.');
  }
}

export function createCapGrade({ letter, score, headline, evidence = {} }) {
  validateGrade({ letter, score, headline, evidence });
  return { dimension: 'cap', letter, score, headline, evidence };
}

export function createFitGrade({ letter, score, headline, evidence = {} }) {
  validateGrade({ letter, score, headline, evidence });
  return { dimension: 'fit', letter, score, headline, evidence };
}

export function createFutureGrade({ letter, score, headline, evidence = {} }) {
  validateGrade({ letter, score, headline, evidence });
  return { dimension: 'future', letter, score, headline, evidence };
}

export function createOverallGrade({ letter, score, headline, evidence = {} }) {
  validateGrade({ letter, score, headline, evidence });
  return { dimension: 'overall', letter, score, headline, evidence };
}
