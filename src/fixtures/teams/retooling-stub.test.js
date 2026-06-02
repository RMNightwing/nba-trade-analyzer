import { describe, it, expect } from 'vitest';
import {
  retoolersPlayers,
  retoolersSnapshot,
  retoolersRegistry,
} from './retooling-stub.js';
import { Goals } from '../../domain/goal.js';

describe('RETOOLING stub fixture', () => {
  it('builds without error and reports the right roster size', () => {
    expect(retoolersPlayers).toHaveLength(10);
    expect(retoolersSnapshot.rosterPlayerIds).toHaveLength(10);
  });

  it('is in RETOOLING mode (the single fixture that exercises this enum value)', () => {
    expect(retoolersSnapshot.mode).toBe(Goals.RETOOLING);
  });

  it('flags itself as a hypothetical via modeNote', () => {
    expect(retoolersSnapshot.modeNote).toMatch(/hypothetical/);
  });

  it('rosterPlayerIds resolve via the local registry', () => {
    for (const id of retoolersSnapshot.rosterPlayerIds) {
      expect(retoolersRegistry[id]).toBeDefined();
    }
  });

  // Acts as the "RETOOLING branch must exist" canary. Once goal-aware future
  // grading lands, the future scorer should accept retoolersSnapshot.mode and
  // produce a grade. If the RETOOLING branch is never implemented, this test
  // will keep proving the fixture is here ready for it.
  it('exposes Goals.RETOOLING as a valid value (canary for goal scorer coverage)', () => {
    expect(Object.values(Goals)).toContain('RETOOLING');
  });
});
