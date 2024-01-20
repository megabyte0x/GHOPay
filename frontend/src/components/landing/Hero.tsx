import BUTTONS from "@/components/landing/Buttons";
import useAppNavigation from "@/hooks/useAppNavigation";
import Image from "next/image";
import React from "react";

const Hero = () => {
  const { handleLandingOpen } = useAppNavigation();
  return (
    <div
      id="home-section"
      className=" heroBg flex gap-[32px] items-center justify-center max-w-[1280px]
    lg:flex-row flex-col"
    >
      <div className="flex flex-col lg:items-start items-center gap-[48px] lg:text-start text-center">
        <div className="flex flex-col lg:items-start items-center gap-[24px]">
          <h1
            className="heroTextGrad font-semibold  tracking-[-1.2px]
          md:text-[60px] md:leading-[72px]
          text-[36px] leading-[44px]"
          >
            Unlock Exciting Rewards with GHO Payments
          </h1>
          <h6
            className=" text-[#DBD2EF] max-w-[480px]
          md:text-[20px] md:leading-[30px]
          text-[18px] leading-[28px]"
          >
            Discover a world where every transaction with GHO Stablecoin brings
            you rewarding experiences and exclusive perks.
          </h6>
        </div>
        <BUTTONS.PURPLE
          text="Get Started"
          style="px-[20px] py-[12px] text-[18px]"
          onClick={handleLandingOpen}
        />
      </div>
      <div>
        <Image
          src={"/heroShowcase.svg"}
          height={600}
          width={600}
          alt="hero-3d"
        />
      </div>
    </div>
  );
};

export default Hero;
