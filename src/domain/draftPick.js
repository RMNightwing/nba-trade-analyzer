export function createDraftPick({
  year,
  round = 1,
  originalTeam,
  ownedBy,
  protections = null,
  swapRights = false,
}) {
  if (typeof year !== 'number') {
    throw new Error('Draft pick requires a numeric year.');
  }
  if (round !== 1 && round !== 2) {
    throw new Error('Draft pick round must be 1 or 2.');
  }
  if (!originalTeam) throw new Error('Draft pick requires originalTeam.');
  if (!ownedBy) throw new Error('Draft pick requires ownedBy.');
  return {
    kind: 'pick',
    year,
    round,
    originalTeam,
    ownedBy,
    protections,
    swapRights,
  };
}
