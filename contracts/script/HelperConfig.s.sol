//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";

import {TestGHO} from "../src/TestGHO.sol";

contract HelperConfig is Script {
    address public s_ghoToken;
    address public s_mainAdmin;
    address public s_mainDeployer;
    uint256 public s_mainDeployerKey;
    uint256 public constant GHO_TOKEN_TO_MINT = 10000e18;

    constructor() {
        if (block.chainid == 11155111) {
            getSepoliaConfigs();
        } else {
            getAnvilConfigs();
        }
    }

    function getSepoliaConfigs() public {
        s_ghoToken = 0xc4bF5CbDaBE595361438F8c6a187bDc330539c60;
        s_mainDeployerKey = vm.envUint("PRIVATE_KEY");
    }

    function getAnvilConfigs() public {
        s_mainAdmin = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
        s_mainDeployer = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8;
        s_mainDeployerKey = vm.envUint("ANVIL_PRIVATE_KEY");

        // deploying, setting the ghoToken address and minting the token address
        vm.startBroadcast(s_mainDeployerKey);
        TestGHO _ghoToken = new TestGHO();
        _ghoToken.mint(s_mainAdmin, GHO_TOKEN_TO_MINT);
        s_ghoToken = address(_ghoToken);
        vm.stopBroadcast();
    }
}
