//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import {ERC4626, ERC20} from "./ERC4626Flatten.sol";

/**
 * @title MainVault
 * @author Megabyte
 * @notice The is the Main Vault of GHOPay. It accepts GHO tokens and mints GP tokens in exchange.
 */

contract MainVault is ERC4626, Ownable {
    error MainVault__ZeroAddress();
    error MainVault__ZeroAmount();

    event MainVault__PartnerFeeSet(uint8 partnerFee);
    event MainVault__UserFeeSet(uint8 userFee);
    event MainVault__RewardPoolSet(address rewardPool);
    event MainVault__UpdatedMainAdmin(address mainAdmin);
    event MainVault__UtilsSet(address utils);
    event MainVault__GHODeposited(uint256 amount);
    event MainVault__GHOWithdrawn(uint256 indexed amount, address indexed receiver, address indexed owner);

    /*
           _        _                         _       _     _
       ___| |_ __ _| |_ ___  __   ____ _ _ __(_) __ _| |__ | | ___  ___
      / __| __/ _` | __/ _ \ \ \ / / _` | '__| |/ _` | '_ \| |/ _ \/ __|
      \__ \ || (_| | ||  __/  \ V / (_| | |  | | (_| | |_) | |  __/\__ \
      |___/\__\__,_|\__\___|   \_/ \__,_|_|  |_|\__,_|_.__/|_|\___||___/
    */

    ERC20 public immutable i_ghoToken;
    IERC721 public s_ghoPartnerPassport;

    uint8 public s_userFee;
    uint8 public s_partnerFee;
    address public s_mainPayment;
    address public s_mainAdmin;

    constructor(ERC20 _ghoToken, address _mainAdmin) Ownable(_mainAdmin) ERC4626(_ghoToken, "GHO Points", "GP", 18) {
        i_ghoToken = _ghoToken;
        s_mainAdmin = _mainAdmin;
    }

    modifier isZeroAdrress(address _address) {
        if (_address == address(0)) revert MainVault__ZeroAddress();
        _;
    }

    modifier isZeroAmount(uint256 _amount) {
        if (_amount == 0) revert MainVault__ZeroAmount();
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

    function setPartnerFee(uint8 _partnerFee) public isZeroAmount(uint256(_partnerFee)) onlyOwner {
        emit MainVault__PartnerFeeSet(_partnerFee);

        s_partnerFee = _partnerFee;
    }

    function setUserFee(uint8 _userFee) public isZeroAmount(uint256(_userFee)) onlyOwner {
        emit MainVault__UserFeeSet(_userFee);

        s_userFee = _userFee;
    }

    function setMainPayment(address _mainPayment) public isZeroAdrress(_mainPayment) onlyOwner {
        emit MainVault__RewardPoolSet(_mainPayment);

        s_mainPayment = _mainPayment;
    }

    function setMainAdmin(address _mainAdmin) public isZeroAdrress(_mainAdmin) onlyOwner {
        emit MainVault__UpdatedMainAdmin(_mainAdmin);

        s_mainAdmin = _mainAdmin;
    }

    function setGHOPartnerPassport(address _ghoPartnerPassport) public isZeroAdrress(_ghoPartnerPassport) onlyOwner {
        s_ghoPartnerPassport = IERC721(_ghoPartnerPassport);
    }

    /**
     * Function to deposit GHO tokens to the vault in exchange for GP tokens.
     * @param _ghoAmount number of assets to be deposited
     */
    function depositGHO(uint256 _ghoAmount) public isZeroAmount(_ghoAmount) onlyOwner {
        deposit(_ghoAmount, s_mainPayment);
        emit MainVault__GHODeposited(_ghoAmount);
    }

    /**
     * Function to withdraw GP tokens in exchange for GHO tokens.
     * @param _gp Amount of GP tokens to be burned in exchange for GHO tokens
     * @param _receiver The address of the receiver of the GHO tokens
     */
    function withdrawGHO(uint256 _gp, address _receiver, address _owner)
        public
        isZeroAmount(_gp)
        isZeroAdrress(_receiver)
        isZeroAdrress(_owner)
    {
        withdraw(_gp, _receiver, _owner);
        emit MainVault__GHOWithdrawn(_gp, _receiver, _owner);
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

    /*
       _       _                        _
      (_)_ __ | |_ ___ _ __ _ __   __ _| |
      | | '_ \| __/ _ \ '__| '_ \ / _` | |
      | | | | | ||  __/ |  | | | | (_| | |
      |_|_| |_|\__\___|_|  |_| |_|\__,_|_|
    */

    /**
     * This function is to check if the msg.sender is a GHO Partner Passport holder.
     * @param _partnerAdmin The address of the partner booking contract
     */
    function isPartner(address _partnerAdmin) internal view returns (bool) {
        return s_ghoPartnerPassport.balanceOf(_partnerAdmin) > 0;
    }

    /**
     *
     * @param _rpTokenAmount The amount of GP tokens in exchange for GHO tokens
     * @param _fee The fee percent to be charged
     * @return amountPayable The amount of GHO tokens to be paid
     * @return fee The amount of fee to be paid
     */
    function withdrawWithFee(uint256 _rpTokenAmount, uint8 _fee)
        internal
        pure
        returns (uint256 amountPayable, uint256 fee)
    {
        fee = calculateFee(_rpTokenAmount, _fee);
        amountPayable = _rpTokenAmount - fee;
    }

    /**
     * This is use to calculate the fee to be charged.
     * @param _rpTokenAmount The amount of GP tokens in exchange for GHO tokens
     * @param _fee The fee percent to be charged
     */
    function calculateFee(uint256 _rpTokenAmount, uint8 _fee) internal pure returns (uint256) {
        return (_rpTokenAmount * _fee) / 100;
    }

    /*
                                _     _
        _____   _____ _ __ _ __(_) __| | ___
       / _ \ \ / / _ \ '__| '__| |/ _` |/ _ \
      | (_) \ V /  __/ |  | |  | | (_| |  __/
       \___/ \_/ \___|_|  |_|  |_|\__,_|\___|
    */
    /**
     * @param _gpAmount The amount of GP tokens to be exchanged for GHO tokens
     * @param _receiver The address of the receiver of the GHO tokens
     * @param _owner The address of the owner of the GP tokens
     * @return shares The amount of GP tokens to be burned
     * @dev This function is override to add the fee structure of the Protocol.
     * @notice If the msg.sender is the owner of the Main Vault, then the GHO tokens are sent directly to the receiver.
     * @notice If the msg.sender is a partner booking contract, then the GHO tokens are sent to the receiver after deducting the partner fee.
     * @notice If the msg.sender is a user, then the GHO tokens are sent to the receiver after deducting the user fee.
     */
    function withdraw(uint256 _gpAmount, address _receiver, address _owner)
        public
        virtual
        override
        returns (uint256 shares)
    {
        shares = previewWithdraw(_gpAmount); // No need to check for rounding error, previewWithdraw rounds up.

        if (msg.sender != _owner) {
            uint256 allowed = allowance[_owner][msg.sender]; // Saves gas for limited approvals.

            if (allowed != type(uint256).max) allowance[_owner][msg.sender] = allowed - shares;
        }

        beforeWithdraw(_gpAmount, shares);

        _burn(_owner, shares);

        emit Withdraw(msg.sender, _receiver, _owner, _gpAmount, shares);

        if (msg.sender == owner()) {
            i_ghoToken.transfer(_receiver, _gpAmount);
        } else if (isPartner(msg.sender)) {
            (uint256 amountPayable, uint256 fee) = withdrawWithFee(_gpAmount, s_partnerFee);
            i_ghoToken.transfer(_receiver, amountPayable);
            i_ghoToken.transfer(s_mainAdmin, fee);
        } else {
            (uint256 amountPayable, uint256 fee) = withdrawWithFee(_gpAmount, s_userFee);
            i_ghoToken.transfer(_receiver, amountPayable);
            i_ghoToken.transfer(s_mainAdmin, fee);
        }
    }
}
