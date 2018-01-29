const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
	'round spring utility rival bronze impact dream quarter mask together resource myth', // My 1st Metamask Mnemonic
	'https://rinkeby.infura.io/Xm2mDv2zIBnTSrTUH7FH' // My Infura link for the Rinkeby network.
);

const web3 = new Web3(provider);

// prepare our helper deploy object that we can run with 'async await.'
const deploy = async () => {
	const accounts = await web3.eth.getAccounts();
	
	console.log('Attempting to deploy from account', accounts[0]);
	
	const result = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({ data: bytecode, arguments: ['Hi there!'] })
		.send({ gas: '1000000', from: accounts[0] });
		
	console.log('Contract deployed to', result.options.address);
};

deploy();