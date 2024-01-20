// SPDC-Licenese-Identifier: MIT
pragma solidity 0.8.20;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";

import {HelperConfig} from "./HelperConfig.s.sol";
import {TestGHO} from "../test/mocks/TestGHO.sol";
import {TestGHOPassport} from "../test/mocks/TestGHOPassport.sol";
import {TestGHOPartnerPassport} from "../test/mocks/TestGHOPartnerPassport.sol";
import {MainVault} from "../src/MainVault.sol";
import {PartnerContractsDeployer} from "../src/PartnerContractsDeployer.sol";

contract MintGHOToken is Script {
    function mintGHOToken(address _ghoToken, address _mainAdmin, address _partner, address _user, address _danish)
        public
    {
        vm.startBroadcast();
        TestGHO ghoToken = TestGHO(_ghoToken);
        ghoToken.mint(_mainAdmin, 10000e18);
        ghoToken.mint(_partner, 10000e18);
        ghoToken.mint(_user, 10000e18);
        ghoToken.mint(_danish, 10000e18);
        vm.stopBroadcast();
    }

    function mintGHOTokenUsingConfigs() public {
        HelperConfig helperConfigs = new HelperConfig();

        uint256 _chainId = block.chainid;

        address ghoToken = helperConfigs.getGHOToken(_chainId);
        address mainAdmin = helperConfigs.s_mainAdmin();
        address partnerAdmin = helperConfigs.s_partnerAdmin();
        address user = helperConfigs.s_user();
        address danish = 0xAE5c72E8dE74AdB50942ecE179e0dE27A8Cab61F;

        mintGHOToken(ghoToken, mainAdmin, partnerAdmin, user, danish);
    }

    function run() public {
        mintGHOTokenUsingConfigs();
    }
}

contract MintNFT is Script {
    function mintNFT(
        address _ghoPassport,
        address _ghoPartnerPassport,
        address _user,
        address _partner,
        address _danish
    ) public {
        vm.startBroadcast();
        TestGHOPassport ghoPassport = TestGHOPassport(_ghoPassport);
        TestGHOPartnerPassport ghoPartnerPassport = TestGHOPartnerPassport(_ghoPartnerPassport);
        ghoPassport.mint(_user, 1);
        ghoPassport.mint(_danish, 2);
        ghoPartnerPassport.mint(_partner, 1);
        vm.stopBroadcast();
    }

    function mintNFTUsingConfigs() public {
        HelperConfig helperConfigs = new HelperConfig();

        uint256 _chainId = block.chainid;

        address _ghoPassport = helperConfigs.getGhoPassport(_chainId);
        address _ghoPartnerPassport = helperConfigs.getGhoPartnerPassport(_chainId);
        address _partnerAdmin = helperConfigs.s_partnerAdmin();
        address _user = helperConfigs.s_user();
        address _danish = 0xAE5c72E8dE74AdB50942ecE179e0dE27A8Cab61F;
        mintNFT(_ghoPassport, _ghoPartnerPassport, _user, _partnerAdmin, _danish);
    }

    function run() public {
        mintNFTUsingConfigs();
    }
}

contract SetMainPayment is Script {
    function setMainPayment(address _mainVault, address _mainPayment) public {
        vm.startBroadcast();
        MainVault mainVault = MainVault(_mainVault);
        mainVault.setMainPayment(_mainPayment);
        vm.stopBroadcast();
    }

    function setMainPaymentUsingConfigs() public {
        HelperConfig helperConfigs = new HelperConfig();

        uint256 _chainId = block.chainid;
        address _mainVault = helperConfigs.getMainVault(_chainId);
        address _mainPayment = helperConfigs.getMainPayment(_chainId);

        setMainPayment(_mainVault, _mainPayment);
    }

    function run() public {
        setMainPaymentUsingConfigs();
    }
}

contract DepositGHOInMainVault is Script {
    function depositGHOInMainVault(address _mainVault, address _ghoToken, uint256 _ghoToMint) public {
        vm.startBroadcast();
        MainVault mainVault = MainVault(_mainVault);
        TestGHO ghoToken = TestGHO(_ghoToken);
        ghoToken.approve(_mainVault, _ghoToMint);
        mainVault.depositGHO(_ghoToMint);
        vm.stopBroadcast();
    }

    function depositGHOInMainVaultUsingConfigs() public {
        HelperConfig helperConfigs = new HelperConfig();

        uint256 _chainId = block.chainid;
        address _mainVault = helperConfigs.getMainVault(_chainId);
        address _ghoToken = helperConfigs.getGHOToken(_chainId);
        uint256 _ghoToMint = helperConfigs.GHO_TOKEN_TO_MINT();

        depositGHOInMainVault(_mainVault, _ghoToken, _ghoToMint);
    }

    function run() public {
        depositGHOInMainVaultUsingConfigs();
    }
}

contract RegisterAsPartner is Script {
    function registerAsAPartner(address _partnerContractsDeployer, address _ghoToken) public {
        vm.startBroadcast();

        PartnerContractsDeployer(_partnerContractsDeployer).registerAsPartner(_ghoToken, "TestPartner", "TP", 1, 100);
        vm.stopBroadcast();
    }

    function registerAsAPartnerUsingConfigs() public {
        HelperConfig helperConfigs = new HelperConfig();

        uint256 _chainId = block.chainid;
        address _partnerContractsDeployer = helperConfigs.getPartnerContractsDeployer(_chainId);
        address _ghoToken = helperConfigs.getGHOToken(_chainId);

        registerAsAPartner(_partnerContractsDeployer, _ghoToken);
    }

    function run() public {
        registerAsAPartnerUsingConfigs();
    }
}
