const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

//console.log(solc.compile(source, 1)); -> Pay attention the 'interface' (the JS ABI) and 'bytecode' (the raw compiled contract) interfaces.

// solc stands for 'Solidity Compiler'
module.exports = solc.compile(source, 1).contracts[':Inbox'];