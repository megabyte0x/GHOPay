// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TestGHOPassport is ERC721 {
    constructor() ERC721("TestGHOPassport", "tGHO") {}

    function mint(address _to, uint256 _tokenId) external {
        _mint(_to, _tokenId);
    }
}
