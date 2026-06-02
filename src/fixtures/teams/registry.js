import { bucksPlayers } from './bucks.js';
import { lakersPlayers } from './lakers.js';

const allPlayers = [...bucksPlayers, ...lakersPlayers];

export const playerRegistry = Object.fromEntries(allPlayers.map((p) => [p.id, p]));

export function lookupPlayer(id) {
  const p = playerRegistry[id];
  if (!p) throw new Error(`Player not in registry: ${id}`);
  return p;
}
