import { toBigNumber } from "@/utils/helper-functions";
import {
  AdminContractCollection,
  ChainInfo,
  Partner,
  PartnerContractCollection,
  PublicContractCollection,
  TeamMember,
} from "../types";
import {
  GHOPartnerPassportABI,
  GHOPassportABI,
  MainPaymentABI,
  MainVaultABI,
  PartnerContractsDeployerABI,
  PartnerPaymentABI,
  PartnerVaultABI,
  RPoolABI,
  TestGHOABI,
  UtilsABI,
} from "./ABI/index";

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

export const CONTRACTS: {
  PUBLIC: PublicContractCollection;
  ADMIN: AdminContractCollection;
  PARTNER: PartnerContractCollection;
} = {
  PUBLIC: {
    TestGHO: {
      address: "0xbdd9c513be2514f83b72761503f0be2134ec6a1a",
      ABI: TestGHOABI,
    },
    GHOPassport: {
      address: "0x17206705e75249b2cb885423937e88fc8f068338",
      ABI: GHOPassportABI,
    },
    GHOPartnerPassport: {
      address: "0xea9b91d90ff3e904ecf230296d88c30c78e1e4c8",
      ABI: GHOPartnerPassportABI,
    },
    Utils: {
      address: "0xa9429c88ff54d00d96896cad67e8ebd60e63238d",
      ABI: UtilsABI,
    },
    RPool: {
      address: "0xede73ab19f7ec894c01b70b2be2300b4cd1c3c50",
      ABI: RPoolABI,
    },
    MainVault: {
      address: "0x93ebcd57712b37084564259168b3a1d5738ef76b",
      ABI: MainVaultABI,
    },
    MainPayment: {
      address: "0x871886faf72978697829d0a988dd71db5f8f17d2",
      ABI: MainPaymentABI,
    },
    PartnerContractsDeployer: {
      address: "0x857661CFA34689AbbB5d2fcc9f508b543461C4B0",
      ABI: PartnerContractsDeployerABI,
    },
  },
  ADMIN: {
    Admin: {
      address: "0x1cb30cb181d7854f91c2410bd037e6f42130e860",
    },
  },
  PARTNER: {
    PartnerVault: {
      address: "0x1cb30cb181d7854f91c2410bd037e6f42130e860",
      ABI: PartnerVaultABI,
    },
    PartnerPayment: {
      address: "0x1cb30cb181d7854f91c2410bd037e6f42130e860",
      ABI: PartnerPaymentABI,
    },
  },
};

export const MAX_REWARDS_PERCENTAGE_CLAIMABLE = toBigNumber(0.5);
