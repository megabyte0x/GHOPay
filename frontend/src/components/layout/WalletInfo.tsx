"use client";
import useBalances from "@/hooks/useBalances";
import Image from "next/image";
import { useState } from "react";
import { useAccount, useDisconnect } from "wagmi";

const WalletInfo = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const [accVis, setAccVis] = useState(false);
  const [balancesVis, setBalancesVis] = useState(false);
  const handleLogout = () => {
    disconnect();
  };

  const { tokens } = useBalances();

  const handleChangeChain = () => {};

  if (!address) return;

  return (
    <div className="flex gap-[8px] items-center">
      <div
        onMouseEnter={() => {
          setBalancesVis(true);
        }}
        onMouseLeave={() => {
          setBalancesVis(false);
        }}
        className="flex gap-[6px] items-center text-[#ddd7fe]"
      >
        <Image src={"/ticketIcon.svg"} height={21} width={21} alt="reward" />
        <h2 className="text-[15px] leading-[20px] font-medium">My Balances</h2>
        <Image src={"/downArrow.svg"} alt="dropDown" height={24} width={24} />
        {balancesVis && (
          <ul
            className="absolute right-70 top-[51px] 
          rounded-[6px] bg-[#1b171f] border-[#372e4c] border-[1px]
          min-w-[150px]"
          >
            {tokens.map((token) => (
              <li
                key={token.name}
                className=" flex gap-[8px] py-[8px] px-[21px]
        text-[#DBD2EF] text-[14px] leading-[20px] font-medium
        border-b-[1px] border-[#372e4c] border-solid"
              >
                {token.name}: <span className="font-bold">{token.balance}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="px-[1px] py-[24px] bg-[#444349] rounded-full"></div>
      <div
        onMouseEnter={() => {
          setAccVis(true);
        }}
        onMouseLeave={() => {
          setAccVis(false);
        }}
        className="flex gap-[12px] items-center cursor-pointer"
      >
        <Image src={"/pfp.svg"} height={36} width={36} alt="pfp" />
        <div className="flex gap-[8px] items-center">
          <p className="text-white">
            {address.slice(0, 5)}...{address.slice(38, 44)}
          </p>
          <Image src={"/downArrow.svg"} alt="dropDown" height={24} width={24} />
        </div>
        {accVis && (
          <ul
            className="absolute right-20 top-[51px] 
          rounded-[6px] bg-[#1b171f] border-[#372e4c] border-[1px]"
          >
            <li
              onClick={handleChangeChain}
              className=" flex gap-[8px] py-[8px] px-[21px]
        text-[#DBD2EF] text-[14px] leading-[20px] font-medium
  
      hover:bg-[#3e3547] cursor-pointer"
            >
              Change Chain
            </li>
            <li
              onClick={handleLogout}
              className=" flex gap-[8px] py-[8px] px-[21px]
        text-[#DBD2EF] text-[14px] leading-[20px] font-medium
      
      hover:bg-[#3e3547] cursor-pointer"
            >
              <Image src={"/logOut.svg"} alt="logout" height={18} width={18} />
              <h3>Log out</h3>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default WalletInfo;
