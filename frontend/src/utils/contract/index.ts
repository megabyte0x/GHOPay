import { createPublicClient, createWalletClient, http } from "viem";
import { sepolia } from "viem/chains";
import { CONTRACTS } from "@/constants";
import { EPublicContracts, PublicContractCollection } from "@/types";

const clientConfig = {
  chain: sepolia,
  transport: http(),
};

const publicClient = createPublicClient(clientConfig);
const walletClient = createWalletClient(clientConfig);

export const writePublicContract = async (
  _contract: EPublicContracts,
  functionName: string,
  account: `0x${string}`,
  args?: Array<unknown>,
) => {
  if (!(_contract in CONTRACTS.PUBLIC)) {
    throw new Error(`Invalid contract key: ${_contract}`);
  }
  const { ABI, address } =
    CONTRACTS.PUBLIC[_contract as keyof PublicContractCollection];

  console.log(">>>>>>>", typeof address, args, account);

  try {
    const { request } = await publicClient.simulateContract({
      account,
      address,
      abi: ABI,
      functionName,
      args,
    });
    console.log(request);
    return await walletClient.writeContract(request);
  } catch (error) {
    console.error(error);
  }
};

export const readPublicContract = async (
  _contract: EPublicContracts,
  functionName: string,
  args?: Array<unknown>,
) => {
  if (!(_contract in CONTRACTS.PUBLIC)) {
    throw new Error(`Invalid contract key: ${_contract}`);
  }
  const { ABI, address } =
    CONTRACTS.PUBLIC[_contract as keyof PublicContractCollection];

  return await publicClient.readContract({
    abi: ABI,
    address,
    functionName,
    args,
  });
};

export { publicClient, walletClient };
