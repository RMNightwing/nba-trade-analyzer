export const WinLoss = Object.freeze({
  WIN: 'WIN',
  LOSS: 'LOSS',
  NEUTRAL: 'NEUTRAL',
});

export function createTeamVerdict({
  team,
  goalUsed,
  winLoss,
  overallGrade,
  capGrade,
  fitGrade,
  futureGrade,
  keyDrivers = [],
}) {
  if (!team) throw new Error('TeamVerdict requires a team abbreviation.');
  if (!goalUsed) throw new Error('TeamVerdict requires goalUsed.');
  if (winLoss && !Object.values(WinLoss).includes(winLoss)) {
    throw new Error(`Invalid winLoss value: ${winLoss}`);
  }
  return {
    team,
    goalUsed,
    winLoss: winLoss ?? null,
    overallGrade: overallGrade ?? null,
    capGrade: capGrade ?? null,
    fitGrade: fitGrade ?? null,
    futureGrade: futureGrade ?? null,
    keyDrivers,
  };
}

export function createTradeAnalysis({
  trade,
  // TODO(cap-engine): `legal` defaults to true as a PLACEHOLDER. There is no
  // legality computation yet, so any "Legal: yes" output is a default, NOT a
  // real apron/CBA result. The cap rules engine must own this field once built.
  legal = true,
  legalityReason = null,
  teamVerdicts = [],
  commentary = [],
}) {
  if (!trade) throw new Error('TradeAnalysis requires a trade.');
  return {
    trade,
    legal,
    legalityReason,
    teamVerdicts,
    commentary,
  };
}
