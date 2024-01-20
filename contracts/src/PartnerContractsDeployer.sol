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
    address public s_mainAdmin;
    address public s_ghoPassport;

    constructor(address _mainPayment, address _mainAdmin, address _utils, address _rPool, address _ghoPassport)
        Ownable(_mainAdmin)
    {
        s_mainPayment = _mainPayment;
        s_utilsContract = Utils(_utils);
        s_rPool = _rPool;
        s_mainAdmin = _mainAdmin;
        s_ghoPassport = _ghoPassport;
    }

    function registerAsPartner(
        address _ghoToken,
        string memory _name,
        string memory _symbol,
        uint8 _ratio,
        uint256 _maxAmtPercentInRp
    ) public {
        PartnerVault partnerVault = new PartnerVault(
            ERC20(_ghoToken),
            _name,
            _symbol,
            msg.sender,
            s_rPool,
            s_mainAdmin,
            _ratio
        );
        uint256 _rpToGHORatio = (uint256(_ratio) * 10e18);
        PartnerPayment partnerPayment = new PartnerPayment(
            address(partnerVault),
            s_mainPayment,
            s_ghoPassport,
            _maxAmtPercentInRp,
            msg.sender,
            _rpToGHORatio
        );

        s_utilsContract.addPartnerContracts(msg.sender, address(partnerPayment), address(partnerVault));

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
