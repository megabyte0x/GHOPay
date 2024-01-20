//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";

import {DevOpsTools} from "foundry-devops/src/DevOpsTools.sol";

import {TestGHO} from "../test/mocks/TestGHO.sol";
import {DeployTestGHO} from "./DeployTestGHO.s.sol";
import {DeployTestGHOPassport} from "./DeployTestGHOPassport.s.sol";
import {DeployTestGHOPartnerPassport} from "./DeployTestGHOPartnerPassport.s.sol";

contract HelperConfig is Script {
    // Variables which will be constant depending on the network
    address public s_ghoToken;
    address public s_mainAdmin;
    address public s_mainDeployer;
    uint256 public s_mainDeployerKey;
    address public s_partnerAdmin;
    address public s_user;

    // Variables which will differ depending on the network
    address public s_utils;
    address public s_gpToken;
    address public s_mainVault;
    address public s_ghoPassport;
    address public s_ghoPartnerPassport;
    address public s_rewardPool;

    // Constants for all networks
    uint256 public constant FEE_ON_RPS = 2e17;
    uint256 public constant GHO_TOKEN_TO_MINT = 10000e18;
    uint256 public constant MINIMUM_REWARD_AMOUNT = 200e18;

    constructor() {
        if (block.chainid == 11155111) {
            getSepoliaConfigs();
        } else {
            getAnvilConfigs();
        }
    }

    function getGPToken(uint256 _chainId) public view returns (address gpToken) {
        gpToken = DevOpsTools.get_most_recent_deployment("MainVault", _chainId);
    }

    function getUtils(uint256 _chainId) public view returns (address utils) {
        utils = DevOpsTools.get_most_recent_deployment("Utils", _chainId);
    }

    function getMainVault(uint256 _chainId) public view returns (address mainVault) {
        mainVault = DevOpsTools.get_most_recent_deployment("MainVault", _chainId);
    }

    function getGhoPassport(uint256 _chainId) public view returns (address ghoPassport) {
        ghoPassport = DevOpsTools.get_most_recent_deployment("TestGHOPassport", _chainId);
    }

    function getRPoolAddress(uint256 _chainId) public view returns (address rPoolAddress) {
        rPoolAddress = DevOpsTools.get_most_recent_deployment("RPool", _chainId);
    }

    function getGhoPartnerPassport(uint256 _chainId) public view returns (address ghoPartnerPassport) {
        ghoPartnerPassport = DevOpsTools.get_most_recent_deployment("TestGHOPartnerPassport", _chainId);
    }

    function getGHOToken(uint256 _chainId) public view returns (address ghoToken) {
        ghoToken = DevOpsTools.get_most_recent_deployment("TestGHO", _chainId);
    }

    function getMainPayment(uint256 _chainId) public view returns (address mainPayment) {
        mainPayment = DevOpsTools.get_most_recent_deployment("MainPayment", _chainId);
    }

    function getPartnerContractsDeployer(uint256 _chainId) public view returns (address partnerContractsDeployer) {
        partnerContractsDeployer = DevOpsTools.get_most_recent_deployment("PartnerContractsDeployer", _chainId);
    }

    function getSepoliaConfigs() public {
        s_mainDeployerKey = vm.envUint("PRIVATE_KEY");
        s_mainAdmin = 0x1Cb30cb181D7854F91c2410BD037E6F42130e860;
        s_partnerAdmin = 0xa60f738a60BCA515Ac529b7335EC7CB2eE3891d2;
        s_user = 0xdDCc06f98A7C71Ab602b8247d540dA5BD8f5D2A2;
    }

    function getAnvilConfigs() public {
        s_mainAdmin = makeAddr("MAKE_ADMIN");
        s_mainDeployerKey = vm.envUint("ANVIL_PRIVATE_KEY");
        s_ghoToken = 0xfbAb4aa40C202E4e80390171E82379824f7372dd;
        s_mainDeployer = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8;
        s_partnerAdmin = makeAddr("PARTNER_ADMIN");
        s_user = makeAddr("USER");
    }
}
