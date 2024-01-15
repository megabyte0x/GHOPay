import React from "react";

const Partnered = () => {
  return (
    <div className="py-[96px] flex gap-[64px] flex-col text-center">
      <div className="text-center flex flex-col items-center justify-center gap-[12px]">
        <h6 className="text-[16px] font-semibold text-[#DBD2EF] leading-[24px] opacity-60">
          Exclusive Partnerships, Exclusive Rewards
        </h6>
        <h1 className="text-[#DBD2EF] text-[36px] font-semibold leading-[44px] tracking-[-0.72px]">
          Partnered Brands{" "}
        </h1>
      </div>
      <div>BRANDS HERE</div>
      <div className="flex flex-col gap-[24px] items-center justify-center">
        <h6 className="text-[16px] font-semibold text-[#DBD2EF] leading-[24px] opacity-60">
          Interested in partnering with us?{" "}
        </h6>
        <button className="px-[20px] py-[12px] w-fit border-[1px] border-[#A48AFB] rounded-[8px] text-[18px] font-semibold leading-[28px] text-[#DDD6FE]">
          Integrate with GHOPay
        </button>
      </div>
    </div>
  );
};

export default Partnered;
