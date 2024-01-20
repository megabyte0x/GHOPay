import { PARTNERS } from "@/constants";
import { BasicHeadings } from "@/components";
import Image from "next/image";
import React from "react";

const Partnered = () => {
  return (
    <div
      id="partner-section"
      className="py-[96px] flex gap-[64px] flex-col text-center bg-[#1B171F] w-[100vw]"
    >
      <BasicHeadings
        subH1="Exclusive Partnerships, Exclusive Rewards"
        mainH="Partnered Brands"
      />
      <div className="overflow-hidden">
        <div className="w-full inline-flex flex-nowrap">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
            {PARTNERS.map((partner, index) => (
              <li key={index} className="flex-none">
                <Image
                  className="w-100"
                  src={partner.img}
                  alt="logo"
                  width={150}
                  height={150}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-[24px] items-center justify-center">
        <h6 className="text-[16px] font-semibold text-[#7a797b] leading-[24px] opacity-60">
          Interested in partnering with us?
        </h6>
        <button className="px-[20px] py-[12px] w-fit border-[1px] border-[#A48AFB] rounded-[8px] text-[18px] font-semibold leading-[28px] text-[#DDD6FE]">
          Integrate with GHOPay
        </button>
      </div>
    </div>
  );
};

export default Partnered;
