import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { EPublicContracts, TokenInfo } from "@/types";
import { readPublicContract } from "@/utils/contract";
import usePartnerDetails from "./partner/usePartnerDetails";
import { CONTRACTS } from "@/constants";
import { readContract } from "wagmi/actions";

const pollInterval = 10_000; // 10 seconds

const getGpInfo = async () => {
  const promises = [
    "name",
    "symbol",
    "totalSupply",
    "totalAssets",
    "gpTokenBalance",
  ].map((funcName) => {
    return readContract({
      abi: CONTRACTS.PUBLIC.MainVault.ABI,
      address: CONTRACTS.PUBLIC.MainVault.address,
      functionName: funcName,
      ...(funcName === "gpTokenBalance" && {
        args: [CONTRACTS.PUBLIC.MainPayment.address],
      }),
    });
  });

  const [name, symbol, totalSupply, stakedGho, partnerTokenBalance] =
    (await Promise.all(promises)) as unknown as [
      string,
      string,
      number,
      number,
      number,
    ];

  return {
    name,
    symbol,
    totalSupply: Number(totalSupply) / 10e17,
    tokeBalance: Number(partnerTokenBalance) / 10e17,
    stakeGho: Number(stakedGho) / 10e17,
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
        stakedGho: detail.stakedGho,
      }));

      tokens.push({
        address: CONTRACTS.PUBLIC.TestGHO.address,
        balance: availableGho || 0,
        name: "GHO",
        symbol: "GHO",
        totalSupply: 0,
        stakedGho: 0,
      });

      const gpInfo = await getGpInfo();

      tokens.push({
        address: CONTRACTS.PUBLIC.MainVault.address,
        balance: gpInfo.tokeBalance,
        name: gpInfo.name,
        symbol: gpInfo.symbol,
        totalSupply: gpInfo.totalSupply,
        stakedGho: gpInfo.stakeGho,
      });

      setTokens(tokens);
    })();
  }, [availableGho, details]);

  return { availableGho, tokens };
};

export default useBalances;
