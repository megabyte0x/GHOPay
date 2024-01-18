//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {ERC20} from "@solmate/contracts/tokens/ERC20.sol";

contract TestGHO is ERC20 {
    constructor() ERC20("GHO", "GHO", 18) {}

    function mint(address _to, uint256 _amount) public {
        _mint(_to, _amount);
    }
}
