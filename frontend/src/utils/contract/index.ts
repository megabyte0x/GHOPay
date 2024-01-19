import { createPublicClient, createWalletClient, http } from "viem";
import { sepolia } from "wagmi";
import { CONTRACTS } from "@/constants";
import { EPublicContracts, PublicContractCollection } from "@/types";

const clientConfig = {
  chain: sepolia,
  transport: http(),
};

const publicClient = createPublicClient(clientConfig);
const walletClient = createWalletClient(clientConfig);

export const readPublicContract = (
  _contract: EPublicContracts,
  functionName: string,
  args?: Array<unknown>,
) => {
  if (!(_contract in CONTRACTS.PUBLIC)) {
    throw new Error(`Invalid contract key: ${_contract}`);
  }
  const { ABI, address } =
    CONTRACTS.PUBLIC[_contract as keyof PublicContractCollection];

  return publicClient.readContract({
    abi: ABI,
    address,
    functionName,
    args,
  });
};

export { publicClient, walletClient };
