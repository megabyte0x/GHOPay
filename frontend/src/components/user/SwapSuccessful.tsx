import Image from "next/image";
import React from "react";

const rewardPoints = 50;

type SwapSuccessfulModalProps = {
  onClose: () => void;
};

const SwapSuccessful = ({ onClose }: SwapSuccessfulModalProps) => {
  return (
    <div
      className="p-[24px] flex flex-col gap-[39px] min-w-[630px]
    bg-[#2E125E] border-[1px] border-[#5720B7] border-solid rounded-[12px]"
    >
      <Image
        onClick={onClose}
        src={"/x-close.svg"}
        alt="Xclose"
        width={34}
        height={34}
        className=" self-end place-self-end hover:opacity-90 p-[1px] hover:bg-[#5720b7d3] rounded-full"
      />
      <div className="flex flex-col gap-[24px] items-center justify-center">
        <Image alt="tick" src={"/claimtick.svg"} height={54} width={54} />
        <div
          className="text-[15px] leading-[20px] flex-col
        flex gap-[4px] justify-center items-center text-center"
        >
          <h2 className="text-[#F5F3FF] font-medium">Swap Successfull!</h2>
          <h3 className="text-[#DDD6FE]">
            You can view your Balances under{" "}
            <span className="font-semibold">My Balances </span>.{" "}
          </h3>
        </div>
      </div>
      <button
        onClick={onClose}
        className="font-semibold leading-[24px] text-[#a48afb] text-[16px]
        border-solid border-[1px] rounded-[8px] border-[#a48afb] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] 
        flex flex-row justify-center cursor-pointer px-[18px] py-[10px]
        hover:opacity-60 "
      >
        Close
      </button>
    </div>
  );
};

export default SwapSuccessful;
