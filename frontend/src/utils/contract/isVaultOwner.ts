import { readContract } from "wagmi/actions";
import { CONTRACTS } from "../../constants/index";

export const isVaultOwner = async (address: string): Promise<boolean> => {
  return (await readContract({
    abi: CONTRACTS.PUBLIC.Utils.ABI,
    address: CONTRACTS.PUBLIC.Utils.address,
    functionName: "isPartner",
    args: [address],
  })) as boolean;
};
