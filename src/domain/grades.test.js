import { describe, it, expect } from 'vitest';
import {
  createCapGrade,
  createFitGrade,
  createFutureGrade,
  createOverallGrade,
  tierForScore,
  TIERS,
} from './grades.js';

describe('tierForScore', () => {
  it('maps the locked Giannis anchor (77) to Strong', () => {
    expect(tierForScore(77)).toBe('Strong');
  });

  it('locks the band edges (words replace the old letter bands)', () => {
    expect(tierForScore(100)).toBe('Franchise Win');
    expect(tierForScore(85)).toBe('Franchise Win');
    expect(tierForScore(84)).toBe('Strong');
    expect(tierForScore(75)).toBe('Strong');
    expect(tierForScore(74)).toBe('Solid');
    expect(tierForScore(70)).toBe('Solid');
    expect(tierForScore(69)).toBe('Lateral');
    expect(tierForScore(55)).toBe('Lateral');
    expect(tierForScore(54)).toBe('Negative');
    expect(tierForScore(40)).toBe('Negative');
    expect(tierForScore(39)).toBe('Damaging');
    expect(tierForScore(0)).toBe('Damaging');
  });

  it('rejects scores outside 0–100', () => {
    expect(() => tierForScore(101)).toThrow(/between 0 and 100/);
    expect(() => tierForScore(-1)).toThrow(/between 0 and 100/);
    expect(() => tierForScore('77')).toThrow(/between 0 and 100/);
  });

  it('covers the whole 0–100 range with no gaps (single source of truth)', () => {
    for (let s = 0; s <= 100; s++) {
      expect(() => tierForScore(s)).not.toThrow();
    }
    // bands are contiguous and non-overlapping
    expect(TIERS).toHaveLength(6);
  });
});

describe('grade factories', () => {
  it('produce dimension-tagged grade objects with a tier derived from score', () => {
    const cap = createCapGrade({ score: 86, headline: 'tight but legal' });
    const fit = createFitGrade({ score: 90, headline: 'fills wing gap' });
    const future = createFutureGrade({ score: 93, headline: 'strong rebuild assets' });
    const overall = createOverallGrade({ score: 77, headline: 'wins for both sides' });

    expect(cap.dimension).toBe('cap');
    expect(fit.dimension).toBe('fit');
    expect(future.dimension).toBe('future');
    expect(overall.dimension).toBe('overall');

    // tier is mechanical — derived from the score, never supplied by the caller.
    expect(cap.tier).toBe('Franchise Win'); // 86
    expect(overall.tier).toBe('Strong'); // 77
  });

  it('reject scores outside 0-100', () => {
    expect(() => createFitGrade({ score: 101, headline: 'x' })).toThrow(/0 and 100/);
  });

  it('require a non-empty headline', () => {
    expect(() => createFutureGrade({ score: 80, headline: '' })).toThrow(/non-empty headline/);
  });
});
