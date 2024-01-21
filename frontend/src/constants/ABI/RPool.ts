export const ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_utils",
        type: "address",
      },
      {
        internalType: "address",
        name: "_ghoToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_feeOnRPs",
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
    name: "RPool__OnlyRPs",
    type: "error",
  },
  {
    inputs: [],
    name: "RPool__ZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "RPool__ZeroAmount",
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
    inputs: [],
    name: "RPool__GHOWithdrawn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "RPool__RPsSwapped",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_rpToken",
        type: "address",
      },
    ],
    name: "decimalCorrectionFromRPtoCV",
    outputs: [
      {
        internalType: "uint256",
        name: "_ghoAmount",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_initialToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_finalToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_initialTokenAmount",
        type: "uint256",
      },
    ],
    name: "feeCalculatorForRPs",
    outputs: [
      {
        internalType: "uint256",
        name: "finalTokenAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "fee",
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
    inputs: [],
    name: "s_feeOnRPs",
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
    name: "s_ghoToken",
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
    name: "s_mainAdmin",
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
    name: "s_mainVault",
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
    name: "s_utils",
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
        internalType: "uint256",
        name: "_feeOnRPs",
        type: "uint256",
      },
    ],
    name: "setFeeOnRPs",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_ghoToken",
        type: "address",
      },
    ],
    name: "setGHOToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_mainAdmin",
        type: "address",
      },
    ],
    name: "setMainAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_mainVault",
        type: "address",
      },
    ],
    name: "setMainVault",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_utils",
        type: "address",
      },
    ],
    name: "setUtils",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_initialToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_finalToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_initialTokenAmount",
        type: "uint256",
      },
    ],
    name: "swap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_initialToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_finalToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_initialTokenAmount",
        type: "uint256",
      },
    ],
    name: "swapRP",
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
