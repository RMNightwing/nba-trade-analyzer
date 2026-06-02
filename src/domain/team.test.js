import { describe, it, expect } from 'vitest';
import { createCapState, createTeamSnapshot } from './team.js';

const sampleCapState = () =>
  createCapState({
    salaryTotal: 178_000_000,
    salaryCap: 154_647_000,
    taxLine: 187_895_000,
    firstApron: 195_945_000,
    secondApron: 207_824_000,
  });

describe('createCapState', () => {
  it('returns the cap structure with defaults', () => {
    const cap = sampleCapState();
    expect(cap.salaryTotal).toBeGreaterThan(0);
    expect(cap.hardCapStatus).toBeNull();
    expect(cap.tradeExceptions).toEqual([]);
  });

  it('throws when any required cap number is missing', () => {
    expect(() =>
      createCapState({
        salaryTotal: 100,
        salaryCap: 200,
        taxLine: 300,
        firstApron: 400,
        secondApron: 'oops',
      })
    ).toThrow(/numeric/);
  });
});

describe('createTeamSnapshot', () => {
  it('returns a snapshot with rosterPlayerIds and the full optional field set', () => {
    const t = createTeamSnapshot({
      abbreviation: 'TST',
      name: 'Test Team',
      rosterPlayerIds: ['p1', 'p2'],
      capState: sampleCapState(),
      record: { wins: 50, losses: 32 },
      mode: 'CONTENDING',
      headCoach: 'Coach McCoach',
    });
    expect(t.abbreviation).toBe('TST');
    expect(t.rosterPlayerIds).toEqual(['p1', 'p2']);
    expect(t.record.wins).toBe(50);
    expect(t.mode).toBe('CONTENDING');
    expect(t.headCoach).toBe('Coach McCoach');
    expect(t.draftPicks).toEqual([]);
    expect(t.modeNote).toBeNull();
  });

  it('allows capState to be null (pending cap engine)', () => {
    const t = createTeamSnapshot({
      abbreviation: 'TST',
      name: 'Test Team',
      rosterPlayerIds: ['p1'],
    });
    expect(t.capState).toBeNull();
  });

  it('preserves a modeNote for ambiguous cases', () => {
    const t = createTeamSnapshot({
      abbreviation: 'TST',
      name: 'Test Team',
      rosterPlayerIds: ['p1'],
      mode: 'REBUILDING',
      modeNote: 'ambiguous — record vs. ownership intent',
    });
    expect(t.modeNote).toMatch(/ambiguous/);
  });

  it('throws when rosterPlayerIds is empty', () => {
    expect(() =>
      createTeamSnapshot({
        abbreviation: 'TST',
        name: 'Test',
        rosterPlayerIds: [],
      })
    ).toThrow(/non-empty rosterPlayerIds/);
  });

  it('throws on malformed record', () => {
    expect(() =>
      createTeamSnapshot({
        abbreviation: 'TST',
        name: 'Test',
        rosterPlayerIds: ['p1'],
        record: { wins: 'fifty', losses: 32 },
      })
    ).toThrow(/wins: number, losses: number/);
  });
});
