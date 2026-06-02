function describeAsset(asset) {
  if (asset.kind === 'player') {
    return asset.name;
  }
  if (asset.kind === 'pick') {
    const round = asset.round === 2 ? '2nd' : '1st';
    const protection = asset.protections ? ` (${describeProtection(asset.protections)})` : '';
    const swap = asset.swapRights ? ' swap' : '';
    return `${asset.year} ${round} from ${asset.originalTeam}${protection}${swap}`;
  }
  return '<unknown asset>';
}

function describeProtection(prot) {
  if (typeof prot.topProtected === 'number') return `top-${prot.topProtected} protected`;
  return 'protected';
}

function gradeLine(label, grade) {
  if (!grade) return `    ${label.padEnd(8)} -- · --`;
  const headline = grade.headline ? ` — ${grade.headline}` : '';
  // Number first, then the tier word (e.g. "90 · Franchise Win"). Mirrors the
  // frontend's "score · tier" headline; no letter grades anymore.
  return `    ${label.padEnd(8)} ${String(grade.score).padStart(3)} · ${grade.tier}${headline}`;
}

function groupFlows(assetFlows) {
  const groups = new Map();
  for (const flow of assetFlows) {
    const key = `${flow.fromTeam}→${flow.toTeam}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(flow);
  }
  return groups;
}

export function formatSalary(amount, confidence) {
  if (confidence === 'unknown' || amount === 0) {
    return '(TODO)';
  }
  const m = (amount / 1_000_000).toFixed(1);
  const prefix = confidence === 'approximate' ? '~$' : '$';
  return `${prefix}${m}M`;
}

function archetypeText(player, verbose) {
  if (verbose) return player.archetypes.join(', ');
  if (player.archetypes.length === 1) return player.archetypes[0];
  return `${player.archetypes[0]} +${player.archetypes.length - 1}`;
}

export function formatTradeAnalysis(analysis) {
  const lines = [];
  lines.push('=== Trade Analysis ===');
  lines.push(`Teams:  ${analysis.trade.teams.join('  ↔  ')}`);
  const legalText = analysis.legal ? 'yes' : 'no';
  const reason = analysis.legalityReason ? ` (${analysis.legalityReason})` : '';
  lines.push(`Legal:  ${legalText}${reason}`);
  lines.push('');

  lines.push('Assets:');
  const grouped = groupFlows(analysis.trade.assetFlows);
  for (const [key, flows] of grouped) {
    const [from, to] = key.split('→');
    lines.push(`  ${from} → ${to}:`);
    for (const f of flows) {
      lines.push(`    - ${describeAsset(f.asset)}`);
    }
  }
  lines.push('');

  lines.push('Per-Team Verdict:');
  if (analysis.teamVerdicts.length === 0) {
    lines.push('  (none yet — scoring not implemented)');
  } else {
    for (const v of analysis.teamVerdicts) {
      const goalLabel = v.goalUsed?.type ?? '--';
      lines.push(`  ${v.team}  (goal: ${goalLabel})`);
      lines.push(gradeLine('Overall:', v.overallGrade));
      lines.push(gradeLine('Cap:', v.capGrade));
      lines.push(gradeLine('Fit:', v.fitGrade));
      lines.push(gradeLine('Future:', v.futureGrade));
      lines.push(`    Win/Loss: ${v.winLoss ?? '--'}`);
      if (v.keyDrivers && v.keyDrivers.length > 0) {
        lines.push(`    Key drivers: ${v.keyDrivers.join('; ')}`);
      }
      lines.push('');
    }
  }

  lines.push('Commentary:');
  if (analysis.commentary.length === 0) {
    lines.push('  (none yet)');
  } else {
    for (const c of analysis.commentary) {
      lines.push(`  [${c.persona}] ${c.text}`);
    }
  }

  return lines.join('\n');
}

export function formatTeamSnapshot(snapshot, registry, { verbose = false } = {}) {
  const lines = [];
  lines.push(`=== ${snapshot.name} (${snapshot.abbreviation}) ===`);
  if (snapshot.headCoach) lines.push(`Head Coach:  ${snapshot.headCoach}`);
  if (snapshot.record) lines.push(`Record:      ${snapshot.record.wins}-${snapshot.record.losses}`);
  if (snapshot.mode) lines.push(`Mode:        ${snapshot.mode}`);
  if (snapshot.modeNote) lines.push(`Mode note:   ${snapshot.modeNote}`);
  if (!snapshot.capState) {
    lines.push('Cap State:   (TODO — pending cap engine)');
  } else {
    const cap = snapshot.capState;
    lines.push(
      `Cap State:   $${(cap.salaryTotal / 1_000_000).toFixed(1)}M total / 1A $${(cap.firstApron / 1_000_000).toFixed(1)}M / 2A $${(cap.secondApron / 1_000_000).toFixed(1)}M`
    );
  }
  lines.push('');

  const players = snapshot.rosterPlayerIds
    .map((id) => registry[id])
    .filter(Boolean);
  const archetypeLabel = verbose ? 'Archetypes' : 'Archetype';
  const archetypeWidth = Math.max(
    archetypeLabel.length,
    ...players.map((p) => archetypeText(p, verbose).length)
  ) + 2;

  lines.push(`Roster (${snapshot.rosterPlayerIds.length}):`);
  lines.push(
    '  ' +
      'Player'.padEnd(28) +
      'Pos  Age  ' +
      'Salary'.padEnd(12) +
      archetypeLabel.padEnd(archetypeWidth) +
      'Value'
  );
  const dashWidth = 28 + 5 + 5 + 12 + archetypeWidth + 5;
  lines.push('  ' + '─'.repeat(dashWidth));
  for (const id of snapshot.rosterPlayerIds) {
    const p = registry[id];
    if (!p) {
      lines.push(`  (unknown id: ${id})`);
      continue;
    }
    const salary = p.contract.salaries[0];
    lines.push(
      '  ' +
        p.name.padEnd(28) +
        p.position.padEnd(5) +
        String(p.age).padEnd(5) +
        formatSalary(salary.amount, salary.confidence).padEnd(12) +
        archetypeText(p, verbose).padEnd(archetypeWidth) +
        String(p.valueComposite)
    );
  }
  lines.push('');
  if (snapshot.draftPicks.length === 0) {
    lines.push('Owned Draft Picks: (TODO — not yet specified)');
  } else {
    lines.push('Owned Draft Picks:');
    for (const pick of snapshot.draftPicks) {
      const round = pick.round === 2 ? '2nd' : '1st';
      const prot = pick.protections ? ` (${describeProtection(pick.protections)})` : '';
      const swap = pick.swapRights ? ' swap' : '';
      lines.push(`  ${pick.year} ${round} from ${pick.originalTeam}${prot}${swap}`);
    }
  }
  return lines.join('\n');
}
