export const ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_ghoToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_gpToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_ghoPassport",
        type: "address",
      },
      {
        internalType: "address",
        name: "_utils",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_minimumAmt",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_mainAdmin",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "MainPayment__NotEnoughGHO",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gpAmountLeft",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_gpRewardAmount",
        type: "uint256",
      },
    ],
    name: "MainPayment__NotEnoughGP",
    type: "error",
  },
  {
    inputs: [],
    name: "MainPayment__OnlyGHOPassportHolders",
    type: "error",
  },
  {
    inputs: [],
    name: "MainPayment__OnlyPartnerBookingContract",
    type: "error",
  },
  {
    inputs: [],
    name: "MainPayment__ZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "MainPayment__ZeroAmount",
    type: "error",
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_amountPaid",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_gpAmountLeft",
        type: "uint256",
      },
    ],
    name: "MainPayment__GPRewarded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "MainPayment__PaidWithGHO",
    type: "event",
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
    inputs: [
      {
        internalType: "address",
        name: "_sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "payWithGHO",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "payWithGHO",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "s_ghoToken",
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
    inputs: [],
    name: "s_gpToken",
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
    inputs: [],
    name: "s_minimumAmt",
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
    name: "s_utils",
    outputs: [
      {
        internalType: "contract Utils",
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
        internalType: "uint256",
        name: "_minimumAmt",
        type: "uint256",
      },
    ],
    name: "setMinimumAmt",
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
