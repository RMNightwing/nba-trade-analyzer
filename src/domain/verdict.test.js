import { describe, it, expect } from 'vitest';
import { createTeamVerdict, createTradeAnalysis, WinLoss } from './verdict.js';
import { createGoal, Goals } from './goal.js';
import { createTrade, createAssetFlow } from './trade.js';
import { createPlayer, Positions, Archetypes } from './player.js';
import { createContract } from './contract.js';

const stubTrade = () =>
  createTrade({
    teams: ['MIL', 'GSW'],
    assetFlows: [
      createAssetFlow({
        asset: createPlayer({
          id: 'p',
          name: 'P',
          team: 'MIL',
          position: Positions.SF,
          age: 30,
          archetypes: [Archetypes.SCORING_WING],
          valueComposite: 90,
          contract: createContract({ salaries: [{ year: 2026, amount: 50_000_000 }] }),
        }),
        fromTeam: 'MIL',
        toTeam: 'GSW',
      }),
      createAssetFlow({
        asset: createPlayer({
          id: 'q',
          name: 'Q',
          team: 'GSW',
          position: Positions.SF,
          age: 28,
          archetypes: [Archetypes.THREE_AND_D_WING],
          valueComposite: 60,
          contract: createContract({ salaries: [{ year: 2026, amount: 25_000_000 }] }),
        }),
        fromTeam: 'GSW',
        toTeam: 'MIL',
      }),
    ],
  });

describe('createTeamVerdict', () => {
  it('returns a verdict with null grades when none provided', () => {
    const v = createTeamVerdict({
      team: 'MIL',
      goalUsed: createGoal({ type: Goals.REBUILDING }),
    });
    expect(v.team).toBe('MIL');
    expect(v.overallGrade).toBeNull();
    expect(v.capGrade).toBeNull();
    expect(v.winLoss).toBeNull();
    expect(v.keyDrivers).toEqual([]);
  });

  it('rejects unknown winLoss values', () => {
    expect(() =>
      createTeamVerdict({
        team: 'MIL',
        goalUsed: createGoal({ type: Goals.REBUILDING }),
        winLoss: 'MAYBE',
      })
    ).toThrow(/Invalid winLoss/);
  });
});

describe('createTradeAnalysis', () => {
  it('defaults to legal:true, empty verdicts and commentary', () => {
    const a = createTradeAnalysis({ trade: stubTrade() });
    expect(a.legal).toBe(true);
    expect(a.teamVerdicts).toEqual([]);
    expect(a.commentary).toEqual([]);
  });

  it('preserves a verdict list and commentary entries', () => {
    const v = createTeamVerdict({
      team: 'MIL',
      goalUsed: createGoal({ type: Goals.REBUILDING }),
      winLoss: WinLoss.WIN,
    });
    const a = createTradeAnalysis({
      trade: stubTrade(),
      teamVerdicts: [v],
      commentary: [{ persona: 'Windhorst-style', text: 'Listen…' }],
    });
    expect(a.teamVerdicts).toHaveLength(1);
    expect(a.commentary[0].persona).toBe('Windhorst-style');
  });
});
