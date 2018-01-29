// specifcy the version of solidity
pragma solidity ^0.4.17;

// contract definition (similar to defining a class for our contract)
contract Inbox {
    // storage (instance) variable 
    string public message;
    
    function Inbox(string initialMessage) public {
        message = initialMessage;
    }
    
    function setMessage(string newMessage) public {
        message = newMessage;
    }    
}