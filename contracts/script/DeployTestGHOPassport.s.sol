//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";

import {TestGHOPassport} from "../test/unit/mocks/TestGHOPassport.sol";

contract DeployTestGHOPassport is Script {
    function run() public returns (address ghoPassport) {
        vm.startBroadcast();
        TestGHOPassport _ghoPassport = new TestGHOPassport();
        ghoPassport = address(_ghoPassport);
        vm.stopBroadcast();

        console2.log("TestGHOPassport deployed at: %s", ghoPassport);
    }
}
