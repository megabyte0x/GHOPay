import Image from "next/image";
import React from "react";

const TempSwap = () => {
  return (
    <div
      className="pt-[32px] px-[24px] pb-[24px] rounded-[12px]
  bg-[#1B0F31] border-[1px] border-solid border-[#5720B7]"
    >
      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-col gap-[6px] text-start">
          <label htmlFor="" className="text-[14px] leading-[20px] font-medium">
            From
          </label>
          <div className="flex p-[10px]">
            <select>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
            <input type="text" placeholder="Enter an amount" />
          </div>
        </div>
        <Image src={"/swapArrows.svg"} alt="swap" height={24} width={24} />
        <div className="flex flex-col gap-[6px] text-start">
          <label htmlFor="" className="text-[14px] leading-[20px] font-medium">
            To
          </label>
          <div className="flex p-[10px]">
            <select>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
            <input type="text" placeholder="Enter an amount" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TempSwap;
