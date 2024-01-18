import React from "react";
import { useAccount, useChainId } from "wagmi";
import { ethers } from "ethers";
import { EthersAdapter } from "@safe-global/protocol-kit";
import { CHAINS } from "@/constants";

const Safe = () => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  console.log(chainId);
  const handleOnClick = () => {
    if (!Object.keys(CHAINS).includes(chainId.toString()))
      throw "Chain not supported";
    const provider = new ethers.JsonRpcProvider(CHAINS[chainId]);
    const ethAdapter = new EthersAdapter({
      ethers,
    });
  };

  return (
    <button
      className="shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border-[1px] border-solid border-[#A48AFB] bg-[#6941C6] rounded-[8px] 
      text-[#ffffff] font-semibold leading-[24px]
      hover:opacity-85"

      //   onClick={handleOnClick}
    >
      {" "}
      Click to relay transaction
    </button>
  );
};

export default Safe;
