import { BasicHeadings } from "@/components";
import Image from "next/image";
import React from "react";

const HowItWorks = () => {
  return (
    <div
      id="how-section"
      className="py-[96px] flex flex-col gap-[64px] items-center"
    >
      <BasicHeadings
        subH1="How it Works"
        mainH="GHOPay: Your Passport to Rewarding Transactions"
        subH2="Learn how payments with GHO can earn you incredible rewards."
      />
      <div className="flex md:flex-row flex-col gap-[32px] items-center justify-center">
        <div className="flex gap-[20px] flex-col items-center justify-center text-center">
          <Image
            src={"/credit-card-icon.svg"}
            height={48}
            width={48}
            alt="credit-card"
            className="bg-[#393149] p-[12px] rounded-[10px]"
          />
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-[#F5F5F6] text-[20px] leading-[30px] font-semibold">
              Pay with GHO Stablecoin
            </h2>
            <h5 className="text-[#94969C] text-[16px] leading-[24px]">
              Make everyday transactions. Every payment brings you closer to
              fantastic rewards.
            </h5>
          </div>
        </div>
        <Image
          src={"/arrow-right.svg"}
          height={32}
          width={32}
          alt="arrow"
          className="md:rotate-0 rotate-90"
        />
        <div className="flex gap-[20px] flex-col items-center justify-center text-center">
          <Image
            src={"/rewardIcon.svg"}
            height={48}
            width={48}
            alt="credit-card"
            className="bg-[#393149] p-[12px] rounded-[10px]"
          />
          <div className="flex flex-col items-center justify-center ">
            <h2 className="text-[#F5F5F6] text-[20px] leading-[30px] font-semibold">
              Get rewards points
            </h2>
            <h5 className="text-[#94969C] text-[16px] leading-[24px]">
              For every payment, reward points are added to your balance
              seamlessly.
            </h5>
          </div>
        </div>
        <Image
          src={"/arrow-right.svg"}
          height={32}
          width={32}
          alt="arrow"
          className="md:rotate-0 rotate-90"
        />
        <div className="flex gap-[20px] flex-col items-center justify-center text-center">
          <Image
            src={"/ticketIcon.svg"}
            height={48}
            width={48}
            alt="credit-card"
            className="bg-[#393149] p-[12px] rounded-[10px]"
          />
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-[#F5F5F6] text-[20px] leading-[30px] font-semibold">
              Exclusive benefits
            </h2>
            <h5 className="text-[#94969C] text-[16px] leading-[24px]">
              Accumulate Reward Points to get discounts, exclusive privileges
              and much more!
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
