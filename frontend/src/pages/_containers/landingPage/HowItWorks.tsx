import Image from "next/image";
import React from "react";

const HowItWorks = () => {
  return (
    <div className="py-[96px] flex flex-col gap-[64px] items-center">
      <div className="text-center">
        <h6 className="text-[#dbd2efa5] text-[16px] font-semibold leading-[24px]">
          How it Works
        </h6>
        <h1 className="text-[#DBD2EF] text-[36px] leading-[44px] font-semibold tracking-[-0.72px] pt-[12px] pb-[20px]">
          GHOPay: Your Passport to Rewarding Transactions
        </h1>
        <h4 className="text-[20px] leading-[30px] text-[#dbd2efa5]">
          Learn how payments with GHO can earn you incredible rewards.
        </h4>
      </div>
      <div className="flex gap-[32px]">
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
        <Image src={"/arrow-right.svg"} height={32} width={32} alt="arrow" />
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
        <Image src={"/arrow-right.svg"} height={32} width={32} alt="arrow" />
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
