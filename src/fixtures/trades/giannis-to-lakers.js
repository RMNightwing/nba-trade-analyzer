import {
  createTrade,
  createAssetFlow,
  createDraftPick,
} from '../../domain/index.js';
import { playerRegistry } from '../teams/registry.js';

// TODO(cap-engine): this trade has NO legality result. When wrapped in a
// TradeAnalysis, "Legal: yes" comes from the `legal = true` default in
// createTradeAnalysis — it is a placeholder, not a computed apron/CBA pass.
//
// PLACEHOLDER pick structure: real LAL/MIL pick ownership not yet researched.
// Tune when accurate data arrives. The shape models the "max-LAL package for an
// MVP" historical pattern (3-4 unprotected firsts + swap rights + young role players)
// alongside a top-3-protected balance-back pick from MIL.

const giannis = playerRegistry['giannis-antetokounmpo'];
const lalPlayersOut = [
  playerRegistry['austin-reaves'],
  playerRegistry['rui-hachimura'],
  playerRegistry['jarred-vanderbilt'],
  playerRegistry['dalton-knecht'],
];

const milPickOut = createDraftPick({
  year: 2027,
  round: 1,
  originalTeam: 'MIL',
  ownedBy: 'MIL',
  protections: { topProtected: 3 },
  // PLACEHOLDER: balance-back pick; top-3 protection is a common "I'm not handing you a tank"
  // safeguard for star-team rebuilds. Verify real protection when data arrives.
});

const lalPicksOut = [
  createDraftPick({
    year: 2027,
    round: 1,
    originalTeam: 'LAL',
    ownedBy: 'LAL',
    // PLACEHOLDER: real LAL 2027 pick ownership / Stepien-rule eligibility not verified
  }),
  createDraftPick({
    year: 2029,
    round: 1,
    originalTeam: 'LAL',
    ownedBy: 'LAL',
    // PLACEHOLDER
  }),
  createDraftPick({
    year: 2031,
    round: 1,
    originalTeam: 'LAL',
    ownedBy: 'LAL',
    // PLACEHOLDER
  }),
  createDraftPick({
    year: 2032,
    round: 1,
    originalTeam: 'LAL',
    ownedBy: 'LAL',
    swapRights: true,
    // PLACEHOLDER: represents LAL conveying swap rights on its 2032 first
  }),
];

export const giannisToLakers = createTrade({
  teams: ['MIL', 'LAL'],
  assetFlows: [
    createAssetFlow({ asset: giannis, fromTeam: 'MIL', toTeam: 'LAL' }),
    createAssetFlow({ asset: milPickOut, fromTeam: 'MIL', toTeam: 'LAL' }),
    ...lalPlayersOut.map((p) =>
      createAssetFlow({ asset: p, fromTeam: 'LAL', toTeam: 'MIL' })
    ),
    ...lalPicksOut.map((pick) =>
      createAssetFlow({ asset: pick, fromTeam: 'LAL', toTeam: 'MIL' })
    ),
  ],
});
