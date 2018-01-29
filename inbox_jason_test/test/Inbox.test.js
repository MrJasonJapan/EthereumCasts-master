// assert is a node.js standard library
const assert = require('assert');
// needs to be installed separately
// * ganache will automatically create a set of 'unlocked' read-to-go accounts for us to use.
const ganache = require('ganache-cli'); 
// needs to be installed separately
const Web3 = require('web3'); 
// depending on the network we are connecting too, we change the provider accordingly
const provider = ganache.provider();
const web3 = new Web3(provider);
//'interface': the JavaScript ABI, 'bytecode': the raw compiled contract
// requiring compile.js here actually runs it, resulting in a compiled object, of which we had off the interface and bytecode properties.
const {interface, bytecode} = require('../compile.js');

let accounts;
let inbox;
const INITIAL_STRING = 'Hi there!'

beforeEach(async () => {
	//Get a list of all accounts asynchronously using 'async await' which helps the code look cleaner.
	accounts = await web3.eth.getAccounts();	
	
	// (old way with a 'prmoise'). Get a list of all accounts. .then() referes to a 'promise' call.
	//web3.eth.getAccounts().then(fetchedAccounts => {
	//	// view our 'unlocked' test-accounts in the console.
	//	console.log(fetchedAccounts);
	//});

	
	//Use one of our 'unlocked' accounts to deploy the contract.
	inbox = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({ data: bytecode, arguments: [INITIAL_STRING] }) // 'Hi there!' will be passed into the contract's constructor function.
		.send({ from: accounts[0], gas: '1000000' }) // send() actually triggers the commuication from web3 off to the ethereum network.
		
	//Manually set the provider (necessary to handle compile issues with this older version Web3).	
	inbox.setProvider(provider)
});

describe('Inbox', () => {
	it('deploys a contract', () => {
		//console.log(inbox);
		
		//assert that we have a contract address available (make sure that address is a defined value)
		assert.ok(inbox.options.address);
	})
		
	it('has a default message', async () => {
		const message = await inbox.methods.message().call();
		assert.equal(message, INITIAL_STRING)
	})
			
	it('can change the message', async () => {
		await inbox.methods.setMessage('new message').send({ from: accounts[0] });
		const message = await inbox.methods.message().call();
		assert.equal(message, 'new message');
	})			
});


//----------------------------------------------------
//Tutorial for using the testing module 'mocha'

//class Car {
//	park(){
//		return 'stopped';
//	}	
//	
//	drive(){
//		return 'vroom';	
//	}
//}
//
//
//
//let car; // let varabiable are not constant (const).
//
//beforeEach(() => {
//	car = new Car();
//});
//
//describe('Car', () => {
//	it('can park',  () => {
//		assert.equal(car.park(), 'stopped');
//	});
//	
//	it('can drive',  () => {		
//		assert.equal(car.drive(), 'vroom');
//	});	
//});

// End of tutorial
//----------------------------------------------------