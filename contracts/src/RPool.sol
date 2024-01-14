//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {ERC20} from "@solmate/contracts/tokens/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Utils} from "./Utils.sol";
import {FixedPointMathLib} from "@solmate/contracts/utils/FixedPointMathLib.sol";
import {SafeTransferLib} from "@solmate/contracts/utils/SafeTransferLib.sol";

contract RPool is Ownable {
    using FixedPointMathLib for uint256;
    using SafeTransferLib for ERC20;

    address public s_ghoToken;
    address public s_utils;

    uint256 public s_feeOnRPs;
    uint256 public s_feeOnWithdrawl;
    uint256 public constant PRECESION = 1e18;

    constructor(address _ghoToken, address _utils) {
        s_ghoToken = _ghoToken;
        s_utils = _utils;
    }

    function setGHOToken(address _ghoToken) public onlyOwner {
        s_ghoToken = _ghoToken;
    }

    function setUtils(address _utils) public onlyOwner {
        s_utils = _utils;
    }

    function setFeeOnRPs(uint256 _feeOnRPs) public onlyOwner {
        s_feeOnRPs = _feeOnRPs;
    }

    function setFeeOnWithdrawl(uint256 _feeOnWithdrawl) public onlyOwner {
        s_feeOnWithdrawl = _feeOnWithdrawl;
    }

    function swap(address _tokenA, address _tokenB, uint256 _amountA) public {
        (uint256 amountB,) = feeCalculator(_tokenA, _tokenB, _amountA);

        // receiving TOKEN A
        ERC20(_tokenA).safeTransferFrom(msg.sender, address(this), _amountA);

        // sending TOKEN B to msg.sender with fee deduction in Token B
        ERC20(_tokenB).safeTransferFrom(address(this), msg.sender, amountB);
    }

    function getSwapPreview(address _tokenA, address _tokenB, uint256 _amountA)
        public
        view
        returns (uint256 _remainingAmountB)
    {
        (uint256 amountB,) = feeCalculator(_tokenA, _tokenB, _amountA);

        _remainingAmountB = amountB;
    }

    function feeCalculator(address _tokenA, address _tokenB, uint256 _amountA)
        public
        view
        returns (uint256 amountB, uint256 fee)
    {
        uint8 _decimalsA = ERC20(_tokenA).decimals();
        uint8 _decimalsB = ERC20(_tokenB).decimals();

        // amountA * decimalsB / decimalsA
        uint256 _totalAmountB = FixedPointMathLib.divWadDown(_decimalsB, _decimalsA) * _amountA;

        // s_userfee can be around 18 decimal places so we need to divide it by 1e18
        if (_tokenA != s_ghoToken && _tokenB != s_ghoToken) {
            fee = (_totalAmountB * s_feeOnRPs) / PRECESION;
        } else {
            fee = (_totalAmountB * s_feeOnWithdrawl) / PRECESION;
        }

        amountB = _totalAmountB - fee;
    }
}
