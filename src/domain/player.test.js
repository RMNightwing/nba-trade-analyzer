import { describe, it, expect } from 'vitest';
import { createPlayer, Positions, Archetypes } from './player.js';
import { createContract } from './contract.js';

const sampleContract = () =>
  createContract({ salaries: [{ year: 2026, amount: 10_000_000 }] });

describe('createPlayer', () => {
  it('returns a well-formed single-archetype player', () => {
    const p = createPlayer({
      id: 'test-1',
      name: 'Test Player',
      team: 'MIL',
      position: Positions.SF,
      age: 28,
      archetypes: [Archetypes.SCORING_WING],
      valueComposite: 72,
      contract: sampleContract(),
    });
    expect(p.kind).toBe('player');
    expect(p.id).toBe('test-1');
    expect(p.position).toBe('SF');
    expect(p.archetypes).toEqual([Archetypes.SCORING_WING]);
    expect(p.valueComposite).toBe(72);
  });

  it('accepts multi-archetype players', () => {
    const p = createPlayer({
      id: 'turner-like',
      name: 'Two-Way Big',
      team: 'TST',
      position: Positions.C,
      age: 29,
      archetypes: [Archetypes.FLOOR_SPACING_BIG, Archetypes.RIM_PROTECTOR],
      valueComposite: 75,
      contract: sampleContract(),
    });
    expect(p.archetypes).toHaveLength(2);
    expect(p.archetypes).toContain(Archetypes.RIM_PROTECTOR);
  });

  it('rejects unknown positions', () => {
    expect(() =>
      createPlayer({
        id: 'x',
        name: 'X',
        team: 'MIL',
        position: 'COMBO',
        age: 25,
        archetypes: [Archetypes.CONNECTOR],
        valueComposite: 50,
        contract: sampleContract(),
      })
    ).toThrow(/Unknown position/);
  });

  it('rejects empty archetypes array', () => {
    expect(() =>
      createPlayer({
        id: 'x',
        name: 'X',
        team: 'MIL',
        position: Positions.PG,
        age: 25,
        archetypes: [],
        valueComposite: 50,
        contract: sampleContract(),
      })
    ).toThrow(/non-empty archetypes/);
  });

  it('rejects unknown archetype values inside the array', () => {
    expect(() =>
      createPlayer({
        id: 'x',
        name: 'X',
        team: 'MIL',
        position: Positions.PG,
        age: 25,
        archetypes: ['NOT_AN_ARCHETYPE'],
        valueComposite: 50,
        contract: sampleContract(),
      })
    ).toThrow(/Unknown archetype/);
  });

  it('exposes DEFENSIVE_FORWARD as a valid archetype', () => {
    const p = createPlayer({
      id: 'vando-like',
      name: 'Defender',
      team: 'TST',
      position: Positions.PF,
      age: 26,
      archetypes: [Archetypes.DEFENSIVE_FORWARD],
      valueComposite: 60,
      contract: sampleContract(),
    });
    expect(p.archetypes).toEqual(['DEFENSIVE_FORWARD']);
  });

  it('rejects valueComposite out of range', () => {
    expect(() =>
      createPlayer({
        id: 'x',
        name: 'X',
        team: 'MIL',
        position: Positions.PG,
        age: 25,
        archetypes: [Archetypes.CONNECTOR],
        valueComposite: 150,
        contract: sampleContract(),
      })
    ).toThrow(/valueComposite/);
  });
});
