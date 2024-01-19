//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {PartnerContractsDeployer} from "../src/PartnerContractsDeployer.sol";
import {Script} from "forge-std/Script.sol";
import {HelperConfig} from "./HelperConfig.s.sol";
import {console2} from "forge-std/console2.sol";

contract DeployPartnerContractsDeployer is Script {
    function deployPartnerContractsDeployer(address _mainPayment, address _mainAdmin, address _utils, address _rPool)
        public
        returns (address partnerContractsDeployer)
    {
        vm.startBroadcast();
        PartnerContractsDeployer _partnerContractDeployer =
            new PartnerContractsDeployer(_mainPayment, _mainAdmin, _utils, _rPool);
        vm.stopBroadcast();
        partnerContractsDeployer = address(_partnerContractDeployer);
    }

    function deployPartnerContractsDeployerUsingConfigs() public returns (address partnerContractsDeployer) {
        HelperConfig helperConfigs = new HelperConfig();
        uint256 _chainId = block.chainid;
        address mainPayment = helperConfigs.getMainPayment(_chainId);
        address mainAdmin = helperConfigs.s_mainAdmin();
        address utils = helperConfigs.getUtils(_chainId);
        address rPool = helperConfigs.getRPoolAddress(_chainId);

        console2.log("mainPayment: %s", mainPayment);
        console2.log("mainAdmin: %s", mainAdmin);
        console2.log("utils: %s", utils);
        console2.log("rPool: %s", rPool);

        partnerContractsDeployer = deployPartnerContractsDeployer(mainPayment, mainAdmin, utils, rPool);
    }

    function run() external returns (address partnerContractsDeployer) {
        partnerContractsDeployer = deployPartnerContractsDeployerUsingConfigs();
    }
}
