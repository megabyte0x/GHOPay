import { CONTRACTS } from "@/constants";
import { useEffect, useState } from "react";
import { useAccount, useContractWrite } from "wagmi";
import usePartnerDetails from "./partner/usePartnerDetails";
import { TAddress } from "@/types";
import { waitForTransaction } from "wagmi/actions";

type SwapArgs = {
  from: TAddress;
  to: TAddress;
  amount: number;
};

type SwapProps = {
  stakeAmount?: number;
  withdrawAmount?: number;
  swapArgs?: SwapArgs;
};

const useSwap = ({
  stakeAmount,
  swapArgs: _swapArgs,
  withdrawAmount,
}: SwapProps) => {
  const { partnerVaultAddrs } = usePartnerDetails();
  const { address } = useAccount();

  const [swapArgs, setSwapArgs] = useState<unknown[]>();

  const { writeAsync: stakeAsync } = useContractWrite({
    abi: CONTRACTS.PARTNER.PartnerVault.ABI,
    address: partnerVaultAddrs?.[0],
    account: address,
    functionName: "depositGHO",
    args: swapArgs,
  });

  const { writeAsync: swapSync } = useContractWrite({
    abi: CONTRACTS.PUBLIC.RPool.ABI,
    address: CONTRACTS.PUBLIC.RPool.address,
    account: address,
    functionName: "swap",
    args: swapArgs,
  });

  useEffect(() => {
    if (!_swapArgs || withdrawAmount) return;

    if (swapArgs) {
      const args = _swapArgs;
      setSwapArgs([args]);
    } else if (withdrawAmount) {
      const args = {
        amount: withdrawAmount,
        from: CONTRACTS.PUBLIC.MainVault.address,
        to: CONTRACTS.PUBLIC.TestGHO.address,
      } as SwapArgs;
      setSwapArgs([args]);
    } else {
      throw new Error("WTF???");
    }
  }, [withdrawAmount, _swapArgs, swapArgs]);

  const [stake, setStake] = useState<() => Promise<void>>();
  const [withdraw, setWithdraw] = useState<() => Promise<void>>();
  const [swap, setSwap] = useState<() => Promise<void>>();

  useEffect(() => {
    if (!stakeAmount) return;
    const _stake = async () => {
      const { hash } = await stakeAsync();

      await waitForTransaction({
        chainId: 11155111,
        hash,
      });
    };
    setStake(_stake);
  }, [stakeAmount, stakeAsync]);

  useEffect(() => {
    if (!withdrawAmount) return;

    const _withdraw = async () => {
      const { hash } = await swapSync();

      await waitForTransaction({
        chainId: 11155111,
        hash,
      });
    };

    const _swap = _withdraw;

    setWithdraw(_withdraw);
    setSwap(_swap);
  }, [swapSync, withdrawAmount]);

  return { stake, withdraw, swap };
};

export default useSwap;
