import { describe, it, expect } from 'vitest';
import { giannisToLakers } from './giannis-to-lakers.js';

describe('Giannis-to-Lakers trade fixture', () => {
  it('moves Giannis from MIL to LAL', () => {
    const flow = giannisToLakers.assetFlows.find(
      (f) => f.asset.kind === 'player' && f.asset.id === 'giannis-antetokounmpo'
    );
    expect(flow).toBeDefined();
    expect(flow.fromTeam).toBe('MIL');
    expect(flow.toTeam).toBe('LAL');
  });

  it('sends 4 LAL rotation players back to MIL', () => {
    const lalPlayersOut = giannisToLakers.assetFlows.filter(
      (f) => f.asset.kind === 'player' && f.fromTeam === 'LAL'
    );
    expect(lalPlayersOut).toHaveLength(4);
    const names = lalPlayersOut.map((f) => f.asset.id).sort();
    expect(names).toEqual([
      'austin-reaves',
      'dalton-knecht',
      'jarred-vanderbilt',
      'rui-hachimura',
    ]);
  });

  it('sends 4 LAL future firsts to MIL (3 unprotected + 1 swap)', () => {
    const lalPicksOut = giannisToLakers.assetFlows.filter(
      (f) => f.asset.kind === 'pick' && f.fromTeam === 'LAL'
    );
    expect(lalPicksOut).toHaveLength(4);

    const unprotected = lalPicksOut.filter(
      (f) => !f.asset.swapRights && f.asset.protections === null
    );
    expect(unprotected).toHaveLength(3);
    expect(unprotected.map((f) => f.asset.year).sort()).toEqual([2027, 2029, 2031]);

    const swap = lalPicksOut.find((f) => f.asset.swapRights);
    expect(swap.asset.year).toBe(2032);
  });

  it('sends a top-3 protected MIL 2027 first back to LAL', () => {
    const milPicksOut = giannisToLakers.assetFlows.filter(
      (f) => f.asset.kind === 'pick' && f.fromTeam === 'MIL'
    );
    expect(milPicksOut).toHaveLength(1);
    expect(milPicksOut[0].asset.year).toBe(2027);
    expect(milPicksOut[0].asset.protections).toEqual({ topProtected: 3 });
  });

  it('has the expected total flow count (1 + 1 + 4 + 4 = 10)', () => {
    expect(giannisToLakers.assetFlows).toHaveLength(10);
  });
});
