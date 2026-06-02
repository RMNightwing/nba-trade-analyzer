export function createAssetFlow({ asset, fromTeam, toTeam }) {
  if (!asset || (asset.kind !== 'player' && asset.kind !== 'pick')) {
    throw new Error('Asset flow requires an asset with kind "player" or "pick".');
  }
  if (!fromTeam) throw new Error('Asset flow requires fromTeam.');
  if (!toTeam) throw new Error('Asset flow requires toTeam.');
  if (fromTeam === toTeam) {
    throw new Error('Asset flow fromTeam and toTeam must differ.');
  }
  return { asset, fromTeam, toTeam };
}

export function createTrade({ teams, assetFlows, conditions = [] }) {
  if (!Array.isArray(teams) || teams.length < 2) {
    throw new Error('Trade requires at least 2 participating teams.');
  }
  if (!Array.isArray(assetFlows) || assetFlows.length === 0) {
    throw new Error('Trade requires at least one asset flow.');
  }
  const teamSet = new Set(teams);
  for (const f of assetFlows) {
    if (!teamSet.has(f.fromTeam) || !teamSet.has(f.toTeam)) {
      throw new Error(`Asset flow references team(s) not in trade.teams: ${f.fromTeam} → ${f.toTeam}`);
    }
  }
  return { teams, assetFlows, conditions };
}
