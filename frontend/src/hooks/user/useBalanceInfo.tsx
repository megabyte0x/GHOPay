import { CONTRACTS } from "@/constants";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { readContract } from "wagmi/actions";

type Balance = {
  name: string;
  balance: number;
};

function useBalanceInfo() {
  const { address } = useAccount();
  const [balances, setBalances] = useState<Balance[]>();

  useEffect(() => {
    if (!address) return;
    (async () => {
      const balances = await getGhoBalance(address);
      console.log({ balances });
      setBalances(balances as any);
    })();
  });

  return { balances };
}

const getGhoBalance = async (account: `0x${string}`) => {
  return await readContract({
    abi: CONTRACTS.PUBLIC.TestGHO.ABI,
    address: CONTRACTS.PUBLIC.TestGHO.address,
    functionName: "balanceOf",
    args: [account],
  });
};

export default useBalanceInfo;
