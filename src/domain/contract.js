export const OptionTypes = Object.freeze({
  PLAYER: 'PLAYER',
  TEAM: 'TEAM',
  ETO: 'ETO',
});

export const SalaryConfidences = Object.freeze({
  KNOWN: 'known',
  APPROXIMATE: 'approximate',
  UNKNOWN: 'unknown',
});

const VALID_CONFIDENCE = Object.values(SalaryConfidences);

export function createContract({
  salaries,
  options = [],
  noTradeClause = false,
  tradeKicker = 0,
  baseYearCompensation = false,
  recentlyExtended = false,
}) {
  if (!Array.isArray(salaries) || salaries.length === 0) {
    throw new Error('Contract requires at least one salary year.');
  }
  const normalizedSalaries = salaries.map((s) => {
    if (typeof s.year !== 'number' || typeof s.amount !== 'number') {
      throw new Error('Each salary entry needs { year: number, amount: number }.');
    }
    const confidence = s.confidence ?? 'known';
    if (!VALID_CONFIDENCE.includes(confidence)) {
      throw new Error(`Invalid salary confidence: ${confidence}`);
    }
    return { year: s.year, amount: s.amount, confidence };
  });
  for (const o of options) {
    if (!Object.values(OptionTypes).includes(o.type)) {
      throw new Error(`Unknown option type: ${o.type}`);
    }
  }
  return {
    salaries: normalizedSalaries,
    options,
    noTradeClause,
    tradeKicker,
    baseYearCompensation,
    recentlyExtended,
  };
}
