//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";
import {TestGHO} from "../test/mocks/TestGHO.sol";

contract DeployTestGHO is Script {
    function run() public returns (address ghoToken) {
        vm.startBroadcast();
        TestGHO _ghoToken = new TestGHO();
        ghoToken = address(_ghoToken);
        console2.log("TestGHO deployed at: %s", ghoToken);
        vm.stopBroadcast();
    }
}
