//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {ERC20} from "@solmate/contracts/tokens/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Utils} from "./Utils.sol";
import {FixedPointMathLib} from "@solmate/contracts/utils/FixedPointMathLib.sol";
import {SafeTransferLib} from "@solmate/contracts/utils/SafeTransferLib.sol";
import {MainVault} from "./MainVault.sol";
import {PartnerVault} from "./PartnerVault.sol";

contract RPool is Ownable {
    using FixedPointMathLib for uint256;
    using SafeTransferLib for ERC20;

    address public s_utils;
    address public s_gpToken;
    address public s_ghoToken;
    address public s_mainVault;

    uint256 public s_feeOnRPs;
    uint256 public s_feeOnWithdrawl;
    uint256 public constant PRECESION = 1e18;

    function setUtils(address _utils) public onlyOwner {
        s_utils = _utils;
    }

    function setGPToken(address _gpToken) public onlyOwner {
        s_gpToken = _gpToken;
    }

    function setGHOToken(address _ghoToken) public onlyOwner {
        s_ghoToken = _ghoToken;
    }

    function setMainVault(address _mainVault) public onlyOwner {
        s_mainVault = _mainVault;
    }

    function setFeeOnRPs(uint256 _feeOnRPs) public onlyOwner {
        s_feeOnRPs = _feeOnRPs;
    }

    function setFeeOnWithdrawl(uint256 _feeOnWithdrawl) public onlyOwner {
        s_feeOnWithdrawl = _feeOnWithdrawl;
    }

    function swap(address _initialToken, address _finalToken, uint256 _initialTokenAmount) public {
        //TODO: if initialToken != gpToken then fee's divide b/w partner and user
        swapRouter(_initialToken, _finalToken, _initialTokenAmount);
    }

    function swapRouter(address _initialToken, address _finalToken, uint256 _initialTokenAmount) internal {
        address gpToken = s_gpToken;
        address ghoToken = s_ghoToken;

        if (_initialToken == ghoToken) {
            //...abi
        } else if (_initialToken == gpToken && _finalToken == ghoToken) {
            MainVault(s_mainVault).withdrawGHO(_initialTokenAmount, msg.sender, msg.sender);
        } else if (_initialToken != gpToken && _finalToken == ghoToken) {
            PartnerVault(_initialToken).withdrawGHO(_initialTokenAmount, msg.sender, msg.sender);
        } else {
            swapRP(_initialToken, _finalToken, _initialTokenAmount);
        }
    }

    function swapRP(address _initialToken, address _finalToken, uint256 _initialTokenAmount) public {
        (uint256 finalTokenAmount,) = feeCalculator(_initialToken, _finalToken, _initialTokenAmount);

        // receiving intial token from msg.sender
        ERC20(_initialToken).safeTransferFrom(msg.sender, address(this), _initialTokenAmount);

        // sending finalToken amount to msg.sender after deducting fee in finalToken.
        ERC20(_finalToken).safeTransferFrom(address(this), msg.sender, finalTokenAmount);
    }

    function feeCalculator(address _initialToken, address _finalToken, uint256 _initialTokenAmount)
        public
        view
        returns (uint256 finalTokenAmount, uint256 fee)
    {
        uint8 _initialTokenDecimals = ERC20(_initialToken).decimals();
        uint8 _finalTokenDecimals = ERC20(_finalToken).decimals();

        // 1 Gp -> 10 CV
        // CV = 1000 x 1e18
        // 1 GP -> 100 HP
        // HP = 100 x 1e18

        // 500 CV -> HP
        // = (( 100 x 1e18 / 10000 X 1e18 ) * 1e18) * 500
        // = (50 x 1e18) HP

        uint256 _toalFinalTokenAmt =
            FixedPointMathLib.divWadDown(_finalTokenDecimals, _initialTokenDecimals) * _initialTokenAmount;

        // s_userfee can be around 18 decimal places so we need to divide it by 1e18
        fee = (_toalFinalTokenAmt * s_feeOnRPs) / PRECESION;

        finalTokenAmount = _toalFinalTokenAmt - fee;
    }
}
