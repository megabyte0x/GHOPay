//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {ERC20, SafeTransferLib, FixedPointMathLib} from "./ERC4626Flatten.sol";

import {Utils} from "./Utils.sol";
import {MainVault} from "./MainVault.sol";
import {PartnerVault} from "./PartnerVault.sol";

/**
 * @title RPool
 * @author Megabyte
 * @notice RPool is LP pool that swaps among RPs, GP and GHO token.
 */
contract RPool is Ownable {
    error RPool__ZeroAddress();
    error RPool__ZeroAmount();
    error RPool__OnlyRPs();

    event RPool__RPsSwapped();
    event RPool__GHOWithdrawn();

    /*
           _        _                         _       _     _
       ___| |_ __ _| |_ ___  __   ____ _ _ __(_) __ _| |__ | | ___  ___
      / __| __/ _` | __/ _ \ \ \ / / _` | '__| |/ _` | '_ \| |/ _ \/ __|
      \__ \ || (_| | ||  __/  \ V / (_| | |  | | (_| | |_) | |  __/\__ \
      |___/\__\__,_|\__\___|   \_/ \__,_|_|  |_|\__,_|_.__/|_|\___||___/
    */

    using FixedPointMathLib for uint256;
    using SafeTransferLib for ERC20;

    address public s_utils;
    address public s_ghoToken;
    address public s_mainVault;
    address public s_mainAdmin;

    uint256 public s_feeOnRPs;

    constructor(address _utils, address _ghoToken, uint256 _feeOnRPs, address _mainAdmin) Ownable(_mainAdmin) {
        s_utils = _utils;
        s_ghoToken = _ghoToken;
        s_mainAdmin = _mainAdmin;
        s_feeOnRPs = _feeOnRPs;
    }

    /*
                           _ _  __ _
       _ __ ___   ___   __| (_)/ _(_) ___ _ __ ___
      | '_ ` _ \ / _ \ / _` | | |_| |/ _ \ '__/ __|
      | | | | | | (_) | (_| | |  _| |  __/ |  \__ \
      |_| |_| |_|\___/ \__,_|_|_| |_|\___|_|  |___/
    */

    modifier isZeroAdrress(address _address) {
        if (_address == address(0)) revert RPool__ZeroAddress();
        _;
    }

    modifier isZeroAmount(uint256 _amount) {
        if (_amount == 0) revert RPool__ZeroAmount();
        _;
    }

    modifier onlyRPs(address _initialToken, address _finalToken) {
        if (_finalToken == s_ghoToken) revert RPool__OnlyRPs();
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

    function setUtils(address _utils) public onlyOwner isZeroAdrress(_utils) {
        s_utils = _utils;
    }

    function setGHOToken(address _ghoToken) public onlyOwner isZeroAdrress(_ghoToken) {
        s_ghoToken = _ghoToken;
    }

    function setMainVault(address _mainVault) public onlyOwner isZeroAdrress(_mainVault) {
        s_mainVault = _mainVault;
    }

    function setFeeOnRPs(uint256 _feeOnRPs) public onlyOwner isZeroAmount(_feeOnRPs) {
        s_feeOnRPs = _feeOnRPs;
    }

    function setMainAdmin(address _mainAdmin) public onlyOwner isZeroAdrress(_mainAdmin) {
        s_mainAdmin = _mainAdmin;
    }

    /**
     * Function to swap beween RP tokens and GHO token.
     * @param _initialToken The token that user wants to swap
     * @param _finalToken The token that user wants to receive
     * @param _initialTokenAmount The amount of initial token that user wants to swap
     * @notice This function charges different fee on each swap depending upon the tokens.
     */
    function swap(address _initialToken, address _finalToken, uint256 _initialTokenAmount)
        public
        isZeroAdrress(_initialToken)
        isZeroAdrress(_finalToken)
        isZeroAmount(_initialTokenAmount)
    {
        //TODO: if initialToken != gpToken then fee's divide b/w partner and user
        swapRouter(_initialToken, _finalToken, _initialTokenAmount);
    }

    /**
     * Function to swap among RPs.
     * @param _initialToken The token that user wants to swap
     * @param _finalToken The token that user wants to receive
     * @param _initialTokenAmount The amount of initial token that user wants to swap
     * @notice This function charges nominal fee on each swap. The fee is charged in final token and remaining is sent to user.
     */
    function swapRP(address _initialToken, address _finalToken, uint256 _initialTokenAmount)
        public
        isZeroAdrress(_initialToken)
        isZeroAdrress(_finalToken)
        isZeroAmount(_initialTokenAmount)
        onlyRPs(_initialToken, _finalToken)
    {
        (uint256 finalTokenAmount,) = feeCalculatorForRPs(_initialToken, _finalToken, _initialTokenAmount);

        // receiving intial token from msg.sender
        ERC20(_initialToken).safeTransferFrom(msg.sender, address(this), _initialTokenAmount);

        // sending finalToken amount to msg.sender after deducting fee in finalToken.
        ERC20(_finalToken).safeTransfer(msg.sender, finalTokenAmount);
    }

    /**
     *
     * @param _initialToken The token that user wants to swap
     * @param _finalToken The token that user wants to receive
     * @param _initialTokenAmount The amount of initial token that user wants to swap
     * @return finalTokenAmount The amount of final token that user will receive after fee deduction.
     * @return fee The amount of fee that will be deducted from the final token.
     */
    function feeCalculatorForRPs(address _initialToken, address _finalToken, uint256 _initialTokenAmount)
        public
        view
        isZeroAdrress(_initialToken)
        isZeroAdrress(_finalToken)
        isZeroAmount(_initialTokenAmount)
        returns (uint256 finalTokenAmount, uint256 fee)
    {
        uint8 _initialTokenDecimals = ERC20(_initialToken).decimals();
        uint8 _finalTokenDecimals = ERC20(_finalToken).decimals();

        // 1 GP -> 10 CV
        // CV = 1000 x 1e18
        // 1 GP -> 100 HP
        // HP = 100 x 1e18

        // 500 CV -> HP
        // = (( 100 x 1e18 / 10000 X 1e18 ) * 1e18) * 500
        // = (50 x 1e18) HP

        uint256 _toalFinalTokenAmt = FixedPointMathLib.mulWadDown(
            FixedPointMathLib.divWadDown(_finalTokenDecimals, _initialTokenDecimals), _initialTokenAmount
        );

        // s_userfee can be around 18 decimal places so we need to divide it by 1e18
        fee = FixedPointMathLib.mulWadDown(_toalFinalTokenAmt, s_feeOnRPs);

        finalTokenAmount = _toalFinalTokenAmt - fee;
    }

    /*
       _       _                        _    __                  _   _
      (_)_ __ | |_ ___ _ __ _ __   __ _| |  / _|_   _ _ __   ___| |_(_) ___  _ __  ___
      | | '_ \| __/ _ \ '__| '_ \ / _` | | | |_| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
      | | | | | ||  __/ |  | | | | (_| | | |  _| |_| | | | | (__| |_| | (_) | | | \__ \
      |_|_| |_|\__\___|_|  |_| |_|\__,_|_| |_|  \__,_|_| |_|\___|\__|_|\___/|_| |_|___/
    */

    /**
     *
     * @param _initialToken The token that user wants to swap
     * @param _finalToken The token that user wants to receive
     * @param _initialTokenAmount The amount of initial token that user wants to swap
     * @notice This function charges different fee on each swap depending upon the tokens.
     * @dev If the initial token is GP and final token is GHO then swap will be routed to MainVault.
     * This will act as user withdrawing GHO in exchange for GP.
     * @dev If the initial token is RP and final token is GHO then swap will be routed to Partner Vault.
     * This will act as user withdrawing GP in exchange for GHO.
     * @dev In any other case, the swap will be routed to swapRP function. Charging nominal fee for swap.
     */
    function swapRouter(address _initialToken, address _finalToken, uint256 _initialTokenAmount) internal {
        address gpToken = s_mainVault;
        address ghoToken = s_ghoToken;

        if (_initialToken == gpToken && _finalToken == ghoToken) {
            MainVault(gpToken).withdrawGHO(_initialTokenAmount, msg.sender, msg.sender);
            emit RPool__GHOWithdrawn();
        } else if (_initialToken != gpToken && _finalToken == ghoToken) {
            uint256 _ghoAmount = decimalCorrectionFromRPtoCV(_initialTokenAmount, _initialToken);
            PartnerVault(_initialToken).withdrawGHO(_ghoAmount, msg.sender, msg.sender);
            emit RPool__GHOWithdrawn();
        } else {
            swapRP(_initialToken, _finalToken, _initialTokenAmount);
            emit RPool__RPsSwapped();
        }
    }

    function decimalCorrectionFromRPtoCV(uint256 _amount, address _rpToken) public returns (uint256 _ghoAmount) {
        uint256 rpDecimals = ERC20(_rpToken).decimals();
        uint256 extraDecimals = rpDecimals - 18;
        if (extraDecimals > 0) {
            _ghoAmount = FixedPointMathLib.divWadDown(_amount, 10 ** extraDecimals);
        } else if (extraDecimals == 0) {
            _ghoAmount = _amount;
        }
    }
}
