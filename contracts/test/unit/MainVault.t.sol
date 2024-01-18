//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Test} from "forge-std/Test.sol";
import {console2} from "forge-std/console2.sol";
import {DevOpsTools} from "foundry-devops/src/DevOpsTools.sol";

import {TestGHOPartnerPassport} from "../unit/mocks/TestGHOPartnerPassport.sol";

import {MainVault} from "../../src/MainVault.sol";
import {TestGHO} from "../unit/mocks/TestGHO.sol";
import {HelperConfig} from "../../script/HelperConfig.s.sol";
import {DeployTestGHO} from "../../script/DeployTestGHO.s.sol";
import {DeployMainVault} from "../../script/DeployMainVault.s.sol";
import {ERC20} from "../../src/ERC4626Flatten.sol";

import {TestRPool} from "../unit/mocks/TestRPool.sol";

contract MainVaultTest is Test {
    MainVault public s_mainVault;
    HelperConfig public s_helperConfig;
    uint256 public s_mainDeployerKey;
    address public s_mainAdmin;
    address public s_mainDeployerAddress;
    address public s_rewardPool;
    address public s_ghoPartnerPassport;
    address public s_ghoPassport;
    address public s_utils;
    address public s_ghoToken;
    uint256 public constant GHO_TOKEN_TO_MINT = 10000e18;
    uint8 public constant PARTNER_FEE = 10;
    uint8 public constant USER_FEE = 30;
    uint256 public constant FEE_ON_RP = 2e17;
    address public immutable PARTNER_ADDRESS = makeAddr("PARTNER_ADDRESS");
    address public immutable USER_ADDRESS = makeAddr("USER_ADDRESS");

    function setUp() external {
        DeployTestGHO deployTestGHO = new DeployTestGHO();
        s_helperConfig = new HelperConfig();

        s_mainDeployerKey = s_helperConfig.s_mainDeployerKey();
        s_mainAdmin = s_helperConfig.s_mainAdmin();
        s_mainDeployerAddress = s_helperConfig.s_mainDeployer();

        s_utils = s_helperConfig.getUtils(block.chainid);
        s_ghoPartnerPassport = address(new TestGHOPartnerPassport());
        s_ghoPassport = s_helperConfig.getGhoPassport(block.chainid);

        s_ghoToken = deployTestGHO.run();

        TestGHO(s_ghoToken).mint(s_mainAdmin, GHO_TOKEN_TO_MINT);

        DeployMainVault deployMainVault = new DeployMainVault();
        s_mainVault = MainVault(deployMainVault.run(s_ghoToken));

        s_rewardPool = address(new TestRPool(s_utils, s_ghoToken, FEE_ON_RP, s_mainAdmin));
        TestRPool(s_rewardPool).setGPToken(address(s_mainVault));
    }

    function testSetPartnerFee() external {
        vm.expectRevert();
        s_mainVault.setPartnerFee(PARTNER_FEE);
    }

    function testSetUserFee() external {
        vm.expectRevert();
        s_mainVault.setUserFee(USER_FEE);
    }

    function testSetRewardPool() external {
        vm.expectRevert();
        s_mainVault.setRewardPool(address(this));
    }

    modifier setUpMainVault() {
        vm.startPrank(s_mainAdmin);
        s_mainVault.setUserFee(USER_FEE);
        s_mainVault.setPartnerFee(PARTNER_FEE);
        s_mainVault.setRewardPool(s_rewardPool);
        vm.stopPrank();
        _;
    }

    function testDepositGHO() public setUpMainVault {
        vm.startPrank(s_mainAdmin);

        ERC20(s_ghoToken).approve(address(s_mainVault), GHO_TOKEN_TO_MINT);
        s_mainVault.depositGHO(GHO_TOKEN_TO_MINT);

        vm.stopPrank();

        uint256 _ghoBalanceOfVault = ERC20(s_ghoToken).balanceOf(address(s_mainVault));
        assertEq(_ghoBalanceOfVault, GHO_TOKEN_TO_MINT);
    }

    modifier setUpMainVaultWithDeposit() {
        vm.startPrank(s_mainAdmin);
        s_mainVault.setUserFee(USER_FEE);
        s_mainVault.setPartnerFee(PARTNER_FEE);
        s_mainVault.setRewardPool(s_rewardPool);
        ERC20(s_ghoToken).approve(address(s_mainVault), GHO_TOKEN_TO_MINT);
        s_mainVault.depositGHO(GHO_TOKEN_TO_MINT);
        vm.stopPrank();
        _;
    }

    function testWithdrawGHOAsOwner() public setUpMainVaultWithDeposit {
        uint256 _ghoToWithdraw = 100e18;

        vm.startPrank(s_mainAdmin);

        /////////SEETUP START/////////
        TestRPool(s_rewardPool).transferGp(_ghoToWithdraw, s_mainAdmin);
        /////////SEETUP END/////////

        s_mainVault.withdrawGHO(_ghoToWithdraw, s_mainAdmin, s_mainAdmin);
        vm.stopPrank();

        assertEq(ERC20(s_ghoToken).balanceOf(s_mainAdmin), _ghoToWithdraw);
    }

    function testWithdrawGHOAsPartner() public setUpMainVaultWithDeposit {
        uint256 _ghoToWithdraw = 100e18;

        /////////SEETUP START/////////
        vm.startPrank(s_mainAdmin);
        s_mainVault.setGHOPartnerPassport(s_ghoPartnerPassport);
        TestRPool(s_rewardPool).transferGp(_ghoToWithdraw, PARTNER_ADDRESS);
        TestGHOPartnerPassport(s_ghoPartnerPassport).mint(PARTNER_ADDRESS, 0);
        vm.stopPrank();
        /////////SEETUP END/////////

        vm.startPrank(PARTNER_ADDRESS);
        s_mainVault.withdrawGHO(_ghoToWithdraw, PARTNER_ADDRESS, PARTNER_ADDRESS);
        uint256 _ghoPayableToPartner = _ghoToWithdraw - (_ghoToWithdraw * PARTNER_FEE) / 100;
        assertEq(ERC20(s_ghoToken).balanceOf(PARTNER_ADDRESS), _ghoPayableToPartner);
        vm.stopPrank();
    }

    function testWithdrawGHOAsUser() public setUpMainVaultWithDeposit {
        uint256 _ghoToWithdraw = 100e18;

        /////////SEETUP START/////////
        vm.startPrank(s_mainAdmin);
        s_mainVault.setGHOPartnerPassport(s_ghoPartnerPassport);
        TestRPool(s_rewardPool).transferGp(_ghoToWithdraw, USER_ADDRESS);
        vm.stopPrank();
        /////////SEETUP END/////////

        vm.startPrank(USER_ADDRESS);
        s_mainVault.withdrawGHO(_ghoToWithdraw, USER_ADDRESS, USER_ADDRESS);
        uint256 _ghoPayableToUser = _ghoToWithdraw - (_ghoToWithdraw * USER_FEE) / 100;
        assertEq(ERC20(s_ghoToken).balanceOf(USER_ADDRESS), _ghoPayableToUser);
        vm.stopPrank();
    }
}
