import React from "react";

type ButtonProps = {
  text: string;
  style: string;
  onClick: () => void;
};

const Purple = ({ text, style, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={` ${style} shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border-[1px] border-solid border-[#A48AFB] bg-[#6941C6] rounded-[8px] 
      text-[#ffffff] font-semibold leading-[24px]
      hover:opacity-85`}
    >
      {text}
    </button>
  );
};

const BUTTONS = {
  PURPLE: Purple,
};

export default BUTTONS;
