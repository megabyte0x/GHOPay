"use client";
import Image from "next/image";
import { useState } from "react";

const ownerAddress = "0x000000000000000000000000000000000000000000";
const rewardPoints = 0;

const WalletInfo = () => {
  const [vis, setVis] = useState(false);
  return (
    <div className="flex gap-[8px] items-center">
      <div className="flex gap-[6px] items-center text-[#ddd7fe]">
        <Image src={"/ticketIcon.svg"} height={21} width={21} alt="reward" />
        <h2 className="text-[15px] leading-[20px] font-medium">
          Balance: {rewardPoints} Reward Points
        </h2>
      </div>
      <div className="px-[1px] py-[24px] bg-[#444349] rounded-full"></div>
      <div
        onMouseEnter={() => {
          setVis(true);
        }}
        onMouseLeave={() => {
          setVis(false);
        }}
        className="flex gap-[12px] items-center cursor-pointer"
      >
        <Image src={"/pfp.svg"} height={36} width={36} alt="pfp" />
        <div className="flex gap-[8px] items-center">
          <p className="text-white">
            {ownerAddress.slice(0, 5)}...{ownerAddress.slice(38, 44)}
          </p>
          <Image src={"/downArrow.svg"} alt="dropDown" height={24} width={24} />
        </div>
        {vis && (
          <div
            className="absolute right-20 top-[45px] flex gap-[8px] pl-[10px] py-[8px] pr-[27px]
        text-[#DBD2EF] text-[14px] leading-[20px] font-medium
      rounded-[6px] bg-[#1b171f] border-[#372e4c] border-[1px]
      hover:bg-[#3e3547] cursor-pointer"
          >
            <Image src={"/logOut.svg"} alt="logout" height={18} width={18} />
            <h3>Log out</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletInfo;
