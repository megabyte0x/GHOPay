import React from "react";

type HeadingProps = {
  subH1: string;
  mainH: string;
  subH2?: string;
};

const BasicHeadings = ({ subH1, mainH, subH2 }: HeadingProps) => {
  return (
    <div className="text-center text-[#DBD2EF]">
      <h6 className=" text-[16px] font-semibold leading-[24px] opacity-60">
        {subH1}
      </h6>
      <h1
        className=" md:text-[36px] md:leading-[44px] 
      text-[30px] leading-[38px]
      font-semibold tracking-[-0.72px] pt-[12px] pb-[20px]"
      >
        {mainH}
      </h1>
      {subH2 && (
        <h4
          className="md:text-[20px] md:leading-[30px] 
        text-[16px] leading-[24px]
        opacity-60"
        >
          {subH2}
        </h4>
      )}
    </div>
  );
};

export default BasicHeadings;
