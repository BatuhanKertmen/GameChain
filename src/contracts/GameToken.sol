pragma solidity ^0.5.0;

contract GameToken {
    address public owner;
    uint256 public totalSupply_ = 1000000000000000000 * 1000000;
    string public constant name = "Game Token";
    string public constant symbol = "GT";
    uint8 public constant decimals = 18; 

    mapping(address => uint256) balances;
    mapping(address => mapping (address => uint256)) allowed;

    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
    event Transfer(address indexed from, address indexed to, uint tokens);

    constructor() public {
        balances[msg.sender] = totalSupply_;
        owner = msg.sender;
    }

    function getowner() public view returns(address) {
        return owner;
    }
    function totalSupply() public view returns(uint256) {
        return totalSupply_;
    }

    function balanceOf(address tokenOwner) public view returns (uint) {
        return balances[tokenOwner];
    }

    function transfer(address receiver, uint numTokens) public returns (bool) {
        require(numTokens <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender] - numTokens;
        balances[receiver] = balances[receiver] + numTokens;
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }

    function approve(address delegate, uint numTokens) public returns (bool) {
        allowed[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }

    function allowance(address owner, address delegate) public view returns (uint) {
        return allowed[owner][delegate];
    }  

    function transferFrom(address owner, address buyer, uint numTokens) public returns (bool) {
        require(numTokens <= balances[owner]);
        require(numTokens <= allowed[owner][msg.sender]);

        balances[buyer] = balances[buyer] + numTokens;
        allowed[owner][msg.sender] -= numTokens;
        balances[owner] = balances[owner] - numTokens;
        
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
}




