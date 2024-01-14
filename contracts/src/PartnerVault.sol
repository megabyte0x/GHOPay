//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {ERC4626} from "@solmate/contracts/mixins/ERC4626.sol";
import {ERC20} from "@solmate/contracts/tokens/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract PartnerVault is ERC4626, Ownable {
    address public s_rewardPool;

    ERC20 public immutable i_ghoToken;

    constructor(ERC20 _ghoToken, string memory _name, string memory _symbol, address _partnerAddress, uint8 ratio)
        ERC4626(_ghoToken, _name, _symbol, (_ghoToken.decimals() + ratio))
    {
        i_ghoToken = _ghoToken;

        transferOwnership(_partnerAddress);
    }

    function setRewardPool(address _rewardPool) public onlyOwner {
        s_rewardPool = _rewardPool;
    }

    function depositGHO(uint256 amountOfGHO) public onlyOwner {
        deposit(amountOfGHO, s_rewardPool);
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
