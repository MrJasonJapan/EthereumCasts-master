// assert is a node.js standard library
const assert = require('assert');

// needs to be installed separately
// * ganache will automatically create a set of 'unlocked' read-to-go accounts for us to use.
const ganache = require('ganache-cli'); 

// needs to be installed separately
const Web3 = require('web3'); 

// depending on the network we are connecting too, we change the provider.
const web3 = new Web3(ganache.provider()); 

let accounts;

beforeEach(async () => {
	//Get a list of all accounts asynchronously using 'async await' which helps the code look cleaner.
	accounts = await web3.eth.getAccounts();	
	
	// (old way with a 'prmoise'). Get a list of all accounts. .then() referes to a 'promise' call.
	//web3.eth.getAccounts().then(fetchedAccounts => {
	//	// view our 'unlocked' test-accounts in the console.
	//	console.log(fetchedAccounts);
	//});


	
	// Use one of those accounts to deploy the contract
});

describe('Inbox', () => {
	it('deploys a contract', () => {
		console.log(accounts);
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