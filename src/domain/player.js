export const Positions = Object.freeze({
  PG: 'PG',
  SG: 'SG',
  SF: 'SF',
  PF: 'PF',
  C: 'C',
});

export const Archetypes = Object.freeze({
  PRIMARY_CREATOR: 'PRIMARY_CREATOR',
  SECONDARY_CREATOR: 'SECONDARY_CREATOR',
  THREE_AND_D_WING: 'THREE_AND_D_WING',
  SCORING_WING: 'SCORING_WING',
  RIM_PROTECTOR: 'RIM_PROTECTOR',
  FLOOR_SPACING_BIG: 'FLOOR_SPACING_BIG',
  PLAYMAKING_BIG: 'PLAYMAKING_BIG',
  CONNECTOR: 'CONNECTOR',
  TABLE_SETTER: 'TABLE_SETTER',
  DEFENSIVE_GUARD: 'DEFENSIVE_GUARD',
  DEFENSIVE_FORWARD: 'DEFENSIVE_FORWARD',
});

export function createPlayer({
  id,
  name,
  team,
  position,
  age,
  archetypes,
  valueComposite,
  contract,
}) {
  if (!id) throw new Error('Player requires an id.');
  if (!name) throw new Error('Player requires a name.');
  if (!Object.values(Positions).includes(position)) {
    throw new Error(`Unknown position: ${position}`);
  }
  if (!Array.isArray(archetypes) || archetypes.length === 0) {
    throw new Error('Player requires a non-empty archetypes array.');
  }
  for (const a of archetypes) {
    if (!Object.values(Archetypes).includes(a)) {
      throw new Error(`Unknown archetype: ${a}`);
    }
  }
  if (typeof valueComposite !== 'number' || valueComposite < 0 || valueComposite > 100) {
    throw new Error('valueComposite must be a number between 0 and 100.');
  }
  if (typeof age !== 'number') {
    throw new Error('Player requires a numeric age.');
  }
  if (!contract) {
    throw new Error('Player requires a contract.');
  }
  return {
    kind: 'player',
    id,
    name,
    team,
    position,
    age,
    archetypes,
    valueComposite,
    contract,
  };
}
