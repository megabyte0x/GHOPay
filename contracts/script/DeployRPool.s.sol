//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";

import {RPool} from "../src/RPool.sol";
import {HelperConfig} from "./HelperConfig.s.sol";

contract DeployRPool is Script {
    function deployRPool(address _utils, address _ghoToken, uint256 _feeOnRPs, address _mainAdmin)
        public
        returns (address rPool)
    {
        vm.startBroadcast();
        RPool _rPool = new RPool(_utils,  _ghoToken, _feeOnRPs, _mainAdmin);
        rPool = address(_rPool);
        vm.stopBroadcast();
    }

    function deployRPoolUsingConfigs() public returns (address rPool) {
        HelperConfig helperConfig = new HelperConfig();
        uint256 _chainId = block.chainid;
        address utils = helperConfig.getUtils(_chainId);
        console2.log("utils used for deployment", utils);
        address _mainAdmin = helperConfig.s_mainAdmin();
        console2.log("main admin used for deployment", _mainAdmin);

        address ghoToken = helperConfig.getGHOToken(_chainId);
        console2.log("gho token used for deployment", ghoToken);
        uint256 feeOnRPs = helperConfig.FEE_ON_RPS();

        rPool = deployRPool(utils, ghoToken, feeOnRPs, _mainAdmin);
    }

    function run() external returns (address rPool) {
        rPool = deployRPoolUsingConfigs();
    }
}
