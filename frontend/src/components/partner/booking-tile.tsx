import Image from "next/image";
import BUTTONS from "../landing/Buttons";

type Props = {
  onBookingHandle: () => void;
};

const BookingTile = ({ onBookingHandle }: Props) => {
  return (
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
        <BUTTONS.PURPLE
          style="text-[14px] px-[20px] py-[8px]"
          text="View Details and Book"
          onClick={onBookingHandle}
        />
      </div>
    </div>
  );
};

export default BookingTile;
