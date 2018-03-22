// assert is part of the node standard library.
const assert = require('assert');

// ganache will serve as our local test network, then only gets created when we start running our tests.
// simply by including it here, it will automatically get booted up.
const ganache = require('ganache-cli'); 

// Set up or Web3 constructor function.
const Web3 = require('web3');

// Create our instance of Web3. The provider here is what allows us to connect to any given network. Use whatever provider as necessary for the situation.
const web3 = new Web3(ganache.provider());

// Require in our interface (the ABI of our contract), and the bytecode, which is the RAW compiled contract.
const { interface, bytecode } = require('../compile.js')
	
	
let lottery;
let accounts;

// deploy out contract (lottery) and get a list of all of our accounts (accounts).
beforeEach(async () => { // include async here because this function (beforeEach) will have some asynchronous code inside of it.

	// get a list of whatever accounts using web3
	accounts = await web3.eth.getAccounts();
	
	// deply an instance of our contract into our local network.
	lottery = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({ data: bytecode }) // prep our raw object.
		.send({ from: accounts[0], gas: '1000000' }); // deploy object into the ganache local network (as a transaction).
});
		
		
describe('Lottery Contract', () => {

	it('deploys a contract', () => {	
		assert.ok(lottery.options.address); // the address the contract was deployed to on the local test network.
	});
	
});