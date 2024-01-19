import { EContracts } from "@/types";
import { createPublicClient, createWalletClient, http } from "viem";
import { sepolia } from "wagmi";
import { CONTRACTS } from "@/constants";

const clientConfig = {
  chain: sepolia,
  transport: http(),
};

const publicClient = createPublicClient(clientConfig);
const walletClient = createWalletClient(clientConfig);

export const readContract = (
  _contract: EContracts,
  functionName: string,
  args?: Array<unknown>,
) => {
  const { ABI, address } = CONTRACTS[_contract];

  return publicClient.readContract({
    abi: ABI,
    address,
    functionName,
    args,
  });
};

export { publicClient, walletClient };
