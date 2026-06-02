import { describe, it, expect } from 'vitest';
import { createAssetFlow, createTrade } from './trade.js';
import { createPlayer, Positions, Archetypes } from './player.js';
import { createContract } from './contract.js';
import { createDraftPick } from './draftPick.js';

const samplePlayer = (id, name, team) =>
  createPlayer({
    id,
    name,
    team,
    position: Positions.SF,
    age: 28,
    archetypes: [Archetypes.SCORING_WING],
    valueComposite: 70,
    contract: createContract({ salaries: [{ year: 2026, amount: 30_000_000 }] }),
  });

describe('createAssetFlow', () => {
  it('builds a player flow between two teams', () => {
    const flow = createAssetFlow({
      asset: samplePlayer('a', 'A', 'MIL'),
      fromTeam: 'MIL',
      toTeam: 'GSW',
    });
    expect(flow.asset.kind).toBe('player');
    expect(flow.fromTeam).toBe('MIL');
    expect(flow.toTeam).toBe('GSW');
  });

  it('throws when from and to are the same', () => {
    expect(() =>
      createAssetFlow({
        asset: samplePlayer('a', 'A', 'MIL'),
        fromTeam: 'MIL',
        toTeam: 'MIL',
      })
    ).toThrow(/must differ/);
  });
});

describe('createTrade', () => {
  it('builds a two-team trade with players and a pick', () => {
    const trade = createTrade({
      teams: ['MIL', 'GSW'],
      assetFlows: [
        createAssetFlow({
          asset: samplePlayer('giannis', 'Giannis A.', 'MIL'),
          fromTeam: 'MIL',
          toTeam: 'GSW',
        }),
        createAssetFlow({
          asset: samplePlayer('wig', 'A. Wiggins', 'GSW'),
          fromTeam: 'GSW',
          toTeam: 'MIL',
        }),
        createAssetFlow({
          asset: createDraftPick({ year: 2028, originalTeam: 'GSW', ownedBy: 'GSW' }),
          fromTeam: 'GSW',
          toTeam: 'MIL',
        }),
      ],
    });
    expect(trade.teams).toEqual(['MIL', 'GSW']);
    expect(trade.assetFlows).toHaveLength(3);
  });

  it('throws when a flow references a team not in the trade', () => {
    expect(() =>
      createTrade({
        teams: ['MIL', 'GSW'],
        assetFlows: [
          createAssetFlow({
            asset: samplePlayer('a', 'A', 'MIL'),
            fromTeam: 'MIL',
            toTeam: 'LAL',
          }),
        ],
      })
    ).toThrow(/not in trade.teams/);
  });

  it('requires at least 2 teams', () => {
    expect(() => createTrade({ teams: ['MIL'], assetFlows: [] })).toThrow(/at least 2/);
  });
});
