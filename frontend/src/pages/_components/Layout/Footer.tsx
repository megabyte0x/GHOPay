import Image from "next/image";
import React from "react";
import { ButtonPurple } from "..";
import { usePathname } from "next/navigation";

const Footer = () => {
  const currentPage = usePathname();

  return (
    <div className="border-t-[1px] border-[#dbd2ef36] pt-[32px] gap-[56px] flex flex-col bg-[#14141B]">
      {currentPage == "/" && (
        <div className="flex md:flex-row flex-col md:gap-0 gap-12 pt-[32px] w-[100vw] justify-between px-20">
          <div className="flex flex-col gap-[32px] self-start max-w-[390px]">
            <div className="flex gap-[8px] ">
              <Image src={"/logo.svg"} height={32} width={32} alt="logo" />
              <h3 className="text-[20px] font-semibold leading-[24px] text-[#ffffff]">
                GHOPay
              </h3>
            </div>
            <p className="text-[16px] text-[#DBD2EF] leading-[24px] opacity-80">
              Discover a world where every transaction with GHO Stablecoin
              brings you rewarding experiences and exclusive perks.
            </p>
            <div className="flex text-[16px] text-[#94969C] leading-[24px] font-semibold gap-[32px]">
              <h4>Terms</h4>
              <h4>Privacy</h4>
            </div>
          </div>
          <ButtonPurple
            text="Launch Dapp"
            styl="text-[16px] px-[18px] py-[12px]"
          />
        </div>
      )}
      <div className="flex justify-between px-20 w-[100vw] pb-[32px]">
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
