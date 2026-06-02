import { describe, it, expect } from 'vitest';
import { formatTradeAnalysis, formatTeamSnapshot, formatSalary } from './console.js';
import { createTradeAnalysis, createTeamVerdict } from '../domain/verdict.js';
import { createTrade, createAssetFlow } from '../domain/trade.js';
import { createPlayer, Positions, Archetypes } from '../domain/player.js';
import { createContract } from '../domain/contract.js';
import { createDraftPick } from '../domain/draftPick.js';
import { createGoal, Goals } from '../domain/goal.js';
import { createTeamSnapshot } from '../domain/team.js';
import { createCapGrade, createFitGrade, createFutureGrade, createOverallGrade } from '../domain/grades.js';
import { WinLoss } from '../domain/verdict.js';

const player = (id, name, team, archetypes = [Archetypes.SCORING_WING]) =>
  createPlayer({
    id,
    name,
    team,
    position: Positions.SF,
    age: 28,
    archetypes,
    valueComposite: 75,
    contract: createContract({ salaries: [{ year: 2026, amount: 30_000_000, confidence: 'known' }] }),
  });

const sampleTrade = () =>
  createTrade({
    teams: ['MIL', 'GSW'],
    assetFlows: [
      createAssetFlow({ asset: player('giannis', 'Giannis A.', 'MIL'), fromTeam: 'MIL', toTeam: 'GSW' }),
      createAssetFlow({ asset: player('wig', 'A. Wiggins', 'GSW'), fromTeam: 'GSW', toTeam: 'MIL' }),
      createAssetFlow({
        asset: createDraftPick({ year: 2028, originalTeam: 'GSW', ownedBy: 'GSW' }),
        fromTeam: 'GSW',
        toTeam: 'MIL',
      }),
      createAssetFlow({
        asset: createDraftPick({
          year: 2027,
          originalTeam: 'MIL',
          ownedBy: 'MIL',
          protections: { topProtected: 3 },
        }),
        fromTeam: 'MIL',
        toTeam: 'GSW',
      }),
    ],
  });

describe('formatSalary', () => {
  it('formats known salaries with $', () => {
    expect(formatSalary(54_100_000, 'known')).toBe('$54.1M');
  });

  it('formats approximate salaries with ~$', () => {
    expect(formatSalary(11_000_000, 'approximate')).toBe('~$11.0M');
  });

  it('renders TODO for unknown or zero salaries', () => {
    expect(formatSalary(0, 'unknown')).toBe('(TODO)');
    expect(formatSalary(0, 'known')).toBe('(TODO)');
  });
});

describe('formatTradeAnalysis', () => {
  it('renders an unscored analysis with placeholders and protections', () => {
    const a = createTradeAnalysis({ trade: sampleTrade() });
    const out = formatTradeAnalysis(a);
    expect(out).toContain('=== Trade Analysis ===');
    expect(out).toContain('MIL → GSW:');
    expect(out).toContain('- Giannis A.');
    expect(out).toContain('- 2027 1st from MIL (top-3 protected)');
    expect(out).toContain('GSW → MIL:');
    expect(out).toContain('- 2028 1st from GSW');
    expect(out).toContain('scoring not implemented');
    expect(out).toContain('(none yet)');
  });

  it('renders a fully-scored verdict with grades', () => {
    const v = createTeamVerdict({
      team: 'MIL',
      goalUsed: createGoal({ type: Goals.REBUILDING }),
      winLoss: WinLoss.WIN,
      overallGrade: createOverallGrade({ letter: 'A-', score: 90, headline: 'strong rebuild move' }),
      capGrade: createCapGrade({ letter: 'A', score: 95, headline: 'cap relief 2027+' }),
      fitGrade: createFitGrade({ letter: 'B', score: 82, headline: 'young pieces fit timeline' }),
      futureGrade: createFutureGrade({ letter: 'A+', score: 97, headline: 'three future firsts' }),
      keyDrivers: ['three future firsts', 'sheds long-term salary'],
    });
    const a = createTradeAnalysis({ trade: sampleTrade(), teamVerdicts: [v] });
    const out = formatTradeAnalysis(a);
    expect(out).toContain('MIL  (goal: REBUILDING)');
    expect(out).toContain('Overall: A-');
    expect(out).toContain('Cap:     A');
    expect(out).toContain('Win/Loss: WIN');
    expect(out).toContain('Key drivers: three future firsts; sheds long-term salary');
  });
});

describe('formatTeamSnapshot', () => {
  it('shows a single-archetype player without the +N suffix', () => {
    const p = player('test-p', 'Test Player', 'TST', [Archetypes.SCORING_WING]);
    const snapshot = createTeamSnapshot({
      abbreviation: 'TST',
      name: 'Test Team',
      rosterPlayerIds: ['test-p'],
      record: { wins: 50, losses: 32 },
      mode: 'CONTENDING',
      headCoach: 'Test Coach',
    });
    const out = formatTeamSnapshot(snapshot, { 'test-p': p });
    expect(out).toContain('=== Test Team (TST) ===');
    expect(out).toContain('Test Player');
    expect(out).toContain('SCORING_WING');
    expect(out).not.toContain('SCORING_WING +');
    expect(out).toContain('(TODO — pending cap engine)');
  });

  it('shows a multi-archetype player as "FIRST +N" by default', () => {
    const turner = player('turner-like', 'Two-Way Big', 'TST', [
      Archetypes.FLOOR_SPACING_BIG,
      Archetypes.RIM_PROTECTOR,
    ]);
    const snapshot = createTeamSnapshot({
      abbreviation: 'TST',
      name: 'Test Team',
      rosterPlayerIds: ['turner-like'],
    });
    const out = formatTeamSnapshot(snapshot, { 'turner-like': turner });
    expect(out).toContain('FLOOR_SPACING_BIG +1');
  });

  it('shows the full archetype list when verbose: true', () => {
    const turner = player('turner-like', 'Two-Way Big', 'TST', [
      Archetypes.FLOOR_SPACING_BIG,
      Archetypes.RIM_PROTECTOR,
    ]);
    const snapshot = createTeamSnapshot({
      abbreviation: 'TST',
      name: 'Test Team',
      rosterPlayerIds: ['turner-like'],
    });
    const out = formatTeamSnapshot(snapshot, { 'turner-like': turner }, { verbose: true });
    expect(out).toContain('FLOOR_SPACING_BIG, RIM_PROTECTOR');
    expect(out).not.toContain('+1');
  });

  it('shows mode note and (TODO) for unknown salaries', () => {
    const p = createPlayer({
      id: 'mystery',
      name: 'Mystery Bench Guy',
      team: 'TST',
      position: Positions.SG,
      age: 24,
      archetypes: [Archetypes.CONNECTOR],
      valueComposite: 40,
      contract: createContract({
        salaries: [{ year: 2026, amount: 0, confidence: 'unknown' }],
      }),
    });
    const snapshot = createTeamSnapshot({
      abbreviation: 'TST',
      name: 'Test Team',
      rosterPlayerIds: ['mystery'],
      mode: 'REBUILDING',
      modeNote: 'ambiguous — record vs. ownership intent',
    });
    const out = formatTeamSnapshot(snapshot, { mystery: p });
    expect(out).toContain('Mode note:   ambiguous');
    expect(out).toContain('(TODO)');
  });
});
