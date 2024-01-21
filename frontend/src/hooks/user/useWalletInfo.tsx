import { CONTRACTS } from "@/constants";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { readContract } from "wagmi/actions";

const isVaultOwner = async (address: string): Promise<boolean> => {
  return (await readContract({
    abi: CONTRACTS.PUBLIC.Utils.ABI,
    address: CONTRACTS.PUBLIC.Utils.address,
    functionName: "isPartner",
    args: [address],
  })) as boolean;
};

function useWalletInfo() {
  const { address } = useAccount();
  const [isPartner, setIsPartner] = useState(false);

  useEffect(() => {
    if (!address || isPartner) return;
    (async () => {
      const isPartner = await isVaultOwner(address);
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
