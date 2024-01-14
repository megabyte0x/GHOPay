//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {ERC4626} from "@solmate/contracts/mixins/ERC4626.sol";
import {ERC20} from "@solmate/contracts/tokens/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract MainVault is ERC4626, Ownable {
    ERC20 public immutable s_ghoToken;
    uint8 public s_partnerFee;
    address public s_rewardPool;

    constructor(ERC20 _ghoToken, uint8 _partnerFee, address _rewardPool)
        ERC4626(_ghoToken, "GHO Points", "GP", _ghoToken.decimals())
    {
        s_ghoToken = _ghoToken;
        s_partnerFee = _partnerFee;
        s_rewardPool = _rewardPool;
    }

    function setPartnerFee(uint8 _partnerFee) public onlyOwner {
        s_partnerFee = _partnerFee;
    }

    function setRewardPool(address _rewardPool) public onlyOwner {
        s_rewardPool = _rewardPool;
    }

    /**
     * Function to deposit GHO tokens to the vault in exchange for GP tokens.
     * @param _assets number of assets to be deposited
     */
    function depositGHO(uint256 _assets) public onlyOwner {
        deposit(_assets, msg.sender);
    }

    /**
     * Function to withdraw GP tokens in exchange for GHO tokens.
     * @param _gp Amount of GP tokens to be burned in exchange for GHO tokens
     * @param _receiver The address of the receiver of the GHO tokens
     */
    function withdrawByOwner(uint256 _gp, address _receiver) public onlyOwner {
        withdraw(_gp, _receiver, msg.sender);
    }

    /**
     * Function to withdraw GP tokens in exchange for GHO tokens by Partner.
     * @param _gp Amount of GP tokens to be burned in exchange for GHO tokens
     * @param _receiver The address of the receiver of the GHO tokens
     */

    function withdrawByPartners(uint256 _gp, address _receiver) public {
        uint256 fee = (_gp * s_partnerFee) / 100;
        uint256 remainingGP = _gp - fee;

        // transferring fee to this contract
        transferFrom(msg.sender, address(this), fee);

        // call the withdraw function from teh
        withdraw(remainingGP, _receiver, msg.sender);
    }

    /**
     * Function to get the total GHO tokens in the vault.
     * @return total assets in the vault
     */
    function totalAssets() public view override returns (uint256) {
        return s_ghoToken.balanceOf(address(this));
    }

    function gpTokenBalance(address _user) public view returns (uint256) {
        return balanceOf[_user];
    }
}
