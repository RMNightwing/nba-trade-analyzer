import { describe, it, expect } from 'vitest';
import { createGoal, Goals } from './goal.js';

describe('createGoal', () => {
  it('accepts each defined goal type', () => {
    for (const t of Object.values(Goals)) {
      const g = createGoal({ type: t });
      expect(g.type).toBe(t);
      expect(g.notes).toBe('');
    }
  });

  it('preserves free-text notes', () => {
    const g = createGoal({ type: Goals.REBUILDING, notes: 'must shed long-term money' });
    expect(g.notes).toBe('must shed long-term money');
  });

  it('rejects unknown goal types', () => {
    expect(() => createGoal({ type: 'TANKING' })).toThrow(/Unknown goal type/);
  });
});
