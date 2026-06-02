export const Goals = Object.freeze({
  CONTENDING: 'CONTENDING',
  WIN_NOW: 'WIN_NOW',
  PLAYOFF_PUSH: 'PLAYOFF_PUSH',
  RETOOLING: 'RETOOLING',
  REBUILDING: 'REBUILDING',
  STAR_HUNTING: 'STAR_HUNTING',
});

export function createGoal({ type, notes = '' }) {
  if (!Object.values(Goals).includes(type)) {
    throw new Error(`Unknown goal type: ${type}`);
  }
  return { type, notes };
}
