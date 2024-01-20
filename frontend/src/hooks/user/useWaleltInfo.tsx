import { CONTRACTS } from "@/constants";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { readContract } from "wagmi/actions";

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

  // return { isPartner, isUser: !isPartner };
  return {
    isPartner: false,
    isUser: true,
  };
}

const isVaultOwner = async (address: string): Promise<boolean> => {
  return (await readContract({
    abi: CONTRACTS.PUBLIC.Utils.ABI,
    address: CONTRACTS.PUBLIC.Utils.address,
    functionName: "isPartner",
    args: [address],
  })) as boolean;
};

export default useWalletInfo;
