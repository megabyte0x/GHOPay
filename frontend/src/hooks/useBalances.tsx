import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { EPublicContracts } from "@/types";
import { readPublicContract } from "@/utils/contract";

const useBalances = () => {
  const { address } = useAccount();
  const [availableGho, setAvailableGho] = useState<number>();
  const pollInterval = 10_000; // 10 seconds

  useEffect(() => {
    const fetchBalance = async () => {
      if (address) {
        try {
          const balance = Number(
            await readPublicContract(EPublicContracts.TestGHO, "balanceOf", [
              address,
            ]),
          ) as number;
          setAvailableGho(balance);
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      }
    };

    fetchBalance();

    const intervalId = setInterval(fetchBalance, pollInterval);

    return () => clearInterval(intervalId);
  }, [address]);

  return { availableGho };
};

export default useBalances;
