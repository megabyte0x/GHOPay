import Image from "next/image";
import React from "react";
import { ButtonPurple } from "..";
import { usePathname } from "next/navigation";
import { ConnectKitButton } from "connectkit";

const NavBar = () => {
  const currentPage = usePathname();

  return (
    <div className="border-b-[1px] border-[#DBD2EF1A] bg-[#14141B] h-[68px] px-20 flex items-center justify-between ">
      <div className="flex gap-[40px]">
        <div className="flex gap-[8px]">
          <Image src={"/logo.svg"} width={32} height={32} alt="logo" />{" "}
          <h1 className="text-[20px] leading-[24px] text-[#DBD2EF] font-semibold">
            GHOPay
          </h1>
        </div>
        {currentPage == "/" && (
          <ul className="flex flex-row gap-[32px] text-[16px] leading-[24px] font-semibold text-[#A69DB9]">
            <li>Home</li>
            <li>How it Works</li>
            <li>Partner</li>
            <li>Features</li>
            <li>Team</li>
          </ul>
        )}
        {currentPage == "/dashboard/home" && (
          <ul className="flex flex-row gap-[32px] text-[16px] leading-[24px] font-semibold text-[#A69DB9]">
            <li>Shop</li>
            <li>Apply As Partner</li>
          </ul>
        )}
      </div>
      {currentPage == "/dashboard/home" && <ConnectKitButton />}
      {currentPage == "/" && (
        <ButtonPurple
          text="Launch Dapp"
          styl="text-[16px] px-[18px] py-[12px]"
        />
      )}
    </div>
  );
};

export default NavBar;
