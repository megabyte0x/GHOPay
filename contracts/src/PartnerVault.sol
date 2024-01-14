//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {ERC4626} from "@solmate/contracts/mixins/ERC4626.sol";
import {ERC20} from "@solmate/contracts/tokens/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract PartnerVault is ERC4626, Ownable {
    address constant REWARD_POOL = address(0);
    uint256 public USER_FEE = 2;

    ERC20 public immutable i_ghoToken;

    constructor(ERC20 _ghoToken, string memory _name, string memory _symbol, address _partnerAddress)
        ERC4626(_ghoToken, _name, _symbol)
    {
        i_ghoToken = _ghoToken;

        transferOwnership(_partnerAddress);
    }

    function depositGHO(uint256 amountOfGHO) public onlyOwner {
        deposit(amountOfGHO, REWARD_POOL);
    }

    function withdrawByOwner(uint256 _rp, address _receiver) public onlyOwner {
        withdraw(_rp, _receiver, msg.sender);
    }

    function totalAssets() public view override returns (uint256) {
        return i_ghoToken.balanceOf(address(this));
    }

    function rpTokenBalance(address _user) public view returns (uint256) {
        return balanceOf[_user];
    }
}
