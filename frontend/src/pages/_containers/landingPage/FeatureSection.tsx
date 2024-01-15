import Image from "next/image";
import React from "react";

const FeatureSection = () => {
  return (
    <div className="py-[96px] flex flex-col gap-[64px] items-center justify-center">
      <div className="text-center flex flex-col items-center justify-center gap-[12px]">
        <h6 className="text-[16px] font-semibold text-[#DBD2EF] leading-[24px]">
          Features
        </h6>
        <h1 className="text-[#DBD2EF] text-[36px] font-semibold leading-[44px] tracking-[-0.72px]">
          Elevate Your Rewards Experience with GHO Payments
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-[24px]">
        <div className="p-[32px] bg-[#393149] rounded-[6px] flex flex-col gap-[24px] items-center justify-center min-w-[280px]">
          <Image src={"/feat1.png"} height={200} width={350} alt="feature" />
          <div className="text-start text-[#DBD2EF]">
            <h3 className="text-[20px] font-semibold leading-[30px]">
              Diverse Voucher Selection
            </h3>
            <h6 className="text-[16px] leading-[24px] opacity-80">
              Explore a wide range of vouchers tailored to your preferences.
            </h6>
          </div>
        </div>
        <div className="p-[32px] bg-[#393149] rounded-[6px] flex flex-col gap-[24px] items-center justify-center min-w-[280px]">
          <Image src={"/feat2.svg"} height={200} width={350} alt="feature" />
          <div className="text-start text-[#DBD2EF]">
            <h3 className="text-[20px] font-semibold leading-[30px]">
              Exclusive Limited-Time Offers
            </h3>
            <h6 className="text-[16px] leading-[24px] opacity-80">
              GHOPay brings you exclusive deals and promotions before anyone
              else.
            </h6>
          </div>
        </div>
        <div className="p-[32px] bg-[#393149] rounded-[6px] flex flex-col gap-[24px] items-center justify-center min-w-[280px]">
          <Image src={"/feat3.svg"} height={200} width={350} alt="feature" />
          <div className="text-start text-[#DBD2EF]">
            <h3 className="text-[20px] font-semibold leading-[30px]">
              Personalized Recommendations
            </h3>
            <h6 className="text-[16px] leading-[24px] opacity-80">
              Receive tailored recommendations based on your preferences and
              payments.
            </h6>
          </div>
        </div>
      </div>
      <button className="shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] px-[20px] py-[12px] border-[1px] border-solid border-[#A48AFB] bg-[#6941C6] rounded-[8px] text-[#ffffff] text-[18px] font-semibold leading-[28px]">
        Get Started
      </button>
    </div>
  );
};

export default FeatureSection;
