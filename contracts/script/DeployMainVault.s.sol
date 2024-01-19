//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";

import {MainVault} from "../src/MainVault.sol";
import {ERC20} from "../src/ERC4626Flatten.sol";
import {HelperConfig} from "../script/HelperConfig.s.sol";

contract DeployMainVault is Script {
    function deployMainVault(address _ghoToken, address _mainAdmin) public returns (address mainVault) {
        vm.startBroadcast();
        MainVault _mainVault = new MainVault(ERC20(_ghoToken), _mainAdmin);
        vm.stopBroadcast();

        mainVault = address(_mainVault);
        console2.log("MainVault deployed at: %s", address(_mainVault));
    }

    function deployMainVaultUsingConfigs() public returns (address mainVault) {
        HelperConfig _helperConfigs = new HelperConfig();

        address _ghoToken = _helperConfigs.getGHOToken(block.chainid);
        address _mainAdmin = _helperConfigs.s_mainAdmin();

        mainVault = deployMainVault(_ghoToken, _mainAdmin);
    }

    function run() public returns (address mainVault) {
        mainVault = deployMainVaultUsingConfigs();
    }
}
