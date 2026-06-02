import { describe, it, expect } from 'vitest';
import { playerRegistry, lookupPlayer } from './registry.js';

describe('player registry', () => {
  it('contains players from both fixture teams', () => {
    expect(playerRegistry['giannis-antetokounmpo'].name).toBe('Giannis Antetokounmpo');
    expect(playerRegistry['luka-doncic'].name).toBe('Luka Dončić');
  });

  it('has 41 players total (21 Bucks + 20 Lakers)', () => {
    expect(Object.keys(playerRegistry)).toHaveLength(41);
  });

  it('throws on unknown ID via lookupPlayer', () => {
    expect(() => lookupPlayer('nobody-special')).toThrow(/not in registry/);
  });

  it('lookupPlayer returns the same object as direct registry access', () => {
    expect(lookupPlayer('lebron-james')).toBe(playerRegistry['lebron-james']);
  });
});
