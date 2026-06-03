// NBA team logo URLs — pulled from the NBA's own CDN (cdn.nba.com). We LINK
// to NBA's servers rather than re-hosting the marks; that posture is the same
// as embedding a YouTube thumbnail and avoids redistributing copyrighted art.
//
// NOTE on IP: NBA team logos are trademarked. Linking to NBA's CDN is the
// safest posture for a dev/preview build. For a public launch, this should
// be revisited — either obtain permission, replace with original abstract
// marks, or apply a clear fair-use posture.
//
// NBA team IDs are stable (the franchise IDs in the NBA stats API).
const TEAM_ID = {
  ATL: 1610612737, BOS: 1610612738, BKN: 1610612751, CHA: 1610612766,
  CHI: 1610612741, CLE: 1610612739, DAL: 1610612742, DEN: 1610612743,
  DET: 1610612765, GSW: 1610612744, HOU: 1610612745, IND: 1610612754,
  LAC: 1610612746, LAL: 1610612747, MEM: 1610612763, MIA: 1610612748,
  MIL: 1610612749, MIN: 1610612750, NOP: 1610612740, NYK: 1610612752,
  OKC: 1610612760, ORL: 1610612753, PHI: 1610612755, PHX: 1610612756,
  POR: 1610612757, SAC: 1610612758, SAS: 1610612759, TOR: 1610612761,
  UTA: 1610612762, WAS: 1610612764,
};

export function logoUrlFor(abbr) {
  const id = TEAM_ID[abbr];
  if (!id) return null;
  // The "L" size is ~512px; works well at any UI scale and the browser caches.
  return `https://cdn.nba.com/logos/nba/${id}/global/L/logo.svg`;
}
