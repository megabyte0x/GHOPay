//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {PartnerVault} from "./PartnerVault.sol";

contract Utils {
    address[] public partnerVaults;
    mapping(address => bool) public isPartnerVault;

    function addPartnerVault(address _partnerVault) public {
        partnerVaults.push(_partnerVault);
        isPartnerVault[_partnerVault] = true;
    }

    function isPartnerVaultValid(address _partnerVault) public view returns (bool) {
        return isPartnerVault[_partnerVault];
    }
}
