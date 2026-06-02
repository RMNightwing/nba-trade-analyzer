import { giannisToLakers } from '../src/fixtures/index.js';
import { createTradeAnalysis } from '../src/domain/index.js';
import { formatTradeAnalysis } from '../src/format/console.js';

// No scoring yet — wrap the trade in an empty TradeAnalysis so the formatter
// renders the input shape with placeholder verdict / commentary sections.
const analysis = createTradeAnalysis({ trade: giannisToLakers });
console.log(formatTradeAnalysis(analysis));
