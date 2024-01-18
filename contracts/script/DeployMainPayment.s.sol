//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Script} from "forge-std/Script.sol";

import {MainPayment} from "../src/MainPayment.sol";
import {HelperConfig} from "./HelperConfig.s.sol";

contract DeployMainPayment is Script {
    function deployMainPayment(
        address _utils,
        address _gpToken,
        address _ghoToken,
        address _ghoPassport,
        uint256 _minimumAmt,
        uint256 _mainDeployerKey
    ) public returns (address mainPayment) {
        vm.startBroadcast(_mainDeployerKey);
        MainPayment _mainPayment = new MainPayment(
        _ghoToken, _gpToken, _ghoPassport, _utils,_minimumAmt
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

        address ghoToken = helperConfig.s_ghoToken();
        uint256 minimumAmt = helperConfig.MINIMUM_REWARD_AMOUNT();
        uint256 mainDeployerKey = helperConfig.s_mainDeployerKey();

        mainPayment = deployMainPayment(utils, gpToken, ghoToken, ghoPassport, minimumAmt, mainDeployerKey);
    }

    function run() external returns (address mainPayment) {
        mainPayment = deployMainPaymentUsingConfigs();
    }
}
