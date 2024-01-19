import Image from "next/image";
import React from "react";

type BookDealModalProps = {
  onClose: () => void;
  onNext: () => void;
  onBack: () => void;
};

const BookDealModal = ({ onClose, onNext, onBack }: BookDealModalProps) => {
  return (
    <div
      className="border-solid border-[#5720b7] border-[1px] rounded-[12px] shadow-[0px_8px_8px_-4px_rgba(16,_24,_40,_0.04),_0px_20px_24px_-4px_rgba(16,_24,_40,_0.1)] bg-[#2e125e] 
p-[24px] flex flex-col gap-[20px] h-fit max-w-[690px] w-full"
    >
      <div className="flex gap-[24px] items-center justify-between w-full">
        <div className="flex items-center justify-start gap-[24px]">
          <div
            className="bg-[#5720b7] border-solid border-[1px] border-[#6927da] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)]
flex items-center justify-center p-[12px] rounded-[10px] h-fit w-fit"
          >
            <Image
              src={"/fingerPrint.svg"}
              height={24}
              width={24}
              alt="Fingerprint"
            />
          </div>
          <h2 className="text-[18px] font-semibold leading-[28px] text-[#dbd2ef]">
            Book a Deal
          </h2>
        </div>
        <Image src={"/g8.svg"} alt="partner-logo" height={48} width={93} />
      </div>
      <div className="flex flex-col gap-[32px] w-full">
        <form className="flex flex-col gap-[16px] text-left">
          <div
            className="rounded-[8px] border-dashed border-[#6927da] border-[1px] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] 
                text-[#A48AFB]
              flex flex-col justify-between gap-[16px] w-full
                  text-[16px] leading-[24px] px-[14px] py-[10px]"
          >
            <div className="flex justify-between">
              <div className="flex gap-2">
                <Image
                  src={"/currency-dollar-circle.svg"}
                  alt="info"
                  width={20}
                  height={20}
                />
                <h3 className="text-left">GHO Points</h3>
              </div>
              <h6 className="pr-[14px] min-w-fit text-right place-self-end">
                $50
              </h6>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <Image src={"/gas.svg"} alt="info" width={20} height={20} />
                <h3 className="text-left">Gas Fees</h3>
              </div>
              <h6 className="pr-[14px] min-w-fit  text-right place-self-end">
                0.00 GWEI
              </h6>
            </div>
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="flex justify-between w-full">
              <h1 className="text-[14px] font-medium leading-[20px] text-[#f5f3ff]">
                Amount You Will Pay
              </h1>

              <h3 className="text-right text-[14px] leading-[20px] text-[#DBD2EFCC]">
                Available GHO: 50.0
              </h3>
            </label>
            <div
              className="rounded-[8px] border-solid border-[#6927da] border-[1px] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] bg-[#491c96] 
                text-[#A48AFB]
              flex justify-between items-center gap-[8px]"
            >
              <input
                type="text"
                placeholder="0.00 GHO"
                className="bg-[#00000000] border-0 w-full
                  text-[16px] leading-[24px] py-[10px] px-[14px]"
              />
            </div>
          </div>
          <div className="border-b-[1px] border-solid border-[#491C96]"></div>
          <div className="flex gap-2">
            <input type="checkbox" className="border-[0px] bg-[#000000]" />
            <label className="text-[14px] leading-[20px] text-medium text-[#C3B5FD]">
              I agree to all the terms and conditions of the booking.
            </label>
          </div>
        </form>
        <div className="grid grid-cols-2 gap-[12px]">
          <button
            onClick={onBack}
            className="font-semibold leading-[24px] text-[#a48afb] text-[16px]
        border-solid border-[1px] rounded-[8px] border-[#a48afb] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] 
        flex flex-row justify-center cursor-pointer px-[18px] py-[10px]
        hover:opacity-60"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onNext();
              setTimeout(() => {
                onClose();
              }, 500);
            }}
            className="font-semibold leading-[24px] text-white text-[16px]
          border-solid border-[1px] rounded-[8px] border-[#a48afb] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] 
          bg-[#6941c6] 
          flex flex-row justify-center cursor-pointer px-[18px] py-[10px]
          hover:opacity-75"
          >
            Book Deal
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDealModal;