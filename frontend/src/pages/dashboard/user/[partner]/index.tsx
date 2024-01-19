import Image from "next/image";
import React from "react";

const PartnerStore = ({ params }: any) => {
  // console.log(params.partner);
  const handleBookNow = () => {};
  return (
    <div className="w-full px-20 py-[64px] flex flex-col gap-[48px]">
      <div className="flex gap-[24px]">
        <Image
          src={"/unitedSq.svg"}
          height={64}
          width={64}
          alt="partner-logo"
        />
        <div className="flex flex-col gap-1 text-start">
          <h1 className="text-[30px] font-semibold leading-[38px] text-[#f5f5f6]">
            United Airlines
          </h1>
          <div className="text-[16px] leading-[24px] text-[#98a2b3]">
            Changing the way you travel
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-[24px]">
        <div
          className="flex  w-full justify-between pb-[20px]
        border-b-[1px] border-[#1F242F] border-solid "
        >
          <div className="flex flex-col gap-[4px] self-start">
            <h2 className="text-[24px] font-semibold leading-[32px] text-[#c3b5fd]">
              Save up to $150 on Europe Trips
            </h2>
            <h3 className="text-[14px] leading-[20px] text-[#875bf7]">
              Find the details of this deal below.
            </h3>
          </div>
          <div className="flex gap-[16px] items-center">
            <h4 className=" text-[14px] font-semibold leading-[20px] text-[#875bf7]">
              Ratio
            </h4>
            <div
              className="text-[18px] font-bold leading-[20px] text-[#a48afb] 
            border-dashed border-[#875bf7] border-[1px]
            px-[10px] py-[8px] w-[fit]"
            >
              $50<span className="font-medium"> GHO Points</span>
            </div>
            <button
              onClick={handleBookNow}
              className="text-[14px] font-semibold leading-[20px] text-white 
              border-solid border-[1px] rounded-[8px] border-[#a48afb] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] bg-[#6941c6] 
              flex items-center justify-center cursor-pointer px-[20px] py-[8px] "
            >
              Book Now
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-[64px]">
          <div
            className="text-[16px] leading-[24px] text-[#98A2B3] text-justify 
          flex flex-col gap-3"
          >
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              dignissim felis volutpat dignissim semper. Mauris at leo maximus,
              auctor ex nec, maximus ipsum. Fusce faucibus massa et dui egestas
              condimentum. Nulla volutpat malesuada congue. Curabitur vel quam
              neque. Nunc interdum porta sapien, ac vehicula nulla. Quisque
              luctus, metus pulvinar sodales maximus, ante dui rutrum mauris, et
              facilisis lorem neque in quam. Donec non bibendum felis. Aenean at
              tempus eros.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              dignissim felis volutpat dignissim semper. Mauris at leo maximus,
              auctor ex nec, maximus ipsum. Fusce faucibus massa et dui egestas
              condimentum. Nulla volutpat malesuada congue. Curabitur vel quam
              neque. Nunc interdum porta sapien, ac vehicula nulla. Quisque
              luctus, metus pulvinar sodales maximus, ante dui rutrum mauris, et
              facilisis lorem neque in quam. Donec non bibendum felis. Aenean at
              tempus eros.
            </p>
          </div>{" "}
          <div
            className="text-[16px] leading-[24px] text-justify
          flex flex-col gap-4"
          >
            <h3 className="text-[#A48AFB]">Terms and Conditions</h3>
            <p className="text-[#98A2B3]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              dignissim felis volutpat dignissim semper. Mauris at leo maximus,
              auctor ex nec, maximus ipsum. Fusce faucibus massa et dui egestas
              condimentum. Nulla volutpat malesuada congue. Curabitur vel quam
              neque. Nunc interdum porta sapien, ac vehicula nulla. Nunc et erat
              interdum, aliquam nunc sodales, placerat purus. Fusce a sem
              luctus, efficitur quam vitae, molestie leo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerStore;
