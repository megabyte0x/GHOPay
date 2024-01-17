//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {ERC20} from "@solmate/contracts/tokens/ERC20.sol";
import {ERC4626} from "@solmate/contracts/tokens/ERC4626.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {SafeTransferLib} from "@solmate/contracts/utils/SafeTransferLib.sol";

/**
 * @title Partner Vault
 * @author Megabyte
 * @notice Partner Vault is a vault that accepts GHO tokens and mints RP tokens in exchange
 * as per the ratio set by the partner.
 */
contract PartnerVault is ERC4626, Ownable {
    error PartnerVault__ZeroAddress();
    error PartnerVault__ZeroAmount();

    using SafeTransferLib for ERC20;

    /*
           _        _                         _       _     _
       ___| |_ __ _| |_ ___  __   ____ _ _ __(_) __ _| |__ | | ___  ___
      / __| __/ _` | __/ _ \ \ \ / / _` | '__| |/ _` | '_ \| |/ _ \/ __|
      \__ \ || (_| | ||  __/  \ V / (_| | |  | | (_| | |_) | |  __/\__ \
      |___/\__\__,_|\__\___|   \_/ \__,_|_|  |_|\__,_|_.__/|_|\___||___/
    */

    ERC20 public immutable i_ghoToken;

    uint8 public s_withdrawalFee;
    uint8 public s_partnerFee;
    address public s_rewardPool;
    address public s_partnerFeeCollector;

    constructor(ERC20 _ghoToken, string memory _name, string memory _symbol, address _partnerAddress, uint8 ratio)
        Ownable(_partnerAddress)
        ERC4626(_ghoToken, _name, _symbol, (_ghoToken.decimals() + ratio))
    {
        i_ghoToken = _ghoToken;
    }

    modifier isZeroAdrress(address _address) {
        if (_address == address(0)) revert PartnerVault__ZeroAddress();
        _;
    }

    modifier isZeroAmount(uint256 _amount) {
        if (_amount == 0) revert PartnerVault__ZeroAmount();
        _;
    }

    /*
                   _     _ _         __                  _   _
       _ __  _   _| |__ | (_) ___   / _|_   _ _ __   ___| |_(_) ___  _ __  ___
      | '_ \| | | | '_ \| | |/ __| | |_| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
      | |_) | |_| | |_) | | | (__  |  _| |_| | | | | (__| |_| | (_) | | | \__ \
      | .__/ \__,_|_.__/|_|_|\___| |_|  \__,_|_| |_|\___|\__|_|\___/|_| |_|___/
      |_|
    */

    function setWithdrawalFee(uint8 _withdrawalFee) public isZeroAmount(uint256(_withdrawalFee)) onlyOwner {
        s_withdrawalFee = _withdrawalFee;
    }

    function setRewardPool(address _rewardPool) public isZeroAdrress(_rewardPool) onlyOwner {
        s_rewardPool = _rewardPool;
    }

    function setFeeCollector(address _feeCollector) public isZeroAdrress(_feeCollector) onlyOwner {
        s_partnerFeeCollector = _feeCollector;
    }

    function setPartnerFee(uint8 _partnerFee) public isZeroAmount(uint256(_partnerFee)) onlyOwner {
        s_partnerFee = _partnerFee;
    }

    /**
     * Function to deposit GHO Tokens into the vault.
     * @param _ghoAmount The amount of GHO tokens to be deposited.
     * @notice This can only be called by the owner of the vault.
     */
    function depositGHO(uint256 _ghoAmount) public isZeroAmount(_ghoAmount) onlyOwner {
        deposit(_ghoAmount, s_rewardPool);
    }

    /**
     * Function to withdraw GHO Tokens from the vault in exchange for RP tokens.
     * @param _rp The amount of Reward Points tokens to be withdrawn.
     * @param _receiver The address of the receiver of the GHO tokens.
     * @param _owner The address of the owner of the RP tokens.
     */
    function withdrawGHO(uint256 _rp, address _receiver, address _owner)
        public
        isZeroAmount(_rp)
        isZeroAdrress(_receiver)
        isZeroAdrress(_owner)
    {
        withdraw(_rp, _receiver, _owner);
    }

    function totalAssets() public view override returns (uint256) {
        return i_ghoToken.balanceOf(address(this));
    }

    function rpTokenBalance(address _user) public view returns (uint256) {
        return balanceOf[_user];
    }

    /*
       _       _                        _    __                  _   _
      (_)_ __ | |_ ___ _ __ _ __   __ _| |  / _|_   _ _ __   ___| |_(_) ___  _ __  ___
      | | '_ \| __/ _ \ '__| '_ \ / _` | | | |_| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
      | | | | | ||  __/ |  | | | | (_| | | |  _| |_| | | | | (__| |_| | (_) | | | \__ \
      |_|_| |_|\__\___|_|  |_| |_|\__,_|_| |_|  \__,_|_| |_|\___|\__|_|\___/|_| |_|___/
    */

    /**
     * Function to calculate the amount of GHO to be paid to the Partner and the user.
     * @param _rpTokenAmount The amount of RP tokens deposited in exchange for GHO.
     * @return amountPayable The amount of GHO Tokens to be paid to the user.
     * @return feeForPartner The amount of GHO Tokens to be deducted as fee for Partners.
     */
    function withdrawWithFee(uint256 _rpTokenAmount)
        internal
        view
        returns (uint256 amountPayable, uint256 feeForPartner)
    {
        uint256 fee = calculateFee(_rpTokenAmount);
        feeForPartner = (fee * s_partnerFee) / 100;
        amountPayable = _rpTokenAmount - fee;
    }

    function calculateFee(uint256 _rpTokenAmount) internal view returns (uint256) {
        return (_rpTokenAmount * s_withdrawalFee) / 100;
    }

    /*
                                _     _
        _____   _____ _ __ _ __(_) __| | ___
       / _ \ \ / / _ \ '__| '__| |/ _` |/ _ \
      | (_) \ V /  __/ |  | |  | | (_| |  __/
       \___/ \_/ \___|_|  |_|  |_|\__,_|\___|
    */

    /**
     * Function to withdraw GHO tokens from the vault in exchange for RP tokens.
     * @param _rpAmount The amount of RP tokens deposited in exchange for GHO
     * @param _receiver The address of the recipient for GHO tokens
     * @param _owner The address of the owner of the RP tokens
     * @dev This function is overriden from ERC4626 to add the withdrawal fee.
     */
    function withdraw(uint256 _rpAmount, address _receiver, address _owner)
        public
        virtual
        override
        returns (uint256 shares)
    {
        shares = previewWithdraw(_rpAmount); // No need to check for rounding error, previewWithdraw rounds up.

        if (msg.sender != _owner) {
            uint256 allowed = allowance[_owner][msg.sender]; // Saves gas for limited approvals.

            if (allowed != type(uint256).max) allowance[_owner][msg.sender] = allowed - shares;
        }

        beforeWithdraw(_rpAmount, shares);

        _burn(_owner, shares);

        emit Withdraw(msg.sender, _receiver, _owner, _rpAmount, shares);

        if (msg.sender == owner()) {
            i_ghoToken.safeTransfer(_receiver, _rpAmount);
        } else {
            (uint256 amountPayable, uint256 feeForPartner) = withdrawWithFee(_rpAmount);
            i_ghoToken.safeTransfer(_receiver, amountPayable);
            i_ghoToken.safeTransfer(s_partnerFeeCollector, feeForPartner);
        }
    }
}
