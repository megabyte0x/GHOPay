//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {PartnerVault} from "./PartnerVault.sol";

contract Utils {
    address[] public partnerVaults;
    address[] public partnerBookingContracts;
    mapping(address => bool) public isPartnerVault;
    mapping(address => bool) public isPartnerBookingContract;

    function addPartnerVault(address _partnerVault) public {
        partnerVaults.push(_partnerVault);
        isPartnerVault[_partnerVault] = true;
    }

    function addPartnerBookingContract(address _partnerBookingContract) public {
        partnerBookingContracts.push(_partnerBookingContract);
        isPartnerBookingContract[_partnerBookingContract] = true;
    }

    function isPartnerVaultValid(address _partnerVault) public view returns (bool) {
        return isPartnerVault[_partnerVault];
    }

    function isPartnerBookingContractVaild(address _partnerBookingContract) public view returns (bool) {
        return isPartnerBookingContract[_partnerBookingContract];
    }
}
