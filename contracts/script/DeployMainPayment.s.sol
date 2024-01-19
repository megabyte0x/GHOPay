//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";

import {MainPayment} from "../src/MainPayment.sol";
import {HelperConfig} from "./HelperConfig.s.sol";

contract DeployMainPayment is Script {
    function deployMainPayment(
        address _utils,
        address _gpToken,
        address _ghoToken,
        address _ghoPassport,
        uint256 _minimumAmt,
        address _mainAdmin
    ) public returns (address mainPayment) {
        vm.startBroadcast();
        MainPayment _mainPayment = new MainPayment(
        _ghoToken, _gpToken, _ghoPassport, _utils,_minimumAmt, _mainAdmin
        );
        vm.stopBroadcast();
        mainPayment = address(_mainPayment);
    }

    function deployMainPaymentUsingConfigs() public returns (address mainPayment) {
        HelperConfig helperConfig = new HelperConfig();

        uint256 _chainId = block.chainid;
        address utils = helperConfig.getUtils(_chainId);
        address gpToken = helperConfig.getGPToken(_chainId);
        address ghoPassport = helperConfig.getGhoPassport(_chainId);
        address mainAdmin = helperConfig.s_mainAdmin();

        address ghoToken = helperConfig.getGHOToken(_chainId);
        uint256 minimumAmt = helperConfig.MINIMUM_REWARD_AMOUNT();

        console2.log("utils: %s", utils);
        console2.log("gpToken: %s", gpToken);
        console2.log("ghoToken: %s", ghoToken);
        console2.log("ghoPassport: %s", ghoPassport);
        console2.log("minimumAmt: %s", minimumAmt);
        console2.log("mainAdmin: %s", mainAdmin);

        mainPayment = deployMainPayment(utils, gpToken, ghoToken, ghoPassport, minimumAmt, mainAdmin);
    }

    function run() external returns (address mainPayment) {
        mainPayment = deployMainPaymentUsingConfigs();
    }
}
