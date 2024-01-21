import { CONTRACTS } from "@/constants";
import { useCallback, useEffect, useState } from "react";
import { useAccount, useContractWrite } from "wagmi";
import usePartnerDetails from "./partner/usePartnerDetails";
import { SwapArgs } from "@/types";
import { waitForTransaction } from "wagmi/actions";
import useApprovals from "./useApprovals";

const useSwap = ({
  stakeAmount,
  swapArgs: _swapArgs,
  withdrawAmount,
}: SwapArgs) => {
  const { currVaultAddr } = usePartnerDetails();
  const { address } = useAccount();
  const { approveSwap } = useApprovals();

  const [swapArgs, setSwapArgs] = useState<unknown[]>();

  const { writeAsync: stakeAsync } = useContractWrite({
    abi: CONTRACTS.PARTNER.PartnerVault.ABI,
    address: currVaultAddr,
    account: address,
    functionName: "depositGHO",
    args: swapArgs,
  });

  const { writeAsync: swapASync } = useContractWrite({
    abi: CONTRACTS.PUBLIC.RPool.ABI,
    address: CONTRACTS.PUBLIC.RPool.address,
    account: address,
    functionName: "swap",
    args: swapArgs,
  });

  useEffect(() => {
    console.log("here");
    if (!_swapArgs?.amount && !withdrawAmount && !stakeAmount) return;

    console.log("not here?");

    if (_swapArgs?.amount !== undefined) {
      // swapping
      console.log("swapping args");
      const args = [_swapArgs.from, _swapArgs.to, _swapArgs.amount * 10e17];
      setSwapArgs(args);
    } else if (withdrawAmount !== undefined) {
      console.log("withdrawing args");
      const args = [
        CONTRACTS.PUBLIC.MainVault.address,
        CONTRACTS.PUBLIC.TestGHO.address,
        withdrawAmount * 10e17,
      ];
      setSwapArgs(args);
    } else if (stakeAmount !== undefined) {
      console.log("staking args");
      const args = [stakeAmount * 10e17];
      setSwapArgs(args);
    } else {
      throw new Error("WTF???");
    }
  }, [withdrawAmount, _swapArgs, stakeAmount]);

  const swap = useCallback(async () => {
    console.log("Performing swap operation");
    console.log({
      stakeAmount,
      withdrawAmount,
      swapArgs,
    });

    if (stakeAmount !== undefined) {
      console.log("Staking");
      const { hash } = await stakeAsync();
      console.log("called?");
      await waitForTransaction({ chainId: 11155111, hash });
    } else if (withdrawAmount !== undefined) {
      console.log("Withdrawing");
      await approveSwap();
      const { hash } = await swapASync();
      await waitForTransaction({ chainId: 11155111, hash });
    } else if (_swapArgs?.amount !== undefined) {
      console.log("Swapping");
      await approveSwap();
      const { hash } = await swapASync();
      await waitForTransaction({ chainId: 11155111, hash });
    } else {
      console.error("Invalid swap operation");
      throw new Error("Invalid operation");
    }
  }, [
    stakeAmount,
    withdrawAmount,
    swapArgs,
    _swapArgs?.amount,
    stakeAsync,
    approveSwap,
    swapASync,
  ]);

  return { swap };
};

export default useSwap;
