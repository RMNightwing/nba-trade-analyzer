import { bucksSnapshot, lakersSnapshot, playerRegistry } from '../src/fixtures/index.js';
import { formatTeamSnapshot } from '../src/format/console.js';

console.log(formatTeamSnapshot(bucksSnapshot, playerRegistry, { verbose: true }));
console.log('\n');
console.log(formatTeamSnapshot(lakersSnapshot, playerRegistry, { verbose: true }));
