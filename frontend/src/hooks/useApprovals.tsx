import { CONTRACTS } from "@/constants";
import "wagmi/window";
import { signERC2612Permit } from "eth-permit";
import { useAccount, useContractWrite } from "wagmi";
import { waitForTransaction } from "wagmi/actions";
import { useEffect, useState } from "react";
import usePartnerDetails from "./partner/usePartnerDetails";
import { TAddress } from "@/types";
const MAX_ALLOWANCE = BigInt(2) ** BigInt(256) - BigInt(1);

const useApprovals = (vaultAddr: TAddress) => {
  const { address } = useAccount();
  const [r, setR] = useState("");
  const [v, setV] = useState<number>();
  const [s, setS] = useState("");

  const { currVaultAddr, partnerVaultAddrs } = usePartnerDetails();

  const [vaultAddrToUse, setVaultAddrToUse] = useState<TAddress>();

  useEffect(() => {
    if (!vaultAddr) setVaultAddrToUse(currVaultAddr);
    else setVaultAddrToUse(vaultAddr);
  }, [partnerVaultAddrs, currVaultAddr, vaultAddr]);

  const { writeAsync: approveTestGhoForPartnerAsync } = useContractWrite({
    account: address,
    abi: CONTRACTS.PUBLIC.TestGHO.ABI,
    address: CONTRACTS.PUBLIC.TestGHO.address,
    functionName: "approve",
    args: [vaultAddrToUse, MAX_ALLOWANCE],
  });

  const { writeAsync: approveSwap } = useContractWrite({
    account: address,
    abi: CONTRACTS.PUBLIC.MainVault.ABI,
    address: CONTRACTS.PUBLIC.MainVault.address,
    functionName: "approve",
    args: [CONTRACTS.PUBLIC.RPool.address, MAX_ALLOWANCE],
  });

  const { writeAsync: approveTestGhoForMainAsync } = useContractWrite({
    account: address,
    abi: CONTRACTS.PUBLIC.TestGHO.ABI,
    address: CONTRACTS.PUBLIC.TestGHO.address,
    functionName: "approve",
    args: [CONTRACTS.PUBLIC.MainPayment.address, MAX_ALLOWANCE],
  });

  const approveTestGHOWithPermit = async (value: number) => {
    console.log("invoked");
    if (!currVaultAddr) {
      throw new Error("Partner Vault address not found");
    }
    // const block = await publicClient.getBlock();
    const result = await signERC2612Permit(
      window.ethereum,
      CONTRACTS.PUBLIC.TestGHO.address,
      address as string,
      currVaultAddr,
      BigInt(value * 10e17).toString(),
      // Number(block.timestamp + BigInt(3600)),
    );
    console.log("partner vault:", currVaultAddr);
    setV(result.v);
    setR(result.r);
    setS(result.s);

    console.log("result:", result);
    return result;
  };

  const approveTestGhoForPartner = async () => {
    if (!vaultAddrToUse) {
      throw new Error("Partner Vault Address not found");
    }
    const { hash } = await approveTestGhoForPartnerAsync();
    console.info(`Approval Test GHO for partner: Transaction hash: ${hash}`);
    await waitForTransaction({ hash, chainId: 11155111 });
    console.info(`Approval Test GHO for partner: Transaction successful`);
  };

  const approveTestGhoForMain = async () => {
    if (!vaultAddrToUse) {
      throw new Error("Partner Vault Address not found");
    }
    const { hash } = await approveTestGhoForMainAsync();
    console.info(`Approval Test GHO for main: Transaction hash: ${hash}`);
    await waitForTransaction({ hash, chainId: 11155111 });
    console.info(`Approval Test GHO for main: Transaction successful`);
  };

  return {
    approveTestGhoForPartner,
    approveTestGhoForMain,
    approveSwap,
    approveTestGHOWithPermit,
    r,
    s,
    v,
  };
};

export default useApprovals;
