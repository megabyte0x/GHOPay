export const ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "partner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "partnerPayment",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "partnerVault",
        "type": "address"
      }
    ],
    "name": "Utils__PartnerContractsAdded",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "partner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_partnerPayment",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_partnerVault",
        "type": "address"
      }
    ],
    "name": "addPartnerContracts",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_partner",
        "type": "address"
      }
    ],
    "name": "getPartnerDetails",
    "outputs": [
      {
        "internalType": "address",
        "name": "_partnerVault",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_partnerPayment",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getPartners",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_partner",
        "type": "address"
      }
    ],
    "name": "isPartner",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_partner",
        "type": "address"
      }
    ],
    "name": "isPartnerAlreadyAdded",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_partnerPayment",
        "type": "address"
      }
    ],
    "name": "isPartnerPaymentContract",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "s_addressToPartnerDetails",
    "outputs": [
      {
        "internalType": "address",
        "name": "s_partnerVault",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "s_partnerPayment",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "s_isPartner",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "s_isPartnerPaymentContract",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "s_partners",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]