//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {Utils} from "./Utils.sol";
import {ERC20} from "./ERC4626Flatten.sol";
import {PartnerVault} from "./PartnerVault.sol";
import {PartnerPayment} from "./PartnerPayment.sol";

contract PartnerContractsDeployer is Ownable {
    event PartnerContractsDeployer__RegisterAsPartner(
        address partnerVaultContractAddress, address partnerPaymentContractAddress
    );

    Utils public s_utilsContract;
    address public i_owner;
    address public s_mainPayment;

    mapping(address => PartnerDetails) public s_addressToPartnerDetails;
    address[] public s_partners;

    struct PartnerDetails {
        address s_vault;
        address s_partnerPayment;
    }

    constructor(address _owner, address _mainPayment) Ownable(_owner) {
        i_owner = _owner;
        s_mainPayment = _mainPayment;
    }

    function registerAsPartner(
        ERC20 _ghoToken,
        string memory _name,
        string memory _symbol,
        uint8 _ratio,
        uint8 _maxAmtPercentInRp
    ) public {
        PartnerVault partnerVault = new PartnerVault(
            _ghoToken,
            _name,
            _symbol,
            msg.sender,
            _ratio
        );
        PartnerPayment partnerPayment = new PartnerPayment(
            address(partnerVault),
            s_mainPayment,
            msg.sender,
            _ratio,
            _maxAmtPercentInRp
        );

        s_addressToPartnerDetails[msg.sender] =
            PartnerDetails({s_vault: address(partnerVault), s_partnerPayment: address(partnerPayment)});

        s_partners.push(msg.sender);

        // TODO: mint partner NFT;
        s_utilsContract.addPartnerBookingContract(address(partnerPayment));
        s_utilsContract.addPartnerVault(address(partnerVault));

        emit PartnerContractsDeployer__RegisterAsPartner(address(partnerVault), address(partnerPayment));
    }

    function setMainPayment(address _mainPayment) public onlyOwner {
        s_mainPayment = _mainPayment;
    }

    function setUtils(address _utils) public onlyOwner {
        s_utilsContract = Utils(_utils);
    }
}
