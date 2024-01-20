//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Test} from "forge-std/Test.sol";
import {console2} from "forge-std/console2.sol";

import {TestGHO} from "../mocks/TestGHO.sol";

import {Utils} from "../../src/Utils.sol";

contract UtilsTest is Test {
    Utils public s_utils;

    function setUp() external {
        s_utils = new Utils();

        TestGHO _partnerVault = new TestGHO();

        // add some partners
        s_utils.addPartnerContracts(makeAddr("PARTNER"), makeAddr("partnerPayment"), address(_partnerVault));
    }

    function testIfSamePartnerAddedTwice() external {
        TestGHO _partnerVault2 = new TestGHO();

        s_utils.addPartnerContracts(makeAddr("PARTNER"), makeAddr("partnerPayment1"), address(_partnerVault2));

        (address[] memory _partnerPayments, uint256[] memory _balances) = s_utils.balanceOf(makeAddr("fdfd"));

        assertEq(_partnerPayments.length, 1);
    }

    function testIfPartnerAddedIncreasedArray() external {
        TestGHO _partnerVault2 = new TestGHO();

        s_utils.addPartnerContracts(makeAddr("PARTNER2"), makeAddr("partnerPayment1"), address(_partnerVault2));

        (address[] memory _partnerPayments, uint256[] memory _balances) = s_utils.balanceOf(makeAddr("fdfd"));

        assertEq(_partnerPayments.length, 2);
    }
}
