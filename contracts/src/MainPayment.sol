//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {ERC20} from "@solmate/contracts/tokens/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {FixedPointMathLib} from "@solmate/contracts/utils/FixedPointMathLib.sol";

import {Utils} from "./Utils.sol";

contract MainPayment is Ownable {
    error MainPayment__ZeroAmount();
    error MainPayment__ZeroAddress();
    error MainPayment__NotEnoughGHO();
    error MainPayment__OnlyGHOPassportHolders();
    error MainPayment__OnlyPartnerBookingContract();
    error MainPayment__NotEnoughGP(uint256 _gpAmountLeft, uint256 _gpRewardAmount);

    event MainPayment__PaidWithGHO(address indexed _recipient, uint256 _amount);
    event MainPayment__GPRewarded(address indexed _user, uint256 indexed _amountPaid, uint256 indexed _gpAmountLeft);

    using FixedPointMathLib for uint256;

    /*
           _        _                         _       _
       ___| |_ __ _| |_ ___  __   ____ _ _ __(_) __ _| |__   ___  ___
      / __| __/ _` | __/ _ \ \ \ / / _` | '__| |/ _` | '_ \ / _ \/ __|
      \__ \ || (_| | ||  __/  \ V / (_| | |  | | (_| | |_) |  __/\__ \
      |___/\__\__,_|\__\___|   \_/ \__,_|_|  |_|\__,_|_.__/ \___||___/
    */

    Utils public s_utils;
    ERC20 public s_gpToken;
    ERC20 public s_ghoToken;
    IERC721 public s_ghoPassport;

    uint256 public s_minimumAmt;

    constructor(address _ghoToken, address _gpToken, address _ghoPassport, address _utils, uint256 _minimumAmt)
        Ownable(msg.sender)
    {
        s_ghoToken = ERC20(_ghoToken);
        s_gpToken = ERC20(_gpToken);
        s_ghoPassport = IERC721(_ghoPassport);
        s_utils = Utils(_utils);
        s_minimumAmt = _minimumAmt;
    }

    /*
                           _ _  __ _
       _ __ ___   ___   __| (_)/ _(_) ___ _ __ ___
      | '_ ` _ \ / _ \ / _` | | |_| |/ _ \ '__/ __|
      | | | | | | (_) | (_| | |  _| |  __/ |  \__ \
      |_| |_| |_|\___/ \__,_|_|_| |_|\___|_|  |___/
    */

    modifier isZeroAdrress(address _address) {
        if (_address == address(0)) revert MainPayment__ZeroAddress();
        _;
    }

    modifier isZeroAmount(uint256 _amount) {
        if (_amount == 0) revert MainPayment__ZeroAmount();
        _;
    }

    modifier isGHOPassportHolder() {
        if (!(s_ghoPassport.balanceOf(msg.sender) > 0)) revert MainPayment__OnlyGHOPassportHolders();
        _;
    }

    modifier isPartnerBookingContract() {
        if (!(s_utils.isPartnerBookingContractVaild(msg.sender))) revert MainPayment__OnlyPartnerBookingContract();
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

    function setMinimumAmt(uint256 _minimumAmt) public onlyOwner {
        s_minimumAmt = _minimumAmt;
    }

    /**
     * Function to pay with GHO and earn GP.
     * @param _recipient The address to receive the GHO tokens
     * @param _amount The amount of GHO tokens to pay
     */
    function payWithGHO(address _recipient, uint256 _amount)
        public
        isGHOPassportHolder
        isZeroAdrress(_recipient)
        isZeroAmount(_amount)
    {
        address _user = msg.sender;
        uint256 gpAmount = s_gpToken.balanceOf(address(this));

        if (s_ghoToken.balanceOf(_user) < _amount) revert MainPayment__NotEnoughGHO();

        uint256 gpRewardAmount = _calculateGPReward(_amount);
        if (gpAmount < gpRewardAmount) revert MainPayment__NotEnoughGP(gpAmount, gpRewardAmount);

        // transfer funds to the recipient
        s_ghoToken.transferFrom(_user, _recipient, _amount);
        emit MainPayment__PaidWithGHO(_recipient, _amount);

        // transfer GP to _user
        s_gpToken.transfer(_user, gpRewardAmount);
        emit MainPayment__GPRewarded(_user, gpRewardAmount, (gpAmount - gpRewardAmount));
    }

    /**
     * Function to pay with GHO and earn GP.
     * @param _recipient The address to receive the GHO tokens
     * @param _amount The amount of GHO tokens to pay
     * @param _sender The address of the sender
     * @notice This function is for partner booking contracts only.
     */

    function payWithGHO(address _sender, address _recipient, uint256 _amount)
        public
        isPartnerBookingContract
        isZeroAdrress(_recipient)
        isZeroAmount(_amount)
    {
        address _user = _sender;
        uint256 gpAmount = s_gpToken.balanceOf(address(this));

        if (s_ghoToken.balanceOf(_user) < _amount) revert MainPayment__NotEnoughGHO();

        uint256 gpRewardAmount = _calculateGPReward(_amount);
        if (gpAmount < gpRewardAmount) revert MainPayment__NotEnoughGP(gpAmount, gpRewardAmount);

        // transfer funds to the recipient
        s_ghoToken.transferFrom(_user, _recipient, _amount);
        emit MainPayment__PaidWithGHO(_recipient, _amount);

        // transfer GP to _user
        s_gpToken.transfer(_user, gpRewardAmount);
        emit MainPayment__GPRewarded(_user, gpRewardAmount, (gpAmount - gpRewardAmount));
    }

    /*
       _       _                        _    __                  _   _
      (_)_ __ | |_ ___ _ __ _ __   __ _| |  / _|_   _ _ __   ___| |_(_) ___  _ __  ___
      | | '_ \| __/ _ \ '__| '_ \ / _` | | | |_| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
      | | | | | ||  __/ |  | | | | (_| | | |  _| |_| | | | | (__| |_| | (_) | | | \__ \
      |_|_| |_|\__\___|_|  |_| |_|\__,_|_| |_|  \__,_|_| |_|\___|\__|_|\___/|_| |_|___/
    */

    /**
     * Function to calculate the amount of GP to reward.
     * @param _amount The amount of GHO tokens to pay
     * @return gpRewardAmount The amount of GP to reward
     * @dev If the amount of GHO is less than s_minimumAmt it returns 0 else the amount of GP to reward
     * is calculated as the amount of GHO tokens paid divided by the s_minimumAmt.
     */
    function _calculateGPReward(uint256 _amount) internal view returns (uint256 gpRewardAmount) {
        if (_amount < s_minimumAmt) return 0;

        gpRewardAmount = FixedPointMathLib.divWadDown(_amount, s_minimumAmt);
    }
}
