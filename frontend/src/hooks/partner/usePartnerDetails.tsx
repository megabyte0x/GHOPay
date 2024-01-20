import { CONTRACTS } from "@/constants";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
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

const usePartnerDetails = () => {
  const { address } = useAccount();
  const [partnerPaymentAddr, setPartnerPaymentAddr] = useState<`0x${string}`>();
  const [partnerVaultAddr, setPartnerVaultAddr] = useState<`0x${string}`>();

  useEffect(() => {
    if (!address) return;

    (async () => {
      const details = await getPartnerDetails(address);
      if (!details) return;

      const { partnerPaymentAddr, partnerVaultAddr } = details;

      if (
        partnerPaymentAddr === "0x0000000000000000000000000000000000000000" ||
        partnerVaultAddr === "0x0000000000000000000000000000000000000000"
      ) {
        return;
      }

      setPartnerPaymentAddr(partnerPaymentAddr);
      setPartnerVaultAddr(partnerVaultAddr);
    })();
  }, [address]);

  return {
    partnerPaymentAddr,
    partnerVaultAddr,
  };
};

export default usePartnerDetails;
