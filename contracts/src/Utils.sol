//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {ERC20} from "lib/solmate/src/tokens/ERC20.sol";
import {ERC4626, FixedPointMathLib} from "./ERC4626Flatten.sol";
import {PartnerVault} from "./PartnerVault.sol";
import {RPool} from "./RPool.sol";
import {MainVault} from "./MainVault.sol";

contract Utils {
    error Utils__GHOCannotBeUsedForSwap();

    event Utils__PartnerContractsAdded(
        address indexed partner, address indexed partnerPayment, address indexed partnerVault
    );

    using FixedPointMathLib for uint256;

    address[] public s_partners;
    address public s_ghoToken;
    address public s_gpToken;
    address public s_rPool;

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

        if (!isPartnerAlreadyAdded(partner)) {
            s_partners.push(partner);
        }

        s_isPartnerPaymentContract[_partnerPayment] = true;
        s_isPartner[partner] = true;

        emit Utils__PartnerContractsAdded(partner, _partnerPayment, _partnerVault);
    }

    function isPartnerPaymentContract(address _partnerPayment) public view returns (bool) {
        return s_isPartnerPaymentContract[_partnerPayment];
    }

    function isPartner(address _partner) public view returns (bool) {
        return s_isPartner[_partner];
    }

    function isPartnerAlreadyAdded(address _partner) public view returns (bool) {
        for (uint256 i = 0; i < s_partners.length; i++) {
            if (s_partners[i] == _partner) {
                return true;
            }
        }
        return false;
    }

    function getSpecificPartnerDetails(address _partner)
        public
        view
        returns (address _partnerVault, address _partnerPayment)
    {
        PartnerDetails memory partnerDetails = s_addressToPartnerDetails[_partner];
        return (partnerDetails.s_partnerVault, partnerDetails.s_partnerPayment);
    }

    function getAllDetails()
        public
        view
        returns (address[] memory _partners, address[] memory _partnerVaults, address[] memory _partnerPayments)
    {
        address[] memory partnerVaults = new address[](s_partners.length);
        address[] memory partnerPayments = new address[](s_partners.length);
        for (uint256 i = 0; i < s_partners.length; i++) {
            (address _partnerVault, address _partnerPayment) = getSpecificPartnerDetails(s_partners[i]);
            partnerVaults[i] = _partnerVault;
            partnerPayments[i] = _partnerPayment;
        }

        return (s_partners, partnerVaults, partnerPayments);
    }

    function getPartners() public view returns (address[] memory) {
        return s_partners;
    }

    function balanceOf(address _user) public view returns (address[] memory, uint256[] memory) {
        // get the balances of each partnerVault for the user
        uint256[] memory balances = new uint256[](s_partners.length);
        address[] memory partnerVaults = new address[](s_partners.length);
        for (uint256 i = 0; i < s_partners.length; i++) {
            (address _partnerVault,) = getSpecificPartnerDetails(s_partners[i]);
            balances[i] = ERC20(_partnerVault).balanceOf(_user);
            partnerVaults[i] = _partnerVault;
        }

        return (partnerVaults, balances);
    }

    function getSwapFinalAmount(address _user, address _initialToken, address _finalToken, uint256 _initialTokenAmount)
        public
        view
        returns (uint256 _finalTokenAmount)
    {
        if (_initialToken == s_ghoToken) {
            revert Utils__GHOCannotBeUsedForSwap();
        }

        if (_initialToken == s_gpToken && _finalToken == s_ghoToken) {
            if (isPartner(_user)) {
                uint256 fee = MainVault(s_gpToken).s_partnerFee();
                _finalTokenAmount = calculateAmountPayable(_initialTokenAmount, fee);
            } else {
                uint256 fee = MainVault(s_gpToken).s_userFee();
                _finalTokenAmount = calculateAmountPayable(_initialTokenAmount, fee);
            }
        } else if (_initialToken != s_gpToken && _finalToken == s_ghoToken) {
            if (PartnerVault(_initialToken).owner() == _user) {
                _finalTokenAmount = _initialTokenAmount;
            } else {
                (uint256 amountPayable,) = PartnerVault(_initialToken).withdrawWithFee(_initialTokenAmount);
                _finalTokenAmount = amountPayable;
            }
        } else {
            (uint256 amountPayable,) =
                RPool(s_rPool).feeCalculatorForRPs(_initialToken, _finalToken, _initialTokenAmount);
            _finalTokenAmount = amountPayable;
        }
    }

    function calculateAmountPayable(uint256 _rpTokenAmount, uint256 _fee) internal pure returns (uint256) {
        uint256 fee = FixedPointMathLib.mulWadDown(_rpTokenAmount, _fee);
        return (_rpTokenAmount - fee);
    }
}
