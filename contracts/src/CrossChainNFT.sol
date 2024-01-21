//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract CrossChainReceiver is CCIPReceiver {
    error CrossChainNFT__ZeroAddress();

    event CrossChainNFT__CheckStatusRequestCreate(address indexed sender, bytes32 indexed messageId);
    event CrossChainNFT__StatusChecked(address indexed sender, bool indexed result);

    uint64 public constant DESTINATION_CHAIN_SELECTOR = 16015286601757825753;
    address public s_receiverAddress;
    address public s_ghoPassport;
    address public immutable i__router;

    constructor(address _router) CCIPReceiver(_router) {
        i__router = _router;
    }

    modifier isZeroAddress(address _address) {
        if (_address == address(0)) revert CrossChainNFT__ZeroAddress();
        _;
    }

    function setGHOPassport(address _ghoPassport) external {
        s_ghoPassport = _ghoPassport;
    }

    function setReceiver(address _receiverAddress) external {
        s_receiverAddress = _receiverAddress;
    }

    function sendResult(address user, bool _result) public {
        uint8 typeOfCall = 2;
        bytes memory messageData = abi.encode(user, _result, typeOfCall);
        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(s_receiverAddress),
            data: messageData,
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: "",
            feeToken: address(0)
        });

        uint256 fee = IRouterClient(i__router).getFee(DESTINATION_CHAIN_SELECTOR, message);

        bytes32 messageId = IRouterClient(i__router).ccipSend{value: fee}(DESTINATION_CHAIN_SELECTOR, message);

        emit CrossChainNFT__CheckStatusRequestCreate(msg.sender, messageId);
    }

    function _ccipReceive(Client.Any2EVMMessage memory message) internal override {
        (address userAddress, uint8 typeOfCall) = abi.decode(message.data, (address, uint8));

        if (typeOfCall == 1) {
            bool result = _checkHoldings(userAddress);
            sendResult(userAddress, result);
        }
    }

    function _checkHoldings(address _userAddress) internal returns (bool) {
        bool result;
        uint256 balance;

        balance = IERC721(s_ghoPassport).balanceOf(_userAddress);

        if (balance > 0) {
            result = true;
        } else {
            result = false;
        }

        emit CrossChainNFT__StatusChecked(_userAddress, result);

        return result;
    }
}
