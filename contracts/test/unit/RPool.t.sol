// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Test} from "forge-std/Test.sol";
import {console2} from "forge-std/console2.sol";
import {DevOpsTools} from "foundry-devops/src/DevOpsTools.sol";
import {ERC20} from "../../src/ERC4626Flatten.sol";

import {PartnerPayment} from "../../src/PartnerPayment.sol";
import {PartnerVault} from "../../src/PartnerVault.sol";
import {MainPayment} from "../../src/MainPayment.sol";
import {MainVault} from "../../src/MainVault.sol";
import {RPool} from "../../src/RPool.sol";
import {Utils} from "../../src/Utils.sol";

import {TestGHO} from "../mocks/TestGHO.sol";
import {TestGHOPassport} from "../mocks/TestGHOPassport.sol";

contract RPoolTest is Test {
    PartnerPayment public s_partnerPayment;
    TestGHOPassport public s_ghoPassport;
    PartnerVault public s_partnerVault;
    MainPayment public s_mainPayment;
    MainVault public s_mainVault;
    TestGHO public s_ghoToken;
    Utils public s_utils;
    RPool public s_rPool;

    uint256 public constant MIN_AMOUNT = 200e18;
    uint256 public constant GHO_TO_TRANSFER = 450e18;
    uint256 public constant GHO_TO_DEPOSIT = 10000e18;
    uint256 public constant FEE_ON_RP = 2e17;
    uint8 public constant RP_TO_GHO = 2; // this means 100 CV  = 1 GHO

    address public immutable USER = makeAddr("user");
    address public immutable ADMIN = makeAddr("admin");
    address public immutable RECIPIENT = makeAddr("recipient");
    address public immutable PARTNER = makeAddr("partner");

    function setUp() external {
        s_utils = new Utils();

        s_ghoToken = new TestGHO();
        s_ghoToken.mint(USER, 10000e18);
        s_ghoToken.mint(ADMIN, 10000e18);
        s_ghoToken.mint(PARTNER, 10000e18);

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

        s_rPool = new RPool(
            address(s_utils),
            address(s_ghoToken),
            FEE_ON_RP,
            ADMIN
        );
        s_partnerVault =
            new PartnerVault(ERC20(address(s_ghoToken)), "CLUB VISTARA", "CV", PARTNER, address(s_rPool),RP_TO_GHO);
    }

    modifier setUpScene() {
        // ADMIN deposits GHO to MainVault and minting GP to MainPayment
        vm.startPrank(ADMIN);
        s_mainVault.setMainPayment(address(s_mainPayment));
        s_ghoToken.approve(address(s_mainVault), GHO_TO_DEPOSIT);
        s_mainVault.depositGHO(GHO_TO_DEPOSIT);
        vm.stopPrank();

        // User payWithGHO to some recipient and earning GP
        vm.startPrank(USER);
        s_ghoToken.approve(address(s_mainPayment), GHO_TO_TRANSFER);
        s_mainPayment.payWithGHO(RECIPIENT, GHO_TO_TRANSFER);
        s_mainVault.approve(address(s_rPool), GHO_TO_TRANSFER);
        vm.stopPrank();

        // Partner deposit GHO to Partner Vault and mint CV to Reward Payment
        vm.startPrank(PARTNER);
        s_ghoToken.approve(address(s_partnerVault), GHO_TO_DEPOSIT);
        s_partnerVault.depositGHO(GHO_TO_DEPOSIT);
        vm.stopPrank();
        _;
    }

    function testSwapGPtoCV() public setUpScene {
        uint256 _userGPBalance = s_mainVault.balanceOf(USER);
        uint256 _rPoolCVBalanceBefore = s_partnerVault.balanceOf(address(s_rPool));
        uint256 _rPoolGPBalanceBefore = s_mainVault.balanceOf(address(s_rPool));

        vm.startPrank(USER);
        s_rPool.swap(address(s_mainVault), address(s_partnerVault), _userGPBalance);
        vm.stopPrank();

        uint256 _rPoolCVBalanceAfter = s_partnerVault.balanceOf(address(s_rPool));
        uint256 _rPoolGPBalanceAfter = s_mainVault.balanceOf(address(s_rPool));
        uint256 _userCVBalanceAfter = s_partnerVault.balanceOf(USER);

        uint256 _userCVBalanceShouldBe = 2e18;
        uint256 _rPoolCVBalanceShouldBe = _rPoolCVBalanceBefore - _userCVBalanceShouldBe;
        uint256 _rPoolGPBalanceShouldBe = _rPoolGPBalanceBefore + _userGPBalance;

        assertEq(_userCVBalanceAfter, _userCVBalanceShouldBe);
        assertEq(_rPoolCVBalanceAfter, _rPoolCVBalanceShouldBe);
        assertEq(_rPoolGPBalanceAfter, _rPoolGPBalanceShouldBe);
    }
}
