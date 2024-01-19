//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {Utils} from "./Utils.sol";
import {ERC20} from "./ERC4626Flatten.sol";
import {PartnerVault} from "./PartnerVault.sol";
import {PartnerPayment} from "./PartnerPayment.sol";

contract PartnerContractsDeployer is Ownable {
    event PartnerContractsDeployer__RegisterAsPartner(
        address indexed partner,
        address indexed partnerVaultContractAddress,
        address indexed partnerPaymentContractAddress
    );

    Utils public s_utilsContract;

    address public s_mainPayment;
    address public s_rPool;

    constructor(address _mainPayment, address _mainAdmin, address _utils, address _rPool) Ownable(_mainAdmin) {
        s_mainPayment = _mainPayment;
        s_utilsContract = Utils(_utils);
        s_rPool = _rPool;
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
            s_rPool,
            _ratio
        );
        PartnerPayment partnerPayment = new PartnerPayment(
            address(partnerVault),
            s_mainPayment,
            _maxAmtPercentInRp,
            msg.sender,
            _ratio
        );

        s_utilsContract.addPartnerContracts(address(partnerPayment), address(partnerVault));

        emit PartnerContractsDeployer__RegisterAsPartner(msg.sender, address(partnerVault), address(partnerPayment));
    }

    function setMainPayment(address _mainPayment) public onlyOwner {
        s_mainPayment = _mainPayment;
    }

    function setUtils(address _utils) public onlyOwner {
        s_utilsContract = Utils(_utils);
    }

    function setRPool(address _rPool) public onlyOwner {
        s_rPool = _rPool;
    }
}
