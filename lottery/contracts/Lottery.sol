// specifcy the version of solidity
pragma solidity ^0.4.17;

// contract definition (similar to defining a class for our contract)
contract Lottery {
    // storage (instance) variables
    address public manager;
    address[] public players;
    
    function Lottery() public {
        manager = msg.sender;
    }
    
    function enter() public payable {
        
        //validation. if this evaluate to false, the function will end here.
        require(msg.value > .01 ether);
        
        players.push(msg.sender);
    }
    
    // pick a winnder and send them all the money in the contract.
    // we only want our "manager" to be able to call this function.
    function pickWinner() public restricted {
        
        uint index = psudoRandom() % players.length;
        players[index].transfer(address(this).balance); //ex address: 0x1238338abda231423...
        
        //reset players array. creata new dynamic array of type address
        players = new address[](0);
    }
    
    modifier restricted() {
        // check to make sure that the caller is the person who originally created this contract (the manager)
        require(msg.sender == manager);
        _; // this is a target for where the code goes from function using 'restricted'
    }
    
    // reminder: view means that this function will not attempt to change data stored inside the contract.
    function getPlayers() public view returns (address[]) {
        return players;
    }
    
    
    // our psudo-random number generator
    function psudoRandom() private view returns (uint){
        return uint(keccak256(block.difficulty, now, players));
    }
   
}