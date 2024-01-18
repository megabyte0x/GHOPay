import { Partner, TeamMember } from "./types";

export const TEAM: TeamMember[] = [
  {
    name: "MegaByte",
    role: "Smart Contract Dev",
    twit: "https://x.com/megabyte0x",
    gitHub: "https://github.com/megabyte0x",
    img: "/team/MegaByte.png",
  },
  {
    name: "Lucifer",
    role: "Smart Contract Dev",
    twit: "",
    gitHub: "",
    img: "/team/lucifer.png",
  },
  {
    name: "Lilith",
    role: "Smart Contract Dev",
    twit: "",
    gitHub: "",
    img: "/team/lilith.png",
  },
  {
    name: "Danish",
    role: "Engineering & Product",
    twit: "https://x.com/danisharora099",
    gitHub: "https://github.com/danisharora099",
    img: "/team/Danish.jpeg",
  },
];

export const PARTNERS: Partner[] = [
  { name: "partner_logo", img: "/xIcon.svg" },
  { name: "partner_logo", img: "/xIcon.svg" },
  { name: "partner_logo", img: "/xIcon.svg" },
  { name: "partner_logo", img: "/xIcon.svg" },
  { name: "partner_logo", img: "/xIcon.svg" },
  { name: "partner_logo", img: "/xIcon.svg" },
  { name: "partner_logo", img: "/xIcon.svg" },
  { name: "partner_logo", img: "/xIcon.svg" },
  { name: "partner_logo", img: "/xIcon.svg" },
  { name: "partner_logo", img: "/xIcon.svg" },
  { name: "partner_logo", img: "/xIcon.svg" },
  { name: "partner_logo", img: "/xIcon.svg" },
];

export const ROUTES = {
  LANDING: "/",
  DASHBOARD: "/dashboard",
};

export const CHAINS = {
  11155111: {
    id: "0xaa36a7",
    token: "gsepETH",
    label: "Sepolia",
    shortName: "sep",
    rpcUrl:
      "https://eth-sepolia.g.alchemy.com/v2/sjpVpLLpX9zgjhW5TTpzhvwy7-d3exre",
    blockExplorerUrl: "https://sepolia.etherscan.io",
    color: "#fbc02d",
    faucetUrl: "https://sepoliafaucet.com/",
    isStripePaymentsEnabled: false,
    isMoneriumPaymentsEnabled: false,
  },
  80001: {
    id: "0x13881",
    token: "matic",
    shortName: "matic",
    label: "Mumbai",
    rpcUrl:
      "https://polygon-mumbai.g.alchemy.com/v2/2OPG8Bwoqq7lyqfSanCExgmnqmUNKqeD",
    blockExplorerUrl: "https://mumbai.polygonscan.com",
    color: "#8248E5",
    isStripePaymentsEnabled: false,
    isMoneriumPaymentsEnabled: false,
    faucetUrl: "https://mumbaifaucet.com/",
  },
  1: {
    id: "0x1",
    token: "ETH",
    label: "Ethereum",
    shortName: "eth",
    rpcUrl: "https://cloudflare-eth.com",
    blockExplorerUrl: "https://etherscan.io",
    color: "#DDDDDD",
    transactionServiceUrl: "https://safe-transaction-mainnet.safe.global",
    isStripePaymentsEnabled: false,
    isMoneriumPaymentsEnabled: false,
  },
};
