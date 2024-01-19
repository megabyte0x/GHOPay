//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import {ERC20} from "./ERC4626Flatten.sol";
import {MainPayment} from "./MainPayment.sol";
import {FixedPointMathLib} from "./ERC4626Flatten.sol";

/**
 * @title PartnerPayment
 * @author Megabyte
 * @notice This contract is used to pay for services offered by Partner using GHO and RP.
 * User will also be rewarded with GP for paying with GHO.
 */
contract PartnerPayment is Ownable {
    error PartnerPayment__ZeroAmount();
    error PartnerPayment__NotEnoughRP();
    error PartnerPayment__ZeroAddress();
    error PartnerPayment__OnlyGHOPassportHolders();

    event PartnerPayment__PaidWithGHO(address indexed _sender, uint256 _amount);
    event PartnerPayment__PaidWithGHOAndRP(address indexed _sender, uint256 indexed _rpamount, uint256 _ghoAmount);

    using FixedPointMathLib for uint256;

    /*
           _        _                         _       _     _
       ___| |_ __ _| |_ ___  __   ____ _ _ __(_) __ _| |__ | | ___  ___
      / __| __/ _` | __/ _ \ \ \ / / _` | '__| |/ _` | '_ \| |/ _ \/ __|
      \__ \ || (_| | ||  __/  \ V / (_| | |  | | (_| | |_) | |  __/\__ \
      |___/\__\__,_|\__\___|   \_/ \__,_|_|  |_|\__,_|_.__/|_|\___||___/
    */
    ERC20 public s_rpToken;
    IERC721 public s_ghoPassport;
    MainPayment public s_mainPayment;

    address public s_partnerAdmin;
    uint256 public s_rpToGHORatio;
    uint8 public s_maxAmtPercentInRp;

    constructor(
        address _rpToken,
        address _mainPayment,
        uint8 _maxAmtPercentInRp,
        address _partnerAdmin,
        uint256 _rpToGHORatio
    ) Ownable(_partnerAdmin) {
        s_rpToken = ERC20(_rpToken);
        s_mainPayment = MainPayment(_mainPayment);
        s_partnerAdmin = _partnerAdmin;
        s_rpToGHORatio = _rpToGHORatio;
        s_maxAmtPercentInRp = _maxAmtPercentInRp;
    }

    /*
                           _ _  __ _
       _ __ ___   ___   __| (_)/ _(_) ___ _ __ ___
      | '_ ` _ \ / _ \ / _` | | |_| |/ _ \ '__/ __|
      | | | | | | (_) | (_| | |  _| |  __/ |  \__ \
      |_| |_| |_|\___/ \__,_|_|_| |_|\___|_|  |___/
    */

    modifier isGHOPassportHolder() {
        if (!(s_ghoPassport.balanceOf(msg.sender) > 0)) {
            revert PartnerPayment__OnlyGHOPassportHolders();
        }
        _;
    }

    modifier isZeroAmount(uint256 _amount) {
        if (_amount == 0) revert PartnerPayment__ZeroAmount();
        _;
    }

    modifier isZeroAdrress(address _address) {
        if (_address == address(0)) revert PartnerPayment__ZeroAddress();
        _;
    }

    modifier haveEnoughRp(uint256 _rpAmount) {
        if (_rpAmount > s_rpToken.balanceOf(msg.sender)) {
            revert PartnerPayment__NotEnoughRP();
        }
        _;
    }

    /*
                 _                        _    __                  _   _
        _____  _| |_ ___ _ __ _ __   __ _| |  / _|_   _ _ __   ___| |_(_) ___  _ __  ___
       / _ \ \/ / __/ _ \ '__| '_ \ / _` | | | |_| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
      |  __/>  <| ||  __/ |  | | | | (_| | | |  _| |_| | | | | (__| |_| | (_) | | | \__ \
       \___/_/\_\\__\___|_|  |_| |_|\__,_|_| |_|  \__,_|_| |_|\___|\__|_|\___/|_| |_|___/
    */
    function setRpToken(address _rpToken) public onlyOwner isZeroAdrress(_rpToken) {
        s_rpToken = ERC20(_rpToken);
    }

    function setGhoPassport(address _ghoPassport) public onlyOwner isZeroAdrress(_ghoPassport) {
        s_ghoPassport = IERC721(_ghoPassport);
    }

    function setMainPayment(address _mainPayment) public onlyOwner isZeroAdrress(_mainPayment) {
        s_mainPayment = MainPayment(_mainPayment);
    }

    function setPartnerAdmin(address _partnerAdmin) public onlyOwner isZeroAdrress(_partnerAdmin) {
        s_partnerAdmin = _partnerAdmin;
    }

    function setRpToGHORatio(uint256 _rpToGHORatio) public onlyOwner isZeroAmount(_rpToGHORatio) {
        s_rpToGHORatio = _rpToGHORatio;
    }

    function setMaxAmtPercentInRp(uint8 _maxAmtPercentInRp) public onlyOwner isZeroAmount(_maxAmtPercentInRp) {
        s_maxAmtPercentInRp = _maxAmtPercentInRp;
    }

    /*
                   _     _ _         __                  _   _
       _ __  _   _| |__ | (_) ___   / _|_   _ _ __   ___| |_(_) ___  _ __  ___
      | '_ \| | | | '_ \| | |/ __| | |_| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
      | |_) | |_| | |_) | | | (__  |  _| |_| | | | | (__| |_| | (_) | | | \__ \
      | .__/ \__,_|_.__/|_|_|\___| |_|  \__,_|_| |_|\___|\__|_|\___/|_| |_|___/
      |_|
    */

    /**
     * Function to book a service using GHO and RP.
     * @param _rpAmount The amount of RP user willing to pay for the service
     * @param _serviceAmount The cost of the service.
     * @dev If _rpAmount is 0 then only GHO will be used to pay for the service.
     * @dev The Main Payment contract will be used to pay GHO, so that user can earn GP.
     */
    function bookAService(uint256 _rpAmount, uint256 _serviceAmount)
        public
        isGHOPassportHolder
        haveEnoughRp(_rpAmount)
        isZeroAmount(_serviceAmount)
    {
        address sender = msg.sender;

        if (_rpAmount > 0) {
            uint256 maxUtilisableRp = maxAmountPayInRpCalculator(_serviceAmount);
            uint256 amountToPayInGHO = rpUtilisationCalculator(_rpAmount, _serviceAmount);

            if (_rpAmount > maxUtilisableRp) {
                // If _rpAmount is greater than maxUtilisableRp, then transfer maxUtilisableRp to Partner Admin Address
                s_rpToken.transferFrom(sender, s_partnerAdmin, maxUtilisableRp);
            } else {
                s_rpToken.transferFrom(sender, s_partnerAdmin, _rpAmount);
            }

            // Transfer the GHO to the Partner Admin Address
            s_mainPayment.payWithGHO(sender, s_partnerAdmin, amountToPayInGHO);

            emit PartnerPayment__PaidWithGHOAndRP(sender, _rpAmount, amountToPayInGHO);
        } else {
            // Transfer the GHO to the Partner Admin Address
            s_mainPayment.payWithGHO(sender, s_partnerAdmin, _serviceAmount);

            emit PartnerPayment__PaidWithGHO(sender, _serviceAmount);
        }
    }

    /**
     * Function to calculate the maximum amount of RP that can be used to pay for the service.
     * @param _serviceAmount The cost of the service.
     */
    function maxAmountPayInRpCalculator(uint256 _serviceAmount) public view returns (uint256 maxUtilisableRp) {
        uint256 maxAmountPayInRp = FixedPointMathLib.mulWadUp(_serviceAmount, s_maxAmtPercentInRp) / 100;
        maxUtilisableRp = FixedPointMathLib.mulWadUp(maxAmountPayInRp, s_rpToGHORatio);
    }

    /**
     * Function to calculate the amount of GHO to pay for the service after utilising RP.
     * @param _rpAmount The amount of RP user willing to pay for the service
     * @param _serviceCharge The cost of the service.
     */
    function rpUtilisationCalculator(uint256 _rpAmount, uint256 _serviceCharge)
        public
        view
        returns (uint256 amountToPayInGHO)
    {
        uint256 amountUtilisedInRp = FixedPointMathLib.divWadDown(_rpAmount, s_rpToGHORatio);
        amountToPayInGHO = _serviceCharge - amountUtilisedInRp;
    }
}
