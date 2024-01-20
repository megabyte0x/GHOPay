import { getPartnerDetails } from "@/utils/contract/getDeployedContracts";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

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
