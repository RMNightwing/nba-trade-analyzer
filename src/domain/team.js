export function createCapState({
  salaryTotal,
  salaryCap,
  taxLine,
  firstApron,
  secondApron,
  hardCapStatus = null,
  tradeExceptions = [],
}) {
  for (const n of [salaryTotal, salaryCap, taxLine, firstApron, secondApron]) {
    if (typeof n !== 'number') {
      throw new Error('Cap state requires numeric salaryTotal, salaryCap, taxLine, firstApron, secondApron.');
    }
  }
  return {
    salaryTotal,
    salaryCap,
    taxLine,
    firstApron,
    secondApron,
    hardCapStatus,
    tradeExceptions,
  };
}

export function createTeamSnapshot({
  abbreviation,
  name,
  rosterPlayerIds,
  capState = null,
  draftPicks = [],
  record = null,
  mode = null,
  modeNote = null,
  headCoach = null,
}) {
  if (!abbreviation) throw new Error('Team requires an abbreviation.');
  if (!name) throw new Error('Team requires a name.');
  if (!Array.isArray(rosterPlayerIds) || rosterPlayerIds.length === 0) {
    throw new Error('Team requires a non-empty rosterPlayerIds.');
  }
  if (record !== null) {
    if (typeof record.wins !== 'number' || typeof record.losses !== 'number') {
      throw new Error('record must be { wins: number, losses: number } or null.');
    }
  }
  return {
    abbreviation,
    name,
    rosterPlayerIds,
    capState,
    draftPicks,
    record,
    mode,
    modeNote,
    headCoach,
  };
}
