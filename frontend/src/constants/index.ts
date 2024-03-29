import { toBigNumber } from "@/utils/numbers";
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
    twit: "https://x.com/Lucifer0x17?t=jSI9Ft4M76R6ka7X1ScORg&s=09",
    gitHub: "https://github.com/Lucifer0x17",
    img: "/team/lucifer.png",
  },
  {
    name: "Lilith",
    role: "FrontEnd Developer",
    twit: "https://x.com/0xLPircy?t=3mEAkYIV5XzTV1Z9fMxAEg&s=09",
    gitHub: "https://github.com/0xLPircy",
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
  USER_PARTNER: "/dashboard/user/applyAsPartner",
  USER_SHOP_SWAP: "/dashboard/user",
  PARTNER_VAULT: "/dashboard/partner",
  PARTNER_SHOP: "/dashboard/partner/shop",
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
      address: "0xBdD9c513Be2514F83B72761503F0be2134ec6A1a",
      ABI: TestGHOABI,
    },
    GHOPassport: {
      address: "0x17206705E75249B2Cb885423937e88Fc8f068338",
      ABI: GHOPassportABI,
    },
    GHOPartnerPassport: {
      address: "0xEa9b91D90ff3e904EcF230296D88c30c78E1E4c8",
      ABI: GHOPartnerPassportABI,
    },
    Utils: {
      address: "0x7a6Bb3A480ad1159d4FEE319321e2858c5FdF721",
      ABI: UtilsABI,
    },
    RPool: {
      address: "0x175Ea2DabAeb8d2d1903259226EA109a22E12737",
      ABI: RPoolABI,
    },
    MainVault: {
      address: "0x5f87AE2b5B978FDF21A5495518967e7F3d89EA23",
      ABI: MainVaultABI,
    },
    MainPayment: {
      address: "0xfc0d2439D12A501fc5071b871740b8A0430f1133",
      ABI: MainPaymentABI,
    },
    PartnerContractsDeployer: {
      address: "0x0EcdC9DdF64be06C9b9752f2a7d1CBA6B2f989a7",
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
      ABI: PartnerVaultABI,
    },
    PartnerPayment: {
      ABI: PartnerPaymentABI,
    },
  },
};

export const MAX_REWARDS_PERCENTAGE_CLAIMABLE = toBigNumber(0.5);
