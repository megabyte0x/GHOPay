import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="border-t-[1px] border-[#dbd2ef36] pt-[64px] pb-[48px] gap-[56px] flex flex-col">
      <div className="flex w-[100vw] justify-between px-20">
        <div className="flex flex-col gap-[32px] self-start max-w-[390px]">
          <div className="flex gap-[8px] ">
            <Image src={"/logo.svg"} height={32} width={32} alt="logo" />
            <h3 className="text-[20px] font-semibold leading-[24px] text-[#ffffff]">
              GHOPay
            </h3>
          </div>
          <p className="text-[16px] text-[#DBD2EF] leading-[24px] opacity-80">
            Discover a world where every transaction with GHO Stablecoin brings
            you rewarding experiences and exclusive perks.
          </p>
          <div className="flex text-[16px] text-[#94969C] leading-[24px] font-semibold gap-[32px]">
            <h4>Terms</h4>
            <h4>Privacy</h4>
          </div>
        </div>
        <button className=" place-self-start shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] px-[18px] py-[12px] border-[1px] border-solid border-[#A48AFB] bg-[#6941C6] rounded-[8px] text-[#ffffff] text-[16px] font-semibold leading-[24px]">
          Launch Dapp
        </button>
      </div>
      <div className="flex justify-between px-20 w-[100vw]">
        <div className="text-[16px] text-[#DBD2EF] leading-[24px] opacity-60">
          &copy; 2024 GHOPay. All Rights Reserved.
        </div>
        <div className="flex gap-[24px]">
          <Image src={"/xIcon.svg"} width={24} height={24} alt="twitter" />
          <Image src={"/githubIcon.svg"} width={24} height={24} alt="github" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
