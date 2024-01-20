//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {ERC20} from "lib/solmate/src/tokens/ERC20.sol";

contract Utils {
    address[] public s_partners;

    struct PartnerDetails {
        address s_partnerVault;
        address s_partnerPayment;
    }

    mapping(address => PartnerDetails) public s_addressToPartnerDetails;
    mapping(address => bool) public s_isPartnerPaymentContract;
    mapping(address => bool) public s_isPartner;

    function addPartnerContracts(address partner, address _partnerPayment, address _partnerVault) public {
        s_addressToPartnerDetails[partner] =
            PartnerDetails({s_partnerVault: _partnerVault, s_partnerPayment: _partnerPayment});
        s_partners.push(_partnerPayment);
        s_isPartnerPaymentContract[_partnerPayment] = true;
        s_isPartner[partner] = true;
    }

    function isPartnerPaymentContract(address _partnerPayment) public view returns (bool) {
        return s_isPartnerPaymentContract[_partnerPayment];
    }

    function isPartner(address _partner) public view returns (bool) {
        return s_isPartner[_partner];
    }

    function getPartnerDetails(address _partner) public view returns (address _partnerVault, address _partnerPayment) {
        PartnerDetails memory partnerDetails = s_addressToPartnerDetails[_partner];
        return (partnerDetails.s_partnerVault, partnerDetails.s_partnerPayment);
    }

    function balanceOf(address _user) public view returns (address[] memory, uint256[] memory) {
        // get the balances of each partnerVault for the user
        uint256[] memory balances = new uint256[](s_partners.length);
        address[] memory partnerVaults = new address[](s_partners.length);
        for (uint256 i = 0; i < s_partners.length; i++) {
            (address _partnerVault,) = getPartnerDetails(s_partners[i]);
            balances[i] = ERC20(_partnerVault).balanceOf(_user);
            partnerVaults[i] = _partnerVault;
        }

        return (partnerVaults, balances);
    }
}
