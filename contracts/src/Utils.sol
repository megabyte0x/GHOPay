//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

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
}
