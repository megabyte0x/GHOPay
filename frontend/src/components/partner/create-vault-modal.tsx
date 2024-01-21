"use client";
import { CONTRACTS } from "@/constants";
import React, { useEffect, useState } from "react";
import { useAccount, useContractWrite } from "wagmi";
import Step1 from "./create-vault/step1";
import Step2 from "./create-vault/step2";
import Step3 from "./create-vault/step3";
import Step4 from "./create-vault/step4";
import { waitForTransaction } from "wagmi/actions";
import useApprovals from "@/hooks/useApprovals";
import useBalances from "@/hooks/useBalances";
import { getPartnerDetails } from "@/utils/contract";
import { TAddress } from "@/types";

type CreateVaultModalProps = {
  onClose: () => void;
  onNext: () => void;
  step: number;
  onBack: () => void;
};

const CreateVaultModal = ({
  onClose,
  onNext,
  step,
  onBack,
}: CreateVaultModalProps) => {
  const [vaultName, setVaultName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [message, setMessage] = useState("");
  const [stakeGHO, setStakeGHO] = useState(0);
  const [ratio1, setRatio1] = useState(2);
  const [rewardPoints, setRewardPoints] = useState(0);
  const [v, setV] = useState<number>();
  const [s, setS] = useState<string>();
  const [r, setR] = useState<string>();
  const [isApproved, setIsApproved] = useState(false);

  const [currVaultAddr, setCurrVaultAddr] = useState<TAddress>();

  const { address } = useAccount();
  const { availableGho } = useBalances();

  const { approveTestGHOWithPermit } = useApprovals(currVaultAddr);

  useEffect(() => {
    const zerosToAdd = "0".repeat(ratio1);
    console.log(zerosToAdd, ratio1);
    setRewardPoints(Number(`${1}${zerosToAdd}`) * stakeGHO);
  }, [ratio1, stakeGHO]);

  const { writeAsync } = useContractWrite({
    account: address,
    address: CONTRACTS.PUBLIC.PartnerContractsDeployer.address,
    abi: CONTRACTS.PUBLIC.PartnerContractsDeployer.ABI,
    functionName: "registerAsPartner",
    args: [
      CONTRACTS.PUBLIC.TestGHO.address,
      vaultName,
      symbol,
      ratio1,
      BigInt(100 * 10e17),
    ],
  });

  const { writeAsync: writeAsyncPartnerVault } = useContractWrite({
    account: address,
    abi: CONTRACTS.PARTNER.PartnerVault.ABI,
    address: currVaultAddr,
    functionName: "depositGHOWithPermit",
    args: [BigInt(stakeGHO * 10e17), v, r, s],
  });

  const handleVaultCreate = async () => {
    if (!address) throw "Please Log in.";
    if (!ratio1 || !symbol || !vaultName) throw "Please fill all fields.";

    onNext();

    try {
      const { hash } = await writeAsync();
      console.log("Hash generated: ", hash);
      await waitForTransaction({ hash, chainId: 11155111 });
      console.log("Transaction successful");

      const details = await getPartnerDetails(address);
      if (!details) throw "Error fetching partner details";

      setCurrVaultAddr(details.partnerVaultAddr);

      onNext();
    } catch (error) {
      if (typeof error === "string") {
        setMessage(error);
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
      console.error(error);
    }
  };

  const handleApproveToken = async () => {
    try {
      if (!address) throw "Please Log in.";
      if (!stakeGHO) throw "Please fill all fields.";
      const {
        r: newr,
        s: news,
        v: newv,
      } = await approveTestGHOWithPermit(stakeGHO);
      setV(newv);
      setR(newr);
      setS(news);
      setIsApproved(true);
    } catch (error) {
      if (typeof error === "string") {
        setMessage(error);
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
      console.error(error);
    }
  };

  const handleMintRP = async () => {
    try {
      onNext();

      if (!address) throw "Please Log in.";
      if (!stakeGHO) throw "Please fill all fields.";
      if (!isApproved) throw "Please approve token";

      // await approveTestGhoForPartner();

      console.log("invoked2", currVaultAddr);
      const { hash } = await writeAsyncPartnerVault();
      console.log("Hash generated: ", hash);
      await waitForTransaction({ hash, chainId: 11155111 }),
        console.log("Transaction successful");
      onNext();
    } catch (error) {
      if (typeof error === "string") {
        setMessage(error);
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
      console.error(error);
    }
  };

  if (!availableGho) {
    console.warn("No available GHO");
    return;
  }

  const handleBuyGHO = () => {};
  const handleStakeAll = () => {
    setStakeGHO(availableGho as number);
  };

  const handleVaultName = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setVaultName(e.target.value);
  };
  const handleSymbol = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);

    setSymbol(e.target.value);
  };
  const handleRatio1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setRatio1(Number(e.target.value));
    // XX VALUE printing pre change
  };
  const handleStakedGHO = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStakeGHO(Number(e.target.value));
  };
  console.log(step);
  return (
    <>
      {step > 0 && (
        <div className="items-center justify-center bg-[#21212198] backdrop-blur-md fixed inset-0 flex">
          {step == 1 && (
            <Step1
              onClose={onClose}
              onBack={onBack}
              handleVaultName={handleVaultName}
              handleSymbol={handleSymbol}
              handleRatio1={handleRatio1}
              handleCreate={handleVaultCreate}
              message={message}
              vaultName={vaultName}
              symbol={symbol}
            />
          )}
          {step == 2 && <Step2 />}
          {step == 3 && (
            <Step3
              onClose={onClose}
              handleStakedGHO={handleStakedGHO}
              handleStakeAll={handleStakeAll}
              handleBuyGHO={handleBuyGHO}
              handleBack={onBack}
              message={message}
              availableGho={availableGho as number}
              stakeGHO={stakeGHO}
              rewardPoints={rewardPoints}
              handleMintRP={handleMintRP}
              handleApproveToken={handleApproveToken}
            />
          )}
          {step == 4 && <Step4 />}
        </div>
      )}
    </>
  );
};

export default CreateVaultModal;
