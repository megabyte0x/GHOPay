//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";

import {TestGHOPartnerPassport} from "../test/unit/mocks/TestGHOPartnerPassport.sol";

contract DeployTestGHOPartnerPassport is Script {
    function run() public returns (address ghoPartnerPassport) {
        vm.startBroadcast();
        TestGHOPartnerPassport _ghoPassport = new TestGHOPartnerPassport();
        ghoPartnerPassport = address(_ghoPassport);
        vm.stopBroadcast();

        console2.log("TestGHOPartnerPassport deployed at: %s", ghoPartnerPassport);
    }
}
