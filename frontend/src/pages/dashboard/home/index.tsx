import { ButtonPurple } from "@/pages/_components";
import Image from "next/image";
import React from "react";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-[12px] w-[100vw] h-[fit] items-center px-[112px] pt-[30px] pb-[112px]">
      <div
        className="border-solid border-b-[1px] border-[#FFFFFF1A] 
      flex gap-[24px] items-center justify-start w-full pb-[24px]"
      >
        <div className="text-6xl leading-[64px] mt-2">👋</div>
        {/* <Image src={"/hiHand.svg"} height={64} width={64} alt="hi" /> */}
        <div className="flex flex-col gap-[10px] text-start">
          <h1 className="text-[30px] font-semibold leading-[38px] text-[#dbd2ef]">
            Hey, there
          </h1>
          <h3 className="text-[20px] leading-[30px] text-[#98a2b3]">
            Welcome to GHOPay.
          </h3>
        </div>
      </div>
      <div className="flex flex-col gap-[24px] items-center justify-center text-center">
        <Image
          src={"/createVault.svg"}
          height={260}
          width={470}
          alt="createVault"
        />
        <div className="flex flex-col gap-[24px] items-center justify-center">
          <div className="flex flex-col gap-[8px] items-center justify-center">
            <h2 className="font-semibold text-[16px] leading-[24px] text-[#f5f5f6]">
              Create your First Vault
            </h2>
            <h4 className="text-[14px] leading-[22px] text-[#DBD2EFCC]">
              Vaults are your gateway to receive payments, earn rewards and
              incentivize people.
            </h4>
          </div>
          <ButtonPurple
            text="Create a Vault"
            styl="px-[16px] py-[10px] text-[16px]"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;