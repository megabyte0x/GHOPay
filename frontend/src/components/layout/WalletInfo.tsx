"use client";
import Image from "next/image";
import { useState } from "react";

const ownerAddress = "0x000000000000000000000000000000000000000000";
const rewardPoints = 0;

const WalletInfo = () => {
  const [vis, setVis] = useState(false);
  const handleLogout = () => {};
  const handleChangeChain = () => {};
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
