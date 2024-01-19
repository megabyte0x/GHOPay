//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Script} from "forge-std/Script.sol";

import {RPool} from "../src/RPool.sol";
import {HelperConfig} from "./HelperConfig.s.sol";

contract DeployRPool is Script {
    function deployRPool(
        address _utils,
        address _ghoToken,
        uint256 _feeOnRPs,
        uint256 _mainDeployerKey,
        address _mainAdmin
    ) public returns (address rPool) {
        vm.startBroadcast(_mainDeployerKey);
        RPool _rPool = new RPool(_utils,  _ghoToken, _feeOnRPs, _mainAdmin);
        vm.stopBroadcast();
        rPool = address(_rPool);
    }

    function deployRPoolUsingConfigs() public returns (address rPool) {
        HelperConfig helperConfig = new HelperConfig();
        uint256 _chainId = block.chainid;
        address utils = helperConfig.getUtils(_chainId);
        address _mainAdmin = helperConfig.s_mainAdmin();

        address ghoToken = helperConfig.s_ghoToken();
        uint256 feeOnRPs = helperConfig.FEE_ON_RPS();
        uint256 mainDeployerKey = helperConfig.s_mainDeployerKey();

        rPool = deployRPool(utils, ghoToken, feeOnRPs, mainDeployerKey, _mainAdmin);
    }

    function run() external returns (address rPool) {
        rPool = deployRPoolUsingConfigs();
    }
}
