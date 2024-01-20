import { isVaultOwner } from "@/utils/contract/isVaultOwner";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

function useWalletInfo() {
  const { address } = useAccount();
  const [isPartner, setIsPartner] = useState(false);

  useEffect(() => {
    if (!address || isPartner) return;
    (async () => {
      const isPartner = await isVaultOwner(address);
      console.log({ isPartner });
      setIsPartner(isPartner);
    })();
  }, [address, isPartner]);

  return { isPartner, isUser: !isPartner };
  // return {
  //   isPartner: false,
  //   isUser: true,
  // };
}

export default useWalletInfo;
