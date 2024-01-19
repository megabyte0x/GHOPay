import BUTTONS from "@/components/landing/Buttons";
import Image from "next/image";

export const Swap = () => {
  return (
    <div
      className="pt-[32px] px-[24px] pb-[24px] rounded-[12px]
bg-[#1B0F31] border-[1px] border-solid border-[#5720B7]
max-w-[480px]"
    >
      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-col gap-[6px] text-start">
          <label
            htmlFor=""
            className="text-[14px] leading-[20px] font-medium text-[#F5F3FF]"
          >
            From
          </label>
          <div
            className="flex pl-[10px]  gap-[12px]
          border-[1px] rounded-[8px] border-[#6927DA] bg-[#2E125E]
          text-[16px] leading-[24px]"
          >
            <div className="py-[10px] min-w-fit">
              <div className="flex gap-[4px] px-[8px] py-[4px] rounded-[6px] bg-[#491C96] min-w-fit">
                <h3 className="text-[#C3B5FD] min-w-fit">GHO Points</h3>
                <Image
                  src={"/downArrow.svg"}
                  height={20}
                  width={20}
                  alt="dropdown"
                />
              </div>
              {/* <ol
                className="px-[10px] py-[8px] flex flex-col gap-[12px] 
              border-[1px] border-solid bg-[#491d97] border-[#DBD2EF] rounded-[6px]
              text-[14px] text-[#DBD2EF] font-medium leading-[20px]"
              >
                <li>GHO Points</li>
                <li>Option</li>
                <li>Optiom</li>
              </ol> */}
            </div>

            <input
              type="text"
              placeholder="Enter an amount"
              className="bg-[#00000000] text-[#A48AFB] py-[10px] w-full"
            />
          </div>
        </div>
        <Image
          src={"/swapArrows.svg"}
          alt="swap"
          height={24}
          width={24}
          className="self-center"
        />
        <div className="flex flex-col gap-[6px] text-start">
          <label
            htmlFor=""
            className="text-[14px] leading-[20px] font-medium text-[#F5F3FF]"
          >
            To
          </label>
          <div
            className="flex pl-[10px]  gap-[12px]
          border-[1px] rounded-[8px] border-[#6927DA] bg-[#2E125E]
          text-[16px] leading-[24px]"
          >
            <div className="py-[10px] min-w-fit">
              <div className="flex gap-[4px] px-[8px] py-[4px] rounded-[6px] bg-[#491C96] min-w-fit">
                <Image alt="gho" src={"/GHOLogo.svg"} height={15} width={20} />
                <h3 className="text-[#C3B5FD] min-w-fit">GHO</h3>
              </div>
            </div>

            <input
              type="text"
              placeholder="0.00"
              className="bg-[#00000000] text-[#A48AFB] py-[10px] w-full"
            />
          </div>
        </div>
        <div
          className="px-[14px] py-[10px] bg-[#1a0f2f]
        border-[#6927DA] border-[1px] border-solid rounded-[8px]
        flex flex-col gap-[16px]"
        >
          <div className="flex justify-between text-[16px] leading-[24px]">
            <div className="flex gap-2">
              <Image
                src={"/currency-dollar-circle.svg"}
                alt="info"
                width={20}
                height={20}
              />
              <h3 className="text-left text-[#A48AFB]">Price</h3>
            </div>
            <h6 className="pr-[14px] min-w-fit text-right place-self-end text-[#C3B5FD]">
              1 GHO = $0.98 USD
            </h6>
          </div>
          <div className="flex justify-between text-[16px] leading-[24px]">
            <div className="flex gap-2">
              <Image src={"/upload.svg"} alt="info" width={20} height={20} />
              <h3 className="text-left text-[#A48AFB]">Minimum Recieved</h3>
            </div>
            <h6 className="pr-[14px] min-w-fit text-right place-self-end text-[#C3B5FD]">
              $0.00 USD
            </h6>
          </div>
          <div className="flex justify-between text-[16px] leading-[24px]">
            <div className="flex gap-2">
              <Image src={"/gas.svg"} alt="info" width={20} height={20} />
              <h3 className="text-left text-[#A48AFB]">Gas Fees</h3>
            </div>
            <h6 className="pr-[14px] min-w-fit text-right place-self-end text-[#C3B5FD]">
              0.00 GWEI
            </h6>
          </div>
          <h3 className="text-[14px] leading-[20px] text-[#DBD2EFCC]">
            End price is an estimate. You will receive at least 0.00 GHO ($0.00
            USD), or the transaction will be refunded.
          </h3>
        </div>
      </div>
      {/* <BUTTONS
        text="Swap"
        style="px-[18px] py-[10px] text-[16px]"
        onClick={() => {
          console.log("clicked swap");
        }}
      /> */}
    </div>
  );
};

export default Swap;
