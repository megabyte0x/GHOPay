//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Script} from "forge-std/Script.sol";

import {Utils} from "../src/Utils.sol";
import {HelperConfig} from "./HelperConfig.s.sol";

contract DeployUtils is Script {
    function deployUtils(uint256 _deployerKey) public returns (address utils) {
        vm.startBroadcast(_deployerKey);
        Utils _utils = new Utils();
        vm.stopBroadcast();

        utils = address(_utils);
    }

    function deployUtilsUsingConfigs() public returns (address utils) {
        HelperConfig helperConfig = new HelperConfig();
        uint256 mainDeployer = helperConfig.s_mainDeployerKey();

        utils = deployUtils(mainDeployer);
    }

    function run() external returns (address utils) {
        utils = deployUtilsUsingConfigs();
    }
}
