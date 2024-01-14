import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className=" heroBg flex gap-[32px] items-center justify-center px-[32px] max-w-[1280px]">
      <div className="flex flex-col items-start gap-[48px]">
        <div className="flex flex-col items-start gap-[24px]">
          <h1 className="heroTextGrad text-[60px] font-semibold leading-[72px] tracking-[-1.2px]">
            Unlock Exciting Rewards with GHO Payments
          </h1>
          <h6 className="text-[20px] leading-[30px] text-[#DBD2EF] max-w-[480px]">
            Discover a world where every transaction with GHO Stablecoin brings
            you rewarding experiences and exclusive perks.
          </h6>
        </div>
        <button className="shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] px-[20px] py-[12px] border-[1px] border-solid border-[#A48AFB] bg-[#6941C6] rounded-[8px] text-[#ffffff] text-[18px] font-semibold leading-[28px]">
          Launch Dapp
        </button>
      </div>
      <div>
        <Image
          src={"/heroShowcase.svg"}
          height={900}
          width={900}
          alt="hero-3d"
        />
      </div>
    </div>
  );
};

export default Hero;
