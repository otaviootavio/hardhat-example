// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Counter {
    uint public count;
    address owner;

    constructor(uint _count) {
        count = _count;    
        owner = msg.sender;
    }

    function inc() public {
        require(owner == msg.sender, "Must be the owner");
        count++;
    }

    function dec() public {
        require(owner == msg.sender, "Must be the owner");
        count--;
    }
}