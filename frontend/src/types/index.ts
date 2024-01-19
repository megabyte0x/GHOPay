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
  address: `0x${string}`;
  ABI: ABI;
};

export enum EAdminContracts {
  Admin = "Admin",
}

type AdminContract = {
  address: `0x${string}`;
};

export type AdminContractCollection = {
  [K in EAdminContracts]: AdminContract;
};

type PartnerContract = {
  address: `0x${string}`;
};

export type PublicContractCollection = {
  GHOPassport: PublicContract;
  GHOPartnerPassport: PublicContract;
  Utils: PublicContract;
  RPool: PublicContract;
  MainVault: PublicContract;
  MainPayment: PublicContract;
  PartnerContractsDeployer: PublicContract;
  TestGHO: PublicContract;
};

export type PartnerContractCollection = {
  [K in EPartnerContracts]: PartnerContract;
};
