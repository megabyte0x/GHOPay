import Image from "next/image";
import BUTTONS from "../landing/Buttons";
import { PartnerInfo } from "@/types";

type Props = {
  partnerInfo: PartnerInfo;
  onBookingHandle: (partner: PartnerInfo) => void;
};

const ratio = {
  ratio1: 1,
  ratio2: 2,
};

const BookingTile = ({ onBookingHandle, partnerInfo }: Props) => {
  return (
    <div
      className="border-solid border-[#5720b7] border-[1px] rounded-[16px] bg-[#1b0f31] 
          flex flex-col items-center justify-center w-fit"
    >
      <Image
        src={
          partnerInfo.name.toLowerCase().includes("airlines")
            ? "/united.svg"
            : "/hilton.svg"
        }
        alt="partner"
        height={136}
        width={330}
        className=" rounded-t-[16px]"
      />
      <div className="flex flex-col gap-[16px] px-[24px] pb-[24px] pt-[16px]">
        <h1 className="text-[20px] font-semibold leading-[28px] text-[#c3b5fd]">
          {partnerInfo.name.toLowerCase().includes("airlines")
            ? "Get discounts up to 20% on your upcoming travel!"
            : "Get discounts up to 20% on your upcoming stay!"}
        </h1>
        <div className="flex justify-between items-center">
          <h3
            className="text-[18px] font-bold leading-[20px] text-[#a48afb] 
                border-dashed border-[#875bf7] border-[1px] rounded-[2px]
                flex flex-row py-[4px] px-[8px]"
          >
            {ratio.ratio1} {partnerInfo.symbol} : {ratio.ratio2} GP
          </h3>
        </div>
        <BUTTONS.PURPLE
          style="text-[14px] px-[20px] py-[8px]"
          text="View Details and Book"
          onClick={() => {
            onBookingHandle(partnerInfo);
          }}
        />
      </div>
    </div>
  );
};

export default BookingTile;
