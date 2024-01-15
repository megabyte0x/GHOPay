//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {ERC4626} from "@solmate/contracts/mixins/ERC4626.sol";
import {ERC20} from "@solmate/contracts/tokens/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {SafeTransferLib} from "@solmate/contracts/utils/SafeTransferLib.sol";

contract MainVault is ERC4626, Ownable {
    using SafeTransferLib for ERC20;

    ERC20 public immutable i_ghoToken;

    uint8 public s_partnerFee;
    uint8 public s_userFee;
    address public s_rewardPool;
    address public s_feeColletor;

    constructor(ERC20 _ghoToken) ERC4626(_ghoToken, "GHO Points", "GP", _ghoToken.decimals()) {
        i_ghoToken = _ghoToken;
    }

    function setPartnerFee(uint8 _partnerFee) public onlyOwner {
        s_partnerFee = _partnerFee;
    }

    function setUserFee(uint8 _userFee) public onlyOwner {
        s_userFee = _userFee;
    }

    function setRewardPool(address _rewardPool) public onlyOwner {
        s_rewardPool = _rewardPool;
    }

    function setFeeCollector(address _feeCollector) public onlyOwner {
        s_feeColletor = _feeCollector;
    }

    /**
     * Function to deposit GHO tokens to the vault in exchange for GP tokens.
     * @param _assets number of assets to be deposited
     */
    function depositGHO(uint256 _assets) public onlyOwner {
        deposit(_assets, s_rewardPool);
    }

    /**
     * Function to withdraw GP tokens in exchange for GHO tokens.
     * @param _gp Amount of GP tokens to be burned in exchange for GHO tokens
     * @param _receiver The address of the receiver of the GHO tokens
     */
    function withdrawGHO(uint256 _gp, address _receiver, address _owner) public onlyOwner {
        withdraw(_gp, _receiver, _owner);
    }

    function withdraw(uint256 assets, address receiver, address _owner)
        public
        virtual
        override
        returns (uint256 shares)
    {
        shares = previewWithdraw(assets); // No need to check for rounding error, previewWithdraw rounds up.

        if (msg.sender != _owner) {
            uint256 allowed = allowance[_owner][msg.sender]; // Saves gas for limited approvals.

            if (allowed != type(uint256).max) allowance[_owner][msg.sender] = allowed - shares;
        }

        beforeWithdraw(assets, shares);

        _burn(_owner, shares);

        emit Withdraw(msg.sender, receiver, _owner, assets, shares);

        if (msg.sender == owner()) {
            i_ghoToken.safeTransfer(receiver, assets);
        } else if (isPartner(msg.sender)) {
            (uint256 amountPayable, uint256 fee) = withdrawWithFee(assets, s_partnerFee);
            i_ghoToken.safeTransfer(receiver, amountPayable);
            i_ghoToken.safeTransfer(s_feeColletor, fee);
        } else {
            (uint256 amountPayable, uint256 fee) = withdrawWithFee(assets, s_userFee);
            i_ghoToken.safeTransfer(receiver, amountPayable);
            i_ghoToken.safeTransfer(s_feeColletor, fee);
        }
    }

    function isPartner(address _partner) internal view returns (bool) {
        return _partner == s_rewardPool;
    }

    function withdrawWithFee(uint256 _rpTokenAmount, uint8 _fee)
        internal
        pure
        returns (uint256 amountPayable, uint256 fee)
    {
        fee = calculateFee(_rpTokenAmount, _fee);
        amountPayable = _rpTokenAmount - fee;
    }

    function calculateFee(uint256 _rpTokenAmount, uint8 _fee) internal pure returns (uint256) {
        return (_rpTokenAmount * _fee) / 100;
    }

    /**
     * Function to get the total GHO tokens in the vault.
     * @return total assets in the vault
     */
    function totalAssets() public view override returns (uint256) {
        return i_ghoToken.balanceOf(address(this));
    }

    function gpTokenBalance(address _user) public view returns (uint256) {
        return balanceOf[_user];
    }
}
