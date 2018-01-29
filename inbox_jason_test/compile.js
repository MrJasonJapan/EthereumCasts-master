const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

// -> Pay attention the 'interface' (the JavaScript ABI) and 'bytecode' (the raw compiled contract) interfaces.
// console.log(solc.compile(source, 1));

// solc stands for 'Solidity Compiler'
// module.exports makes it so we can obtain the compile.js's output when using 'require' in another js file (I think).
module.exports = solc.compile(source, 1).contracts[':Inbox'];