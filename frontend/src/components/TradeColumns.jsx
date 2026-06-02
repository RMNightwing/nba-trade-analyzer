// Renders the two sides of the trade, reading asset data directly from the
// existing /src fixture shape. Player salaries reuse the exported formatSalary
// from the console formatter; pick lines mirror its (module-private)
// describeAsset/describeProtection logic, since those helpers are not exported.
import { formatSalary } from "../../../src/format/console.js";

const TEAM_LABELS = { MIL: "Milwaukee", LAL: "Los Angeles" };

// Mirrors describeAsset/describeProtection in src/format/console.js for picks.
// Kept here (rather than imported) because those helpers are module-private;
// see summary note. Same field access as the console formatter.
function describePick(pick) {
  const round = pick.round === 2 ? "2nd" : "1st";
  let protection = "";
  if (pick.protections) {
    protection =
      typeof pick.protections.topProtected === "number"
        ? ` (top-${pick.protections.topProtected} protected)`
        : " (protected)";
  } else {
    protection = " (unprotected)";
  }
  const swap = pick.swapRights ? " swap" : "";
  return `${pick.year} ${round} from ${pick.originalTeam}${protection}${swap}`;
}

function AssetItem({ asset }) {
  if (asset.kind === "player") {
    const salary = asset.contract.salaries[0];
    return (
      <li className="asset">
        <span className="asset__name">{asset.name}</span>
        <span className="asset__detail">
          {formatSalary(salary.amount, salary.confidence)}
        </span>
      </li>
    );
  }
  if (asset.kind === "pick") {
    return (
      <li className="asset">
        <span className="asset__name">{describePick(asset)}</span>
        <span className="asset__detail asset__detail--muted">draft pick</span>
      </li>
    );
  }
  return null;
}

function TeamColumn({ teamAbbr, flows }) {
  const label = TEAM_LABELS[teamAbbr] ?? teamAbbr;
  return (
    <section className="trade-column">
      <h3 className="trade-column__title">{label} sends</h3>
      <ul className="asset-list">
        {flows.map((flow, i) => (
          <AssetItem key={i} asset={flow.asset} />
        ))}
      </ul>
    </section>
  );
}

export default function TradeColumns({ trade }) {
  const [leftTeam, rightTeam] = trade.teams;
  const outgoing = (team) => trade.assetFlows.filter((f) => f.fromTeam === team);

  return (
    <div className="trade-columns">
      <TeamColumn teamAbbr={leftTeam} flows={outgoing(leftTeam)} />
      <TeamColumn teamAbbr={rightTeam} flows={outgoing(rightTeam)} />
    </div>
  );
}
