//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Script} from "forge-std/Script.sol";

import {RPool} from "../src/RPool.sol";
import {HelperConfig} from "./HelperConfig.s.sol";

contract DeployRPool is Script {
    function deployRPool(
        address _utils,
        address _gpToken,
        address _ghoToken,
        address _mainVault,
        uint256 _feeOnRPs,
        uint256 _mainDeployerKey
    ) public returns (address rPool) {
        vm.startBroadcast(_mainDeployerKey);
        RPool _rPool = new RPool(_utils, _gpToken, _ghoToken, _mainVault, _feeOnRPs);
        vm.stopBroadcast();
        rPool = address(_rPool);
    }

    function deployRPoolUsingConfigs() public returns (address rPool) {
        HelperConfig helperConfig = new HelperConfig();
        uint256 _chainId = block.chainid;
        address utils = helperConfig.getUtils(_chainId);
        address gpToken = helperConfig.getGPToken(_chainId);
        address mainVault = helperConfig.getGPToken(_chainId);

        address ghoToken = helperConfig.s_ghoToken();
        uint256 feeOnRPs = helperConfig.FEE_ON_RPS();
        uint256 mainDeployerKey = helperConfig.s_mainDeployerKey();

        rPool = deployRPool(utils, gpToken, ghoToken, mainVault, feeOnRPs, mainDeployerKey);
    }

    function run() external returns (address rPool) {
        rPool = deployRPoolUsingConfigs();
    }
}