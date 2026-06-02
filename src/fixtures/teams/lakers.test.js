import { describe, it, expect } from 'vitest';
import { lakersPlayers, lakersSnapshot } from './lakers.js';
import { Goals } from '../../domain/goal.js';

describe('Lakers fixture', () => {
  it('has 20 players', () => {
    expect(lakersPlayers).toHaveLength(20);
  });

  it('snapshot references the same players by ID, in order', () => {
    expect(lakersSnapshot.rosterPlayerIds).toHaveLength(20);
    expect(lakersSnapshot.rosterPlayerIds[0]).toBe('luka-doncic');
    expect(lakersSnapshot.rosterPlayerIds).toEqual(lakersPlayers.map((p) => p.id));
  });

  it('records the team identity correctly', () => {
    expect(lakersSnapshot.abbreviation).toBe('LAL');
    expect(lakersSnapshot.name).toBe('Los Angeles Lakers');
    expect(lakersSnapshot.headCoach).toBe('JJ Redick');
    expect(lakersSnapshot.record).toEqual({ wins: 53, losses: 29 });
  });

  it('marks the Lakers mode as CONTENDING with no ambiguity note', () => {
    expect(lakersSnapshot.mode).toBe(Goals.CONTENDING);
    expect(lakersSnapshot.modeNote).toBeNull();
  });

  it('tags Vanderbilt with the new DEFENSIVE_FORWARD archetype', () => {
    const vando = lakersPlayers.find((p) => p.id === 'jarred-vanderbilt');
    expect(vando.archetypes).toEqual(['DEFENSIVE_FORWARD']);
  });

  it('leaves LeBron deliberately under-tagged (single archetype + TODO comment in source)', () => {
    const lebron = lakersPlayers.find((p) => p.id === 'lebron-james');
    expect(lebron.archetypes).toEqual(['SECONDARY_CREATOR']);
  });

  it('marks Luka and LeBron salaries as approximate', () => {
    const luka = lakersPlayers.find((p) => p.id === 'luka-doncic');
    const lebron = lakersPlayers.find((p) => p.id === 'lebron-james');
    expect(luka.contract.salaries[0].confidence).toBe('approximate');
    expect(lebron.contract.salaries[0].confidence).toBe('approximate');
  });
});
