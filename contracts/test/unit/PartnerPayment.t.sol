//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Test} from "forge-std/Test.sol";
import {console2} from "forge-std/console2.sol";
import {DevOpsTools} from "foundry-devops/src/DevOpsTools.sol";
import {ERC20} from "../../src/ERC4626Flatten.sol";
import {PartnerPayment} from "../../src/PartnerPayment.sol";
import {RPool} from "../../src/RPool.sol";
import {PartnerVault} from "../../src/PartnerVault.sol";
import {MainPayment} from "../../src/MainPayment.sol";
import {MainVault} from "../../src/MainVault.sol";
import {Utils} from "../../src/Utils.sol";

import {TestGHO} from "../mocks/TestGHO.sol";
import {TestGHOPassport} from "../mocks/TestGHOPassport.sol";

contract PartnerPaymentTest is Test {
    RPool public s_rPool;
    PartnerVault public s_rpToken;
    PartnerPayment public s_partnerPayment;

    TestGHOPassport public s_ghoPassport;
    MainPayment public s_mainPayment;
    MainVault public s_mainVault;
    TestGHO public s_ghoToken;
    Utils public s_utils;

    uint256 public constant MIN_AMOUNT = 200e18;
    uint256 public constant GHO_TO_TRANSFER = 4500e18;
    uint256 public constant GHO_TO_DEPOSIT = 10000e18;
    uint256 public constant FEE_ON_RP = 2e15; // 0.2%
    uint256 public constant RP_TO_GHO_RATIO = 2e18; //100 CV =1 GHO
    uint8 public constant RP_TO_GHO_RATIO_DECIMALS = 2;
    uint256 public constant MAX_AMT_PERCENT_IN_RP = 70e16; // 0.7 * 100 = 70%

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

        s_rPool = new RPool(address(s_utils), address(s_ghoToken), FEE_ON_RP,  ADMIN);

        s_rpToken = new PartnerVault(
            ERC20(address(s_ghoToken)),
            "Club Vistara",
            "CV",
            PARTNER,
            address(s_rPool),
            ADMIN,
            RP_TO_GHO_RATIO_DECIMALS
        );

        s_partnerPayment = new PartnerPayment(
            address(s_rpToken),
            address(s_mainPayment),
            address(s_ghoPassport),
            MAX_AMT_PERCENT_IN_RP,
            PARTNER,
            RP_TO_GHO_RATIO
        );
    }

    modifier setUpScene() {
        // ADMIN deposits GHO to MainVault and minting GP to MainPayment
        vm.startPrank(ADMIN);
        s_mainVault.setMainPayment(address(s_mainPayment));
        s_ghoToken.approve(address(s_mainVault), GHO_TO_DEPOSIT);
        s_mainVault.depositGHO(GHO_TO_DEPOSIT);
        s_utils.addPartnerContracts(PARTNER, address(s_partnerPayment), address(s_rpToken));
        vm.stopPrank();

        // User payWithGHO to some recipient and earning GP
        vm.startPrank(USER);
        s_ghoToken.approve(address(s_mainPayment), GHO_TO_DEPOSIT);
        s_mainPayment.payWithGHO(RECIPIENT, GHO_TO_TRANSFER);
        s_mainVault.approve(address(s_rPool), GHO_TO_TRANSFER);
        vm.stopPrank();

        // Partner deposit GHO to Partner Vault and mint CV to Reward Pool
        vm.startPrank(PARTNER);
        s_ghoToken.approve(address(s_rpToken), GHO_TO_DEPOSIT);
        s_rpToken.depositGHO(GHO_TO_DEPOSIT);
        s_partnerPayment.setGhoPassport(address(s_ghoPassport));
        vm.stopPrank();

        // User swap GP to CV
        uint256 _userGPBalance = s_mainVault.balanceOf(USER);
        vm.startPrank(USER);
        s_rPool.swap(address(s_mainVault), address(s_rpToken), _userGPBalance);
        vm.stopPrank();
        _;
    }

    function testBookAService() public setUpScene {
        uint256 _userRPBalance = s_rpToken.balanceOf(USER);
        uint256 _userGPBalance = s_mainVault.balanceOf(USER);
        uint256 _userGHOBalance = s_ghoToken.balanceOf(USER);
        console2.log("User RP Balance: %s", _userRPBalance);
        console2.log("User GP Balance: %s", _userGPBalance);
        console2.log("User GHO Balance: %s", _userGHOBalance);

        uint256 _serviceAmount = 100e18;

        vm.startPrank(USER);
        s_rpToken.approve(address(s_partnerPayment), _userRPBalance);
        s_ghoToken.approve(address(s_partnerPayment), _serviceAmount);
        s_partnerPayment.bookAService(0, _serviceAmount);
        vm.stopPrank();
    }

    function testMaxAmountPayInRpCalculator() public setUpScene {
        uint256 _serviceAmount = 100e18;
        uint256 _maxAmountPayInRp = s_partnerPayment.maxAmountPayInRpCalculator(_serviceAmount);
        console2.log("Max Amount Pay In Rp: %s", _maxAmountPayInRp);
    }

    function testRpUtilisationCalculator() public setUpScene {
        uint256 _userRPBalance = s_rpToken.balanceOf(USER);
        console2.log("User RP Balance: %s", _userRPBalance / 1e18);

        uint256 _serviceAmount = 100e18;
        uint256 _amountToPayInGHO = s_partnerPayment.rpUtilisationCalculator(_userRPBalance, _serviceAmount);
        console2.log("Amount To Pay In GHO: %s", _amountToPayInGHO / 1e18);
    }
}
