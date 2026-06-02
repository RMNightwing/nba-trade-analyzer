import { describe, it, expect } from 'vitest';
import {
  createCapGrade,
  createFitGrade,
  createFutureGrade,
  createOverallGrade,
} from './grades.js';

describe('grade factories', () => {
  it('produce dimension-tagged grade objects', () => {
    const cap = createCapGrade({ letter: 'B+', score: 86, headline: 'tight but legal' });
    const fit = createFitGrade({ letter: 'A-', score: 90, headline: 'fills wing gap' });
    const future = createFutureGrade({ letter: 'A', score: 93, headline: 'strong rebuild assets' });
    const overall = createOverallGrade({ letter: 'A-', score: 90, headline: 'wins for both sides' });
    expect(cap.dimension).toBe('cap');
    expect(fit.dimension).toBe('fit');
    expect(future.dimension).toBe('future');
    expect(overall.dimension).toBe('overall');
  });

  it('reject invalid letter grades', () => {
    expect(() =>
      createCapGrade({ letter: 'Z', score: 50, headline: 'x' })
    ).toThrow(/Invalid letter/);
  });

  it('reject scores outside 0-100', () => {
    expect(() =>
      createFitGrade({ letter: 'A', score: 101, headline: 'x' })
    ).toThrow(/0 and 100/);
  });

  it('require a non-empty headline', () => {
    expect(() =>
      createFutureGrade({ letter: 'A', score: 80, headline: '' })
    ).toThrow(/non-empty headline/);
  });
});
