//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Script} from "forge-std/Script.sol";
import "forge-std/Vm.sol";
import "forge-std/console2.sol";

import {TestGHO} from "../src/TestGHO.sol";

contract HelperConfig is Script {
    address public s_ghoToken;
    address public constant MAIN_ADMIN = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
    address public constant MAIN_DEPLOYER = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8;
    uint256 public constant MAIN_DEPLOYER_PRIVATE_KEY =
        0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d;

    constructor() {
        if (block.chainid == 11155111) {
            getSepoliaConfigs();
        }
    }

    function getSepoliaConfigs() public {
        s_ghoToken = 0xc4bF5CbDaBE595361438F8c6a187bDc330539c60;
    }

    function getAnvilConfigs() public {
        vm.prank(MAIN_DEPLOYER_PRIVATE_KEY);
        s_ghoToken = new TestGHO();
    }
}
