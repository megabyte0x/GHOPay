import { CONTRACTS } from "@/constants";
import { TAddress } from "@/types";
import { useAccount, useContractWrite } from "wagmi";
import { waitForTransaction } from "wagmi/actions";
const MAX_ALLOWANCE = BigInt(2) ** BigInt(256) - BigInt(1);

const useApprovals = (partnerVaultAddr?: TAddress) => {
  const { address } = useAccount();

  const { writeAsync: approveTestGhoForPartnerAsync } = useContractWrite({
    account: address,
    abi: CONTRACTS.PUBLIC.TestGHO.ABI,
    address: CONTRACTS.PUBLIC.TestGHO.address,
    functionName: "approve",
    args: [partnerVaultAddr, MAX_ALLOWANCE],
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

  const approveTestGhoForPartner = async () => {
    if (!partnerVaultAddr) {
      throw new Error("Partner Vault Address not found");
    }
    const { hash } = await approveTestGhoForPartnerAsync();
    console.info(`Approval Test GHO for partner: Transaction hash: ${hash}`);
    await waitForTransaction({ hash, chainId: 11155111 });
    console.info(`Approval Test GHO for partner: Transaction successful`);
  };

  const approveTestGhoForMain = async () => {
    if (!partnerVaultAddr) {
      throw new Error("Partner Vault Address not found");
    }
    const { hash } = await approveTestGhoForMainAsync();
    console.info(`Approval Test GHO for main: Transaction hash: ${hash}`);
    await waitForTransaction({ hash, chainId: 11155111 });
    console.info(`Approval Test GHO for main: Transaction successful`);
  };

  return { approveTestGhoForPartner, approveTestGhoForMain, approveSwap };
};

export default useApprovals;
