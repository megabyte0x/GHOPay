import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";
import { CONTRACTS } from "@/constants";
import { EPublicContracts, PublicContractCollection } from "@/types";
import { readContract } from "wagmi/actions";

const clientConfig = {
  chain: sepolia,
  transport: http(),
};

const publicClient = createPublicClient(clientConfig);

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

export { publicClient };

export const getPartnerDetails = async (address: string) => {
  const response = (await readContract({
    abi: CONTRACTS.PUBLIC.Utils.ABI,
    address: CONTRACTS.PUBLIC.Utils.address,
    functionName: "s_addressToPartnerDetails",
    args: [address],
  })) as Array<TAddress> | undefined;

  if (!response || response.length === 0) {
    return null;
  }

  const [partnerVaultAddr, partnerPaymentAddr] = response;

  return {
    partnerVaultAddr,
    partnerPaymentAddr,
  };
};
