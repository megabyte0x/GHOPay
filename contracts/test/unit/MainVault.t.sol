//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Test} from "forge-std/Test.sol";
import {console2} from "forge-std/console2.sol";
import {DevOpsTools} from "foundry-devops/src/DevOpsTools.sol";

import {TestGHOPartnerPassport} from "../mocks/TestGHOPartnerPassport.sol";

import {TestMainVault} from "../mocks/TestMainVault.sol";
import {TestGHO} from "../mocks/TestGHO.sol";
import {HelperConfig} from "../../script/HelperConfig.s.sol";
import {DeployTestGHO} from "../../script/DeployTestGHO.s.sol";
import {DeployMainVault} from "../../script/DeployMainVault.s.sol";
import {ERC20} from "../../src/ERC4626Flatten.sol";
import {SigUtils} from "../SigUtils.sol";

import {TestRPool} from "../mocks/TestRPool.sol";

contract MainVaultTest is Test {
    TestMainVault public s_mainVault;
    HelperConfig public s_helperConfig;
    SigUtils public s_sigUtils;
    TestGHO public s_ghoToken;

    address public s_mainDeployerAddress;
    address public s_rewardPool;
    address public s_ghoPartnerPassport;
    address public s_ghoPassport;
    address public s_utils;
    uint256 public constant GHO_TOKEN_TO_MINT = 10000e18;
    uint8 public constant PARTNER_FEE = 10;
    uint8 public constant USER_FEE = 30;
    uint256 public constant FEE_ON_RP = 2e17;
    address public immutable PARTNER_ADDRESS = makeAddr("PARTNER_ADDRESS");
    address public immutable USER_ADDRESS = makeAddr("USER_ADDRESS");
    uint256 _pvtKey = 123;
    address public s_mainAdmin = vm.addr(_pvtKey);

    function setUp() external {
        DeployTestGHO deployTestGHO = new DeployTestGHO();
        s_helperConfig = new HelperConfig();

        s_mainDeployerAddress = s_helperConfig.s_mainDeployer();

        s_utils = s_helperConfig.getUtils(block.chainid);
        s_ghoPartnerPassport = address(new TestGHOPartnerPassport());
        s_ghoPassport = s_helperConfig.getGhoPassport(block.chainid);

        s_ghoToken = new TestGHO();
        s_sigUtils = new SigUtils(s_ghoToken.DOMAIN_SEPARATOR());

        TestGHO(s_ghoToken).mint(s_mainAdmin, GHO_TOKEN_TO_MINT);

        DeployMainVault deployMainVault = new DeployMainVault();
        s_mainVault = new TestMainVault(ERC20(address(s_ghoToken)), s_mainAdmin);

        s_rewardPool = address(new TestRPool(s_utils, address(s_ghoToken), FEE_ON_RP, s_mainAdmin));
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
        // s_mainVault.setRewardPool(address(this));
    }

    modifier setUpMainVault() {
        vm.startPrank(s_mainAdmin);
        s_mainVault.setUserFee(USER_FEE);
        s_mainVault.setPartnerFee(PARTNER_FEE);
        // s_mainVault.setRewardPool(s_rewardPool);
        vm.stopPrank();
        _;
    }

    function testDepositGHOWithPermit() public setUpMainVault {
        vm.startPrank(s_mainAdmin);

        uint256 nonce = vm.getNonce(s_mainAdmin);
        console2.log("nonce", nonce);
        bytes32 _digest = generateDigest(s_mainAdmin, address(s_mainVault), GHO_TOKEN_TO_MINT, nonce, type(uint256).max);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(_pvtKey, _digest);

        s_mainVault.depositGHOWithPermit(GHO_TOKEN_TO_MINT, v, r, s);

        vm.stopPrank();

        uint256 _ghoBalanceOfVault = (s_ghoToken).balanceOf(address(s_mainVault));
        assertEq(_ghoBalanceOfVault, GHO_TOKEN_TO_MINT);
    }

    modifier setUpMainVaultWithDeposit() {
        vm.startPrank(s_mainAdmin);
        s_mainVault.setUserFee(USER_FEE);
        s_mainVault.setPartnerFee(PARTNER_FEE);
        // s_mainVault.setRewardPool(s_rewardPool);
        (s_ghoToken).approve(address(s_mainVault), GHO_TOKEN_TO_MINT);
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

        assertEq((s_ghoToken).balanceOf(s_mainAdmin), _ghoToWithdraw);
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
        assertEq((s_ghoToken).balanceOf(PARTNER_ADDRESS), _ghoPayableToPartner);
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
        assertEq((s_ghoToken).balanceOf(USER_ADDRESS), _ghoPayableToUser);
        vm.stopPrank();
    }

    function generateDigest(address _owner, address _spender, uint256 _value, uint256 _nonce, uint256 _deadline)
        public
        returns (bytes32 digest)
    {
        SigUtils.Permit memory permit =
            SigUtils.Permit({owner: _owner, spender: _spender, value: _value, nonce: _nonce, deadline: _deadline});

        digest = s_sigUtils.getTypedDataHash(permit);
    }
}
