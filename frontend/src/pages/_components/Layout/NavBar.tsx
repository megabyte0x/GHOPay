import Image from "next/image";
import React from "react";

const NavBar = () => {
  return (
    <div className="border-b-[1px] border-[#DBD2EF1A] bg-[#14141B] h-[68px] px-20 flex items-center justify-between ">
      <div className="flex gap-[40px]">
        <div className="flex gap-[8px]">
          <Image src={"/logo.svg"} width={32} height={32} alt="logo" />{" "}
          <h1 className="text-[20px] leading-[24px] text-[#DBD2EF] font-semibold">
            GHOPay
          </h1>
        </div>
        <ul className="flex flex-row gap-[32px] text-[16px] leading-[24px] font-semibold text-[#A69DB9]">
          <li>Home</li>
          <li>How it Works</li>
          <li>Partner</li>
          <li>Features</li>
          <li>Team</li>
        </ul>
      </div>
      <button className=" shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] px-[18px] py-[12px] border-[1px] border-solid border-[#A48AFB] bg-[#6941C6] rounded-[8px] text-[#ffffff] text-[16px] font-semibold leading-[24px]">
        Launch Dapp
      </button>
    </div>
  );
};

export default NavBar;
