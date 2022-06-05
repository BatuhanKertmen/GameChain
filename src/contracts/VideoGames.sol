pragma solidity ^0.5.0;

contract VideoGames {
    
    struct VideoGame {
        address producerAddress;
        string name;
        string producer;
        string description;
        string imageLink;
        uint price;
    }

    address owner;
    address[] producerAddresses;
    mapping(address => VideoGame[]) VideoGamesOf;

    event AddGame(address producerAddress, string name, uint price);

    constructor() public {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner);
        _; 
    }
 }