import { ChainInfo, Partner, TeamMember } from "./types";

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

export const CHAINS: { [chainId: number]: ChainInfo } = {
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
    isStripePaymentsEnabled: false,
    isMoneriumPaymentsEnabled: false,
  },
};

type ABI = Array<object>;

type Contract = {
  address: `0x${string}`;
  ABI: ABI;
};

type ContractCollection = {
  TestGHO: Contract;
  GHOPassport: Contract;
  GHOPartnerPassport: Contract;
  Utils: Contract;
  RPool: Contract;
  MainVault: Contract;
  MainPayment: Contract;
  PartnerContractsDeployer: Contract;
  Admin: Contract;
};

export const CONTRACTS: ContractCollection = {
  TestGHO: {
    address: "0xbdd9c513be2514f83b72761503f0be2134ec6a1a" as `0x${string}`,
    ABI: [{}],
  },
  GHOPassport: {
    address: "0x17206705e75249b2cb885423937e88fc8f068338" as `0x${string}`,
    ABI: [{}],
  },
  GHOPartnerPassport: {
    address: "0xea9b91d90ff3e904ecf230296d88c30c78e1e4c8" as `0x${string}`,
    ABI: [{}],
  },
  Utils: {
    address: "0xa9429c88ff54d00d96896cad67e8ebd60e63238d" as `0x${string}`,
    ABI: [{}],
  },
  RPool: {
    address: "0xede73ab19f7ec894c01b70b2be2300b4cd1c3c50" as `0x${string}`,
    ABI: [{}],
  },
  MainVault: {
    address: "0x93ebcd57712b37084564259168b3a1d5738ef76b" as `0x${string}`,
    ABI: [{}],
  },
  MainPayment: {
    address: "0x871886faf72978697829d0a988dd71db5f8f17d2" as `0x${string}`,
    ABI: [{}],
  },
  PartnerContractsDeployer: {
    address: "0x100d3d398ccb077a668dffc9413a147aced36a6e" as `0x${string}`,
    ABI: [{}],
  },
  Admin: {
    address: "0x1cb30cb181d7854f91c2410bd037e6f42130e860" as `0x${string}`,
    ABI: [{}],
  },
};
