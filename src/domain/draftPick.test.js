import { describe, it, expect } from 'vitest';
import { createDraftPick } from './draftPick.js';

describe('createDraftPick', () => {
  it('builds a basic first-round pick', () => {
    const p = createDraftPick({
      year: 2027,
      originalTeam: 'MIL',
      ownedBy: 'NOP',
    });
    expect(p.kind).toBe('pick');
    expect(p.round).toBe(1);
    expect(p.originalTeam).toBe('MIL');
    expect(p.ownedBy).toBe('NOP');
    expect(p.protections).toBeNull();
    expect(p.swapRights).toBe(false);
  });

  it('supports second-round picks with swap rights', () => {
    const p = createDraftPick({
      year: 2028,
      round: 2,
      originalTeam: 'GSW',
      ownedBy: 'MIL',
      swapRights: true,
    });
    expect(p.round).toBe(2);
    expect(p.swapRights).toBe(true);
  });

  it('rejects invalid round numbers', () => {
    expect(() =>
      createDraftPick({ year: 2027, round: 3, originalTeam: 'MIL', ownedBy: 'MIL' })
    ).toThrow(/round must be 1 or 2/);
  });
});
