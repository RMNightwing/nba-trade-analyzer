// Maps a verdict's display team name back to a CSS-friendly slug so the card
// can wear that team's accent stripe via [data-team="..."]. Tiny + colocated
// with the components that use it.
export function teamSlugFromName(name) {
  if (!name) return undefined;
  if (name.includes("Bucks")) return "bucks";
  if (name.includes("Lakers")) return "lakers";
  return undefined;
}
