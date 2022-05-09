pragma solidity ^0.5.0;

import './RWD.sol';
import './Tether.sol';


contract DecentralBank {
    address public owner;
    string public name = "Decentral Bank";
    Tether public tether;
    RWD public rwd;

    constructor(RWD _rwd, Tether _tether) public{
        owner = msg.sender;
        rwd = _rwd;
        tether = _tether;
    }

    function depositTokens(uint256 _amount) public {

        rwd.approve(owner, _amount);
        tether.transferFrom(msg.sender, address(this), _amount);
    }
    
}
