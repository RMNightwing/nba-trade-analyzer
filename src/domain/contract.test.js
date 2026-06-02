import { describe, it, expect } from 'vitest';
import { createContract, OptionTypes, SalaryConfidences } from './contract.js';

describe('createContract', () => {
  it('returns a well-formed contract', () => {
    const c = createContract({
      salaries: [
        { year: 2026, amount: 50_000_000 },
        { year: 2027, amount: 54_000_000 },
      ],
      options: [{ type: OptionTypes.PLAYER, year: 2028 }],
      noTradeClause: true,
      tradeKicker: 15,
    });
    expect(c.salaries).toHaveLength(2);
    expect(c.options[0].type).toBe('PLAYER');
    expect(c.noTradeClause).toBe(true);
    expect(c.tradeKicker).toBe(15);
  });

  it('throws when salaries is empty', () => {
    expect(() => createContract({ salaries: [] })).toThrow(/at least one salary/);
  });

  it('throws on malformed salary entries', () => {
    expect(() =>
      createContract({ salaries: [{ year: '2026', amount: 10 }] })
    ).toThrow(/year: number, amount: number/);
  });

  it('throws on unknown option types', () => {
    expect(() =>
      createContract({
        salaries: [{ year: 2026, amount: 10 }],
        options: [{ type: 'FOO', year: 2027 }],
      })
    ).toThrow(/Unknown option type/);
  });

  it('defaults missing confidence to "known"', () => {
    const c = createContract({ salaries: [{ year: 2026, amount: 1 }] });
    expect(c.salaries[0].confidence).toBe('known');
  });

  it('accepts explicit confidence values on salary entries', () => {
    const c = createContract({
      salaries: [
        { year: 2026, amount: 1_000_000, confidence: SalaryConfidences.APPROXIMATE },
        { year: 2027, amount: 0, confidence: SalaryConfidences.UNKNOWN },
      ],
    });
    expect(c.salaries[0].confidence).toBe('approximate');
    expect(c.salaries[1].confidence).toBe('unknown');
  });

  it('rejects invalid confidence values', () => {
    expect(() =>
      createContract({ salaries: [{ year: 2026, amount: 1, confidence: 'maybe' }] })
    ).toThrow(/Invalid salary confidence/);
  });
});
