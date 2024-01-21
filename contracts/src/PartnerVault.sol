//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {ERC20, ERC4626, SafeTransferLib, FixedPointMathLib} from "./ERC4626Flatten.sol";

/**
 * @title Partner Vault
 * @author Megabyte
 * @notice Partner Vault is a vault that accepts GHO tokens and mints RP tokens in exchange
 * as per the ratio set by the partner.
 */
contract PartnerVault is ERC4626, Ownable {
    error PartnerVault__ZeroAddress();
    error PartnerVault__ZeroAmount();

    event PartnerVault__WithdrawalFeeSet(uint256 withdrawalFee);
    event PartnerVault__RewardPoolSet(address rewardPool);
    event PartnerVault__FeeCollectorSet(address feeCollector);
    event PartnerVault__PartnerFeeSet(uint256 partnerFee);
    event PartnerVault__GHODeposited(uint256 amount);
    event PartnerVault__GHOWithdrawn(uint256 indexed amount, address indexed receiver, address indexed owner);

    using SafeTransferLib for ERC20;
    using FixedPointMathLib for uint256;

    /*
           _        _                         _       _     _
       ___| |_ __ _| |_ ___  __   ____ _ _ __(_) __ _| |__ | | ___  ___
      / __| __/ _` | __/ _ \ \ \ / / _` | '__| |/ _` | '_ \| |/ _ \/ __|
      \__ \ || (_| | ||  __/  \ V / (_| | |  | | (_| | |_) | |  __/\__ \
      |___/\__\__,_|\__\___|   \_/ \__,_|_|  |_|\__,_|_.__/|_|\___||___/
    */

    ERC20 public immutable i_ghoToken;

    uint256 public s_withdrawalFee = 30e16; // 30%
    uint256 public s_partnerFee = 50e16; // 50%
    address public s_rewardPool;
    address public s_partnerFeeCollector;

    constructor(
        ERC20 _ghoToken,
        string memory _name,
        string memory _symbol,
        address _partnerAddress,
        address _rewardPool,
        address _mainAdminFeeCollector,
        uint8 ratio
    ) Ownable(_partnerAddress) ERC4626(_ghoToken, _name, _symbol, (_ghoToken.decimals() + ratio)) {
        i_ghoToken = _ghoToken;
        s_rewardPool = _rewardPool;
        s_partnerFeeCollector = _mainAdminFeeCollector;
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
        emit PartnerVault__WithdrawalFeeSet(_withdrawalFee);
    }

    function setRewardPool(address _rewardPool) public isZeroAdrress(_rewardPool) onlyOwner {
        s_rewardPool = _rewardPool;
        emit PartnerVault__RewardPoolSet(_rewardPool);
    }

    function setFeeCollector(address _feeCollector) public isZeroAdrress(_feeCollector) onlyOwner {
        s_partnerFeeCollector = _feeCollector;
        emit PartnerVault__FeeCollectorSet(_feeCollector);
    }

    function setPartnerFee(uint8 _partnerFee) public isZeroAmount(uint256(_partnerFee)) onlyOwner {
        s_partnerFee = _partnerFee;
        emit PartnerVault__PartnerFeeSet(_partnerFee);
    }

    /**
     * Function to deposit GHO Tokens into the vault.
     * @param _ghoAmount The amount of GHO tokens to be deposited.
     * @notice This can only be called by the owner of the vault.
     */
    function depositGHO(uint256 _ghoAmount) public isZeroAmount(_ghoAmount) onlyOwner {
        deposit(_ghoAmount, s_rewardPool);
        emit PartnerVault__GHODeposited(_ghoAmount);
    }

    /**
     * Function to deposit GHO Tokens into the vault.
     * @param _ghoAmount The amount of GHO tokens to be deposited.
     * @notice This can only be called by the owner of the vault.
     */
    function depositGHOWithPermit(uint256 _ghoAmount, uint8 v, bytes32 r, bytes32 s, uint256 deadline)
        public
        isZeroAmount(_ghoAmount)
        onlyOwner
    {
        i_ghoToken.permit(msg.sender, address(this), _ghoAmount, deadline, v, r, s);
        deposit(_ghoAmount, s_rewardPool);
    }

    /**
     * Function to withdraw GHO Tokens from the vault in exchange for RP tokens.
     * @param _ghoAmount The amount of GHO tokens to be withdrawn.
     * @param _receiver The address of the receiver of the GHO tokens.
     * @param _owner The address of the owner of the RP tokens.
     */
    function withdrawGHO(uint256 _ghoAmount, address _receiver, address _owner)
        public
        isZeroAmount(_ghoAmount)
        isZeroAdrress(_receiver)
        isZeroAdrress(_owner)
    {
        withdraw(_ghoAmount, _receiver, _owner);
        emit PartnerVault__GHOWithdrawn(_ghoAmount, _receiver, _owner);
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
     * @param _ghoAmount The amount of GHO tokens to be withdrawn.
     * @return amountPayable The amount of GHO Tokens to be paid to the user.
     * @return feeForPartner The amount of GHO Tokens to be deducted as fee for Partners.
     */
    function withdrawWithFee(uint256 _ghoAmount) public view returns (uint256 amountPayable, uint256 feeForPartner) {
        uint256 fee = calculateFee(_ghoAmount);
        feeForPartner = FixedPointMathLib.mulWadUp(fee, s_partnerFee);
        amountPayable = _ghoAmount - fee;
    }

    function calculateFee(uint256 _ghoAmount) internal view returns (uint256) {
        return FixedPointMathLib.mulWadUp(_ghoAmount, s_withdrawalFee);
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
     * @param _ghoAmount The amount of GHO tokens to be withdrawn
     * @param _receiver The address of the recipient for GHO tokens
     * @param _owner The address of the owner of the RP tokens
     * @dev This function is overriden from ERC4626 to add the withdrawal fee.
     */
    function withdraw(uint256 _ghoAmount, address _receiver, address _owner)
        public
        virtual
        override
        returns (uint256 shares)
    {
        shares = previewWithdraw(_ghoAmount); // No need to check for rounding error, previewWithdraw rounds up.

        if (msg.sender != _owner) {
            uint256 allowed = allowance[_owner][msg.sender]; // Saves gas for limited approvals.

            if (allowed != type(uint256).max) allowance[_owner][msg.sender] = allowed - shares;
        }

        beforeWithdraw(_ghoAmount, shares);

        _burn(_owner, shares);

        emit Withdraw(msg.sender, _receiver, _owner, _ghoAmount, shares);

        if (msg.sender == owner()) {
            i_ghoToken.safeTransfer(_receiver, _ghoAmount);
        } else {
            (uint256 amountPayable, uint256 feeForPartner) = withdrawWithFee(_ghoAmount);
            i_ghoToken.safeTransfer(_receiver, amountPayable);
            i_ghoToken.safeTransfer(s_partnerFeeCollector, feeForPartner);
        }
    }
}
