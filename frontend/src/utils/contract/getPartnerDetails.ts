import { CONTRACTS } from "@/constants";
import { readContract } from "wagmi/actions";

export const getPartnerDetails = async (address: string) => {
  const response = (await readContract({
    abi: CONTRACTS.PUBLIC.Utils.ABI,
    address: CONTRACTS.PUBLIC.Utils.address,
    functionName: "s_addressToPartnerDetails",
    args: [address],
  })) as Array<`0x${string}`> | undefined;

  if (!response || response.length === 0) {
    return null;
  }
  const [partnerVaultAddr, partnerPaymentAddr] = response;

  return {
    partnerVaultAddr,
    partnerPaymentAddr,
  };
};
