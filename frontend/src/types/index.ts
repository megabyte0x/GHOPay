export type TAddress = `0x${string}`;

export type PartnerInfo = {
  name: string;
  symbol: string;
  totalSupply: number;
  tokenBalance: number;
  // totalSupplyWithUsers: number;
  addrs: {
    vault: TAddress;
    payment: TAddress;
    partner: TAddress;
  };
};

export type TokenInfo = {
  name: string;
  address: TAddress;
  symbol: string;
  balance: number;
};

export type TeamMember = {
  name: string;
  role: string;
  twit: string;
  gitHub: string;
  img: string;
};

export type Partner = {
  name: string;
  img: string;
};

export enum EDashboardNavSelected {
  SHOP = "shop",
  APPLY_AS_A_PARTNER = "apply-as-a-partner",
}

export type ChainInfo = {
  id: string;
  token: string;
  label: string;
  shortName: string;
  rpcUrl: string;
  blockExplorerUrl: string;
  color: string;
  faucetUrl?: string;
  isStripePaymentsEnabled: boolean;
  isMoneriumPaymentsEnabled: boolean;
};

// export enum EContracts {
//   TestGHO = "TestGHO",
//   GHOPassport = "GHOPassport",
//   GHOPartnerPassport = "GHOPartnerPassport",
//   Utils = "Utils",
//   RPool = "RPool",
//   MainVault = "MainVault",
//   MainPayment = "MainPayment",
//   PartnerContractsDeployer = "PartnerContractsDeployer",
//   Admin = "Admin",
// }

export enum EPublicContracts {
  TestGHO = "TestGHO",
  GHOPassport = "GHOPassport",
  GHOPartnerPassport = "GHOPartnerPassport",
  Utils = "Utils",
  RPool = "RPool",
  MainVault = "MainVault",
  MainPayment = "MainPayment",
  PartnerContractsDeployer = "PartnerContractsDeployer",
}

export enum EPartnerContracts {
  PartnerVault = "PartnerVault",
  PartnerPayment = "PartnerPayment",
}

type ABI = Array<object>;

type PublicContract = {
  address: TAddress;
  ABI: ABI;
};

export enum EAdminContracts {
  Admin = "Admin",
}

type AdminContract = {
  address: TAddress;
};

export type AdminContractCollection = {
  [K in EAdminContracts]: AdminContract;
};

type PartnerContract = {
  ABI: ABI;
};

export type PublicContractCollection = {
  [K in EPublicContracts]: PublicContract;
};

export type PartnerContractCollection = {
  [K in EPartnerContracts]: PartnerContract;
};
