import { describe, it, expect } from 'vitest';
import { bucksPlayers, bucksSnapshot } from './bucks.js';
import { Goals } from '../../domain/goal.js';

describe('Bucks fixture', () => {
  it('has 21 players', () => {
    expect(bucksPlayers).toHaveLength(21);
  });

  it('snapshot references the same players by ID, in order', () => {
    expect(bucksSnapshot.rosterPlayerIds).toHaveLength(21);
    expect(bucksSnapshot.rosterPlayerIds[0]).toBe('giannis-antetokounmpo');
    expect(bucksSnapshot.rosterPlayerIds).toEqual(bucksPlayers.map((p) => p.id));
  });

  it('records the team identity correctly', () => {
    expect(bucksSnapshot.abbreviation).toBe('MIL');
    expect(bucksSnapshot.name).toBe('Milwaukee Bucks');
    expect(bucksSnapshot.headCoach).toBe('Doc Rivers');
    expect(bucksSnapshot.record).toEqual({ wins: 32, losses: 50 });
  });

  it('marks the Bucks mode as REBUILDING with the ownership-intent note', () => {
    expect(bucksSnapshot.mode).toBe(Goals.REBUILDING);
    expect(bucksSnapshot.modeNote).toMatch(/REBUILDING posture/);
  });

  it('leaves capState and draftPicks as TODO', () => {
    expect(bucksSnapshot.capState).toBeNull();
    expect(bucksSnapshot.draftPicks).toEqual([]);
  });

  it('marks Giannis salary as known and TODO salaries as unknown', () => {
    const giannis = bucksPlayers.find((p) => p.id === 'giannis-antetokounmpo');
    expect(giannis.contract.salaries[0].confidence).toBe('known');
    expect(giannis.contract.salaries[0].amount).toBe(54_100_000);

    const cormac = bucksPlayers.find((p) => p.id === 'cormac-ryan');
    expect(cormac.contract.salaries[0].confidence).toBe('unknown');
    expect(cormac.contract.salaries[0].amount).toBe(0);
  });

  it('flags Giannis and Turner as multi-archetype players', () => {
    const giannis = bucksPlayers.find((p) => p.id === 'giannis-antetokounmpo');
    expect(giannis.archetypes).toEqual(['PRIMARY_CREATOR', 'RIM_PROTECTOR']);

    const turner = bucksPlayers.find((p) => p.id === 'myles-turner');
    expect(turner.archetypes).toEqual(['FLOOR_SPACING_BIG', 'RIM_PROTECTOR']);
  });
});
