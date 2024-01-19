//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Test} from "forge-std/Test.sol";
import {console2} from "forge-std/console2.sol";
import {DevOpsTools} from "foundry-devops/src/DevOpsTools.sol";
import {ERC20} from "../../src/ERC4626Flatten.sol";

import {MainPayment} from "../../src/MainPayment.sol";
import {MainVault} from "../../src/MainVault.sol";
import {Utils} from "../../src/Utils.sol";

import {TestGHO} from "../mocks/TestGHO.sol";
import {TestGHOPassport} from "../mocks/TestGHOPassport.sol";

contract MainPaymentTest is Test {
    TestGHOPassport public s_ghoPassport;
    MainPayment public s_mainPayment;
    MainVault public s_mainVault;
    TestGHO public s_ghoToken;
    Utils public s_utils;

    uint256 public constant MIN_AMOUNT = 200e18;
    uint256 public constant GHO_TO_TRANSFER = 450e18;
    uint256 public constant GHO_TO_DEPOSIT = 10000e18;

    address public immutable USER = makeAddr("user");
    address public immutable ADMIN = makeAddr("admin");
    address public immutable RECIPIENT = makeAddr("recipient");
    address public immutable PARTNER_PAYMENT_CONTRACT = makeAddr("partnerPaymentContract");

    function setUp() external {
        s_utils = new Utils();

        s_ghoToken = new TestGHO();
        s_ghoToken.mint(USER, 10000e18);
        s_ghoToken.mint(ADMIN, 10000e18);

        s_ghoPassport = new TestGHOPassport();
        s_ghoPassport.mint(USER, 1);

        s_mainVault = new MainVault(ERC20(address(s_ghoToken)), ADMIN);
        s_mainPayment = new MainPayment(
            address(s_ghoToken),
            address(s_mainVault),
            address(s_ghoPassport),
            address(s_utils),
            MIN_AMOUNT,
            ADMIN
        );
    }

    modifier setUpVault() {
        vm.startPrank(ADMIN);
        s_mainVault.setMainPayment(address(s_mainPayment));
        s_ghoToken.approve(address(s_mainVault), GHO_TO_DEPOSIT);
        s_mainVault.depositGHO(GHO_TO_DEPOSIT);
        vm.stopPrank();

        vm.startPrank(USER);
        s_ghoToken.approve(address(s_mainPayment), GHO_TO_TRANSFER);
        vm.stopPrank();

        _;
    }

    function testPayWithGHONative() public setUpVault {
        uint256 _mainPaymentGPBalanceBefore = s_mainVault.balanceOf(address(s_mainPayment));

        vm.startPrank(USER);
        s_mainPayment.payWithGHO(RECIPIENT, GHO_TO_TRANSFER);
        vm.stopPrank();

        // GP Amount received by the user
        uint256 _mainPaymentGPBalanceAfter = s_mainVault.balanceOf(address(s_mainPayment));
        uint256 gpAmountTrasfer = (GHO_TO_TRANSFER * 1e18) / MIN_AMOUNT;
        assertEq(_mainPaymentGPBalanceAfter, _mainPaymentGPBalanceBefore - gpAmountTrasfer);

        // GHO Amount received by the recipient
        uint256 _ghoBalanceOfRecipient = s_ghoToken.balanceOf(RECIPIENT);
        assertEq(_ghoBalanceOfRecipient, GHO_TO_TRANSFER);
    }

    modifier setUpUtils() {
        vm.startPrank(ADMIN);
        s_utils.addPartnerContracts(PARTNER_PAYMENT_CONTRACT, makeAddr("partner_vault"));
        vm.stopPrank();

        _;
    }

    function testPayWithGHOthroughPartner() public setUpVault setUpUtils {
        uint256 _mainPaymentGPBalanceBefore = s_mainVault.balanceOf(address(s_mainPayment));

        vm.startPrank(PARTNER_PAYMENT_CONTRACT);
        s_mainPayment.payWithGHO(USER, RECIPIENT, GHO_TO_TRANSFER);
        vm.stopPrank();

        // GP Amount received by the user
        uint256 _mainPaymentGPBalanceAfter = s_mainVault.balanceOf(address(s_mainPayment));
        uint256 gpAmountTrasfer = (GHO_TO_TRANSFER * 1e18) / MIN_AMOUNT;
        assertEq(_mainPaymentGPBalanceAfter, _mainPaymentGPBalanceBefore - gpAmountTrasfer);

        // GHO Amount received by the recipient
        uint256 _ghoBalanceOfRecipient = s_ghoToken.balanceOf(RECIPIENT);
        assertEq(_ghoBalanceOfRecipient, GHO_TO_TRANSFER);
    }
}
