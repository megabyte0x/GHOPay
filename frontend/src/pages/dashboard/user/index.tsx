import { ButtonPurple } from "@/pages/_components";
import { BookDealModal } from "@/pages/_containers";
import Image from "next/image";
import React from "react";

const userPage = () => {
  return (
    <div className="flex flex-col gap-[24px] px-20 py-[64px]">
      <div className="flex flex-col gap-[4px]">
        <h1 className="text-[30px] font-semibold leading-[38px] text-[#dbd2ef]">
          Shop
        </h1>
        <h3 className="text-[20px] leading-[30px] text-[#98A2B3]">
          Browse exclusive partner deals and more.
        </h3>
      </div>
      <div className="flex flex-col gap-[48px]">
        <div className="border-solid border-b-[1px] border-[#FFFFFF33] flex gap-[20px]  justify-start items-start">
          <button
            className="text-[14px] font-semibold leading-[20px] text-[#dbd2ef] 
        border-solid border-b-2 border-[#dbd2ef] 
        cursor-pointer px-[4x] pb-[12px]"
          >
            Shop
          </button>
          <button
            className="text-[14px] font-semibold leading-[20px] text-[#dbd2ef]
        cursor-pointer px-[4x] pb-[12px]"
          >
            Swap
          </button>
        </div>
        <div className="grid grid-cols-4 gap-[16px]">
          <div
            className="border-solid border-[#5720b7] border-[1px] rounded-[16px] bg-[#1b0f31] 
          flex flex-col items-center justify-center w-fit"
          >
            <Image
              src={"/united.svg"}
              alt="partner"
              height={136}
              width={330}
              className=" rounded-t-[16px]"
            />
            <div className="flex flex-col gap-[16px] px-[24px] pb-[24px] pt-[16px]">
              <h1 className="text-[20px] font-semibold leading-[28px] text-[#c3b5fd]">
                Save up to $150 on Europe Trips
              </h1>
              <div className="flex justify-between">
                <h3
                  className="text-[18px] font-bold leading-[20px] text-[#a48afb] 
                border-dashed border-[#875bf7] border-[1px] rounded-[2px]
                flex flex-row py-[4px] px-[8px]"
                >
                  $50<span className="font-medium"> GHO Points</span>
                </h3>
                <div className="text-right text-[14px] font-semibold leading-[20px] text-[#875bf7]">
                  Ratio
                </div>
              </div>
              <ButtonPurple
                styl="text-[14px] px-[20px] py-[8px]"
                text="View Details and Book"
              />
            </div>
          </div>
          <div
            className="border-solid border-[#5720b7] border-[1px] rounded-[16px] bg-[#1b0f31] 
          flex flex-col items-center justify-center w-fit"
          >
            <Image
              src={"/united.svg"}
              alt="partner"
              height={136}
              width={330}
              className=" rounded-t-[16px]"
            />
            <div className="flex flex-col gap-[16px] px-[24px] pb-[24px] pt-[16px]">
              <h1 className="text-[20px] font-semibold leading-[28px] text-[#c3b5fd]">
                Save up to $150 on Europe Trips
              </h1>
              <div className="flex justify-between">
                <h3
                  className="text-[18px] font-bold leading-[20px] text-[#a48afb] 
                border-dashed border-[#875bf7] border-[1px] rounded-[2px]
                flex flex-row py-[4px] px-[8px]"
                >
                  $50<span className="font-medium"> GHO Points</span>
                </h3>
                <div className="text-right text-[14px] font-semibold leading-[20px] text-[#875bf7]">
                  Ratio
                </div>
              </div>
              <ButtonPurple
                styl="text-[14px] px-[20px] py-[8px]"
                text="View Details and Book"
              />
            </div>
          </div>
        </div>
      </div>
      {/* <BookDealModal /> */}
    </div>
  );
};

export default userPage;
