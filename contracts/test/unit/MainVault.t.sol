//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Test} from "forge-std/Test.sol";
import {console2} from "forge-std/console2.sol";
import {DevOpsTools} from "foundry-devops/src/DevOpsTools.sol";

import {MainVault} from "../../src/MainVault.sol";
import {TestGHO} from "../unit/mocks/TestGHO.sol";
import {HelperConfig} from "../../script/HelperConfig.s.sol";
import {DeployTestGHO} from "../../script/DeployTestGHO.s.sol";
import {DeployMainVault} from "../../script/DeployMainVault.s.sol";

contract MainVaultTest is Test {
    MainVault public s_mainVault;
    HelperConfig public s_helperConfig;
    uint256 public s_mainDeployerKey;
    address public s_mainAdmin;
    address public s_mainDeployerAddress;
    address public s_rewardPool;
    uint256 public constant GHO_TOKEN_TO_MINT = 10000e18;
    uint8 public constant PARTNER_FEE = 10;
    uint8 public constant USER_FEE = 30;

    function setUp() external {
        DeployTestGHO deployTestGHO = new DeployTestGHO();
        s_helperConfig = new HelperConfig();

        s_mainDeployerKey = s_helperConfig.s_mainDeployerKey();
        s_mainAdmin = s_helperConfig.s_mainAdmin();
        s_mainDeployerAddress = s_helperConfig.s_mainDeployer();

        s_rewardPool = s_helperConfig.getRPoolAddress(block.chainid);

        address _ghoToken = deployTestGHO.run();

        TestGHO(_ghoToken).mint(s_mainAdmin, GHO_TOKEN_TO_MINT);

        DeployMainVault deployMainVault = new DeployMainVault();
        s_mainVault = MainVault(deployMainVault.run());
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
        s_mainVault.depositGHO(GHO_TOKEN_TO_MINT);
        vm.stopPrank();
    }

    modifier setUpMainVaultWithDeposit() {
        vm.startPrank(s_mainAdmin);
        s_mainVault.setUserFee(USER_FEE);
        s_mainVault.setPartnerFee(PARTNER_FEE);
        s_mainVault.setRewardPool(s_rewardPool);
        s_mainVault.depositGHO(GHO_TOKEN_TO_MINT);
        vm.stopPrank();
        _;
    }

    function testGPBalanceAfterGHODeposit() public setUpMainVaultWithDeposit {
        uint256 _gpBalance = s_mainVault.balanceOf(s_rewardPool);
        console2.log("GP Balance: %s", _gpBalance);
        assertEq(_gpBalance, GHO_TOKEN_TO_MINT);
    }

    // function testWithdrawGHOAsOwner() public setUpMainVaultWithDeposit {
    //     vm.startPrank(s_mainDeployerAddress);
    //     s_mainVault.withdrawGHO(GHO_TOKEN_TO_MINT, address(this), s_mainDeployerAddress);
    //     vm.stopPrank();
    // }
}
