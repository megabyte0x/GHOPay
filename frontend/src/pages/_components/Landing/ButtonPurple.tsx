import React from "react";

const ButtonPurple = ({ text, styl }: any) => {
  return (
    <button
      className={` ${styl} shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border-[1px] border-solid border-[#A48AFB] bg-[#6941C6] rounded-[8px] text-[#ffffff] font-semibold leading-[24px]`}
    >
      {text}
    </button>
  );
};

export default ButtonPurple;
