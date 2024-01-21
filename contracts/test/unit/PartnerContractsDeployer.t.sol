//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Test} from "forge-std/Test.sol";
import {console2} from "forge-std/console2.sol";
import {DevOpsTools} from "foundry-devops/src/DevOpsTools.sol";

import {PartnerContractsDeployer} from "../../src/PartnerContractsDeployer.sol";
import {MainPayment} from "../../src/MainPayment.sol";
import {MainVault} from "../../src/MainVault.sol";
import {Utils} from "../../src/Utils.sol";

import {TestGHO} from "../mocks/TestGHO.sol";
import {TestGHOPassport} from "../mocks/TestGHOPassport.sol";
import {ERC20} from "../../src/ERC4626Flatten.sol";

contract PartnerContractDeployerTest is Test {
    PartnerContractsDeployer public s_partnerContractsDeployer;
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
    address public immutable PARTNER_BOOKING_CONTRACT = makeAddr("partnerBookingContract");
    address public immutable PARTNER_ADMIN = makeAddr("partner");
    uint256 public constant MAX_AMT_PERCENT_IN_RP = 70e16; // 0.7 * 100 = 70%

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
        s_partnerContractsDeployer =
        new PartnerContractsDeployer(address(s_mainPayment), ADMIN, address(s_utils),makeAddr("rpool"), address(s_ghoPassport));
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

    function testRegisterAsPartner() external {
        vm.startPrank(PARTNER_ADMIN);
        (address _partnerVault, address _partnerPay) =
            s_partnerContractsDeployer.registerAsPartner((address(s_ghoToken)), "name", "symbol", 2, 10);
        vm.stopPrank();

        (address partnerVault, address partnerPayment) = s_utils.getSpecificPartnerDetails(PARTNER_ADMIN);
        assertEq(_partnerVault, partnerVault);
        assertEq(_partnerPay, partnerPayment);
    }
}
