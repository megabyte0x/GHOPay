import Image from "next/image";
import React, { useEffect, useState } from "react";
import Swap from "../user/swap";
import { TokenInfo } from "@/types";
import { CONTRACTS } from "@/constants";
import useBalances from "@/hooks/useBalances";
import usePartnerDetails from "@/hooks/partner/usePartnerDetails";
import { useAccount } from "wagmi";

const VaultInfo = () => {
  const { address } = useAccount();
  const { tokens } = useBalances();
  const { details } = usePartnerDetails();

  const [totalTokensSupply, setTotalTokensSupply] = useState(0);
  const [partnerTokens, setPartnerTokens] = useState(0);
  const [totalTokensUsers, setTotalTokensUsers] = useState(0);
  const [vaultName, setVaultName] = useState("MonkeDAO");
  const [symbol, setSymbol] = useState("MONKE");
  const [stakedGHO, setStakedGHO] = useState(0);
  const [rewardPoints, setRewardPoints] = useState(0);

  useEffect(() => {
    if (!details) return;
    if (details.length === 0) return;

    for (const partnerInfo of details) {
      if (partnerInfo.addrs.partner !== address) return;
      setVaultName(partnerInfo.name);
      setSymbol(partnerInfo.symbol);
      setPartnerTokens(Number(partnerInfo.tokenBalance.toFixed(2)));
      setTotalTokensSupply(Number(partnerInfo.totalSupply.toFixed(2)));
      setStakedGHO(Number(partnerInfo.stakedGho.toFixed(2)));
      setTotalTokensUsers(
        Number((partnerInfo.totalSupply - partnerInfo.tokenBalance).toFixed(2)),
      );
    }
  }, [address, details]);

  const [openStakeMore, setOpenStakeMore] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);

  const handleWithdraw = () => {
    setOpenWithdraw(true);
  };
  const handleStakeMore = () => {
    setOpenStakeMore(true);
  };

  const GHO: TokenInfo[] = [
    {
      name: "GHO",
      symbol: "GHO",
      address: CONTRACTS.PUBLIC.TestGHO.address,
      balance: tokens.find((token) => token.name === "GHO")?.balance || 0,
    },
  ];
  const GP: TokenInfo[] = [
    {
      name: "GP",
      symbol: "GP",
      address: CONTRACTS.PUBLIC.MainVault.address,
      balance: tokens.find((token) => token.name === "GP")?.balance || 0,
    },
  ];

  return (
    <div className="flex flex-col gap-[48px] px-[112px] pb-[48px] pt-[96px]">
      <div
        className="border-solid border-b-[1px] border-[#FFFFFF1A] 
  flex justify-between w-full pb-[24px]"
      >
        <div className="flex gap-[16px]">
          {/* ICON */}
          <div className="text-[30px] font-semibold leading-[38px] text-[#dbd2ef]">
            Your Vault
          </div>
        </div>
        <div className="flex gap-[16px]">
          <button
            onClick={handleWithdraw}
            className="bg-[rgba(105,_65,_198,_0.3)] rounded-lg
      flex justify-center items-center
      gap-[8px] cursor-pointer py-[10px] px-[20px]
      hover:opacity-80"
          >
            <Image alt="withdraw" src={"/upload.svg"} height={20} width={20} />
            <div className="font-semibold text-[16px] leading-[24px] text-[#c3b5fd]">
              Withdraw
            </div>
          </button>
          <button
            onClick={handleStakeMore}
            className="border-solid border-[#a48afb] border-[1px] rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] bg-[#6941c6] 
        flex items-center justify-center cursor-pointer px-[20px] py-[10px] 
        hover:opacity-80"
          >
            <Image alt="stake" src={"/plus.svg"} height={20} width={20} />
            <div className="font-semibold text-[16px] leading-[24px] text-[#FBFAFF]">
              Stake More
            </div>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-[24px]">
        <div
          className="border-solid rounded-[12px] border-[1px] border-[#491c96] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] bg-[#1b0f31] 
flex flex-col justify-center text-left gap-[24px] p-[24px]"
        >
          <div className="flex gap-[12px]">
            <Image
              alt="coins"
              src={"/coins-stacked.svg"}
              height={24}
              width={24}
            />
            <div className="font-semibold leading-[24px] text-[#C3B5FD] text-[16px]">
              Total Tokens in Supply
            </div>
          </div>
          <div className="text-[32px] font-semibold tracking-[-0.64] leading-[40px] text-[#ddd6fe]">
            {totalTokensSupply}
          </div>
        </div>
        <div
          className="border-solid rounded-[12px] border-[1px] border-[#491c96] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] bg-[#1b0f31] 
flex flex-col justify-center text-left gap-[24px] p-[24px]"
        >
          <div className="flex gap-[12px]">
            <Image alt="wallet" src={"/wallet.svg"} height={24} width={24} />
            <div className="font-semibold leading-[24px] text-[#C3B5FD] text-[16px]">
              Partner(s) Token Balance
            </div>
          </div>
          <div className="text-[32px] font-semibold tracking-[-0.64] leading-[40px] text-[#ddd6fe]">
            {partnerTokens}
          </div>
        </div>
        <div
          className="border-solid rounded-[12px] border-[1px] border-[#491c96] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] bg-[#1b0f31] 
flex flex-col justify-center text-left gap-[24px] p-[24px]"
        >
          <div className="flex gap-[12px]">
            <Image alt="users" src={"/users.svg"} height={24} width={24} />
            <div className="font-semibold leading-[24px] text-[#C3B5FD] text-[16px]">
              Total Tokens with Users
            </div>
          </div>
          <div className="text-[32px] font-semibold tracking-[-0.64] leading-[40px] text-[#ddd6fe]">
            {totalTokensUsers}
          </div>
        </div>
      </div>
      {/* Vault Info */}
      <h3 className="text-[18px] text-[#ffffff] leading-[24px] border-solid border-b-[1px] border-[#FFFFFF1A] pb-[24px]">
        Vault Info
      </h3>
      <div className="grid grid-cols-4 gap-[24px]">
        <div
          className="border-solid rounded-[12px] border-[1px] border-[#491c96] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] bg-[#1b0f31] 
flex flex-col justify-center text-left gap-[24px] p-[24px]"
        >
          <div className="flex gap-[12px]">
            <Image
              alt="name"
              src={"/letter-spacing.svg"}
              height={24}
              width={24}
            />
            <div className="font-semibold leading-[24px] text-[#C3B5FD] text-[16px]">
              Vault Name
            </div>
          </div>
          <div className="text-[32px] font-semibold tracking-[-0.64] leading-[40px] text-[#ddd6fe]">
            {vaultName}
          </div>
        </div>
        <div
          className="border-solid rounded-[12px] border-[1px] border-[#491c96] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] bg-[#1b0f31] 
flex flex-col justify-center text-left gap-[24px] p-[24px]"
        >
          <div className="flex gap-[12px]">
            <Image
              alt="symbol"
              src={"/currency-dollar-circle.svg"}
              height={24}
              width={24}
            />
            <div className="font-semibold leading-[24px] text-[#C3B5FD] text-[16px]">
              Vault Symbol
            </div>
          </div>
          <div className="text-[32px] font-semibold tracking-[-0.64] leading-[40px] text-[#ddd6fe]">
            {symbol}
          </div>
        </div>
        <div
          className="border-solid rounded-[12px] border-[1px] border-[#491c96] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] bg-[#1b0f31] 
flex flex-col justify-center text-left gap-[24px] p-[24px]"
        >
          <div className="flex gap-[12px]">
            <Image alt="stake" src={"/safe.svg"} height={24} width={24} />
            <div className="font-semibold leading-[24px] text-[#C3B5FD] text-[16px]">
              GHO Staked
            </div>
          </div>
          <div className="text-[32px] font-semibold tracking-[-0.64] leading-[40px] text-[#ddd6fe]">
            {stakedGHO}
          </div>
        </div>
        <div
          className="border-solid rounded-[12px] border-[1px] border-[#491c96] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] bg-[#1b0f31] 
flex flex-col justify-center text-left gap-[24px] p-[24px]"
        >
          <div className="flex gap-[12px]">
            <Image
              alt="reward"
              src={"/ticketIcon.svg"}
              height={24}
              width={24}
            />
            <div className="font-semibold leading-[24px] text-[#C3B5FD] text-[16px]">
              Reward Points
            </div>
          </div>
          <div className="text-[32px] font-semibold tracking-[-0.64] leading-[40px] text-[#ddd6fe]">
            {rewardPoints}
          </div>
        </div>
      </div>
      {(openStakeMore || openWithdraw) && (
        <div className="items-center justify-center bg-[#21212198] backdrop-blur-md fixed inset-0 flex">
          <Swap
            onClose={() => {
              openStakeMore && setOpenStakeMore(false);
              openWithdraw && setOpenWithdraw(false);
            }}
            fromTokenList={openStakeMore ? GHO : GP}
            toTokenList={openStakeMore ? GP : GHO}
          />
        </div>
      )}
    </div>
  );
};

export default VaultInfo;
