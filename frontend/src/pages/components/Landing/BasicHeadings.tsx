import React from "react";

const BasicHeadings = ({ subH1, mainH, subH2 }: any) => {
  return (
    <div className="text-center text-[#DBD2EF]">
      <h6 className=" text-[16px] font-semibold leading-[24px] opacity-60">
        {subH1}
      </h6>
      <h1 className=" text-[36px] leading-[44px] font-semibold tracking-[-0.72px] pt-[12px] pb-[20px]">
        {mainH}
      </h1>
      {subH2 && (
        <h4 className="text-[20px] leading-[30px] opacity-60">{subH2}</h4>
      )}
    </div>
  );
};

export default BasicHeadings;
