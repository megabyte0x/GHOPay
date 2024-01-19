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

export enum EContracts {
  TestGHO = "TestGHO",
  GHOPassport = "GHOPassport",
  GHOPartnerPassport = "GHOPartnerPassport",
  Utils = "Utils",
  RPool = "RPool",
  MainVault = "MainVault",
  MainPayment = "MainPayment",
  PartnerContractsDeployer = "PartnerContractsDeployer",
  Admin = "Admin",
}
