//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Script} from "forge-std/Script.sol";

import {TestGHO} from "../src/TestGHO.sol";

contract TestGHODeployment is Script {
    address public mainAdmin = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;

    function run() public {
        vm.startBroadcast();
        TestGHO gho = new TestGHO();
        gho.mint(mainAdmin, 10000e18);
        vm.stopBroadcast();
    }
}
