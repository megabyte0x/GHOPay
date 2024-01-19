export const ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_rpToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_mainPayment",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "_maxAmtPercentInRp",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "_partnerAdmin",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_rpToGHORatio",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [],
    name: "PartnerPayment__NotEnoughRP",
    type: "error",
  },
  {
    inputs: [],
    name: "PartnerPayment__OnlyGHOPassportHolders",
    type: "error",
  },
  {
    inputs: [],
    name: "PartnerPayment__ZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "PartnerPayment__ZeroAmount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "PartnerPayment__PaidWithGHO",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_rpamount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_ghoAmount",
        type: "uint256",
      },
    ],
    name: "PartnerPayment__PaidWithGHOAndRP",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_rpAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_serviceAmount",
        type: "uint256",
      },
    ],
    name: "bookAService",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_serviceAmount",
        type: "uint256",
      },
    ],
    name: "maxAmountPayInRpCalculator",
    outputs: [
      {
        internalType: "uint256",
        name: "maxUtilisableRp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_rpAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_serviceCharge",
        type: "uint256",
      },
    ],
    name: "rpUtilisationCalculator",
    outputs: [
      {
        internalType: "uint256",
        name: "amountToPayInGHO",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_ghoPassport",
    outputs: [
      {
        internalType: "contract IERC721",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_mainPayment",
    outputs: [
      {
        internalType: "contract MainPayment",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_maxAmtPercentInRp",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_partnerAdmin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_rpToGHORatio",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_rpToken",
    outputs: [
      {
        internalType: "contract ERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_ghoPassport",
        type: "address",
      },
    ],
    name: "setGhoPassport",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_mainPayment",
        type: "address",
      },
    ],
    name: "setMainPayment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_maxAmtPercentInRp",
        type: "uint8",
      },
    ],
    name: "setMaxAmtPercentInRp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_partnerAdmin",
        type: "address",
      },
    ],
    name: "setPartnerAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_rpToGHORatio",
        type: "uint256",
      },
    ],
    name: "setRpToGHORatio",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_rpToken",
        type: "address",
      },
    ],
    name: "setRpToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
