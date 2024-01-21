import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { EPublicContracts, TokenInfo } from "@/types";
import { readPublicContract } from "@/utils/contract";
import usePartnerDetails from "./partner/usePartnerDetails";
import { CONTRACTS } from "@/constants";
import { readContract } from "wagmi/actions";

const pollInterval = 10_000; // 10 seconds

const getGpInfo = async () => {
  const promises = ["name", "symbol", "totalAssets", "gpTokenBalance"].map(
    (funcName) => {
      return readContract({
        abi: CONTRACTS.PUBLIC.MainVault.ABI,
        address: CONTRACTS.PUBLIC.MainVault.address,
        functionName: funcName,
        ...(funcName === "gpTokenBalance" && {
          args: [CONTRACTS.PUBLIC.MainPayment.address],
        }),
      });
    },
  );

  const [name, symbol, totalSupply, balance] = (await Promise.all(
    promises,
  )) as unknown as [string, string, number, number];

  return {
    name,
    symbol,
    tokeBalance: Number(balance) / 10e17,
    totalSupply: Number(totalSupply) / 10e17,
  };
};

const useBalances = () => {
  const { address } = useAccount();
  const { details } = usePartnerDetails();

  const [availableGho, setAvailableGho] = useState<number>();
  const [tokens, setTokens] = useState<TokenInfo[]>([]);

  useEffect(() => {
    const fetchBalance = async () => {
      if (address) {
        try {
          const balance = (Number(
            await readPublicContract(EPublicContracts.TestGHO, "balanceOf", [
              address,
            ]),
          ) / 10e17) as number;
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

  useEffect(() => {
    if (!details) return;

    (async () => {
      const tokens = details.map((detail) => ({
        name: detail.name,
        symbol: detail.symbol,
        balance: detail.tokenBalance,
        totalSupply: detail.totalSupply,
        address: detail.addrs.vault,
      }));

      const gpInfo = await getGpInfo();

      tokens.push({
        address: CONTRACTS.PUBLIC.TestGHO.address,
        balance: gpInfo.tokeBalance,
        name: gpInfo.name,
        symbol: gpInfo.symbol,
        totalSupply: gpInfo.totalSupply,
      });

      setTokens(tokens);
    })();
  }, [availableGho, details]);

  return { availableGho, tokens };
};

export default useBalances;
