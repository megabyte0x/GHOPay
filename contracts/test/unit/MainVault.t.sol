//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Test} from "forge-std/Test.sol";
import {console2} from "forge-std/console2.sol";
import {DevOpsTools} from "foundry-devops/src/DevOpsTools.sol";

import {MainVault} from "../../src/MainVault.sol";
import {TestGHO} from "../../src/TestGHO.sol";
import {DeployMainVault} from "../../script/DeployMainVault.s.sol";
import {DeployTestGHO} from "../../script/DeployTestGHO.s.sol";
import {HelperConfig} from "../../script/HelperConfig.s.sol";

contract MainVaultTest is Test {
    MainVault public s_mainVault;
    HelperConfig public s_helperConfig;
    uint256 public s_mainDeployerKey;
    address public s_mainAdmin;

    address public MAIN_DEPLOYER = makeAddr("MAIN_DEPLOYER");
    uint256 public constant GHO_TOKEN_TO_MINT = 10000e18;
    uint8 public constant PARTNER_FEE = 10;

    function setUp() external {
        DeployTestGHO deployTestGHO = new DeployTestGHO();
        s_helperConfig = new HelperConfig();

        s_mainDeployerKey = s_helperConfig.s_mainDeployerKey();
        s_mainAdmin = s_helperConfig.s_mainAdmin();

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
        s_mainVault.setUserFee(PARTNER_FEE);
    }

    function testSetRewardPool() external {
        vm.expectRevert();
        s_mainVault.setRewardPool(address(this));
    }

    function testSetFeeCollector() external {
        vm.expectRevert();
        s_mainVault.setFeeCollector(address(this));
    }

    function testDepositGHO() external {
        vm.startPrank(s_mainDeployerKey);
        s_mainVault.depositGHO(GHO_TOKEN_TO_MINT);
        vm.stopPrank();
    }
}
