"use client";
import Image from "next/image";
import BUTTONS from "../landing/Buttons";
import { useEffect, useState } from "react";
import { useBalance } from "wagmi";

const minRecieved = 0;
const currentExchangeRate = 0;
const gasFee = 0;
const minGHORecieve = 0;
const usdOfMinGHORecieved = 0;

export const Swap = () => {
  const availableTokens = ["gho", "uni"];
  const [tokenSelectionVisibility, setTokenSelectionVisibility] =
    useState(false);

  const { data, error, isLoading } = useBalance({ watch: true });

  const [fromToken, setFromToken] = useState("Select a token");
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);

  useEffect(() => {
    console.log({ data, error, isLoading });
  }, [isLoading, data, error]);

  const handleFromTokenSelect = (e: React.MouseEvent<HTMLLIElement>) => {
    const tokenName = e.currentTarget.textContent;
    if (!tokenName) return;

    setFromToken(tokenName);
  };
  const handleFromAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromAmount(parseFloat(e.target.value));
  };
  const handleToAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToAmount(parseFloat(e.target.value));
  };
  const handleSwap = () => {};
  return (
    <div
      className="pt-[32px] px-[24px] pb-[24px] rounded-[12px]
bg-[#1B0F31] border-[1px] border-solid border-[#5720B7]
max-w-[480px] flex flex-col items-center justify-center gap-[32px]"
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
            <div className="py-[10px] min-w-fit flex flex-col">
              <div
                onMouseEnter={() => {
                  setTokenSelectionVisibility(true);
                }}
                onMouseLeave={() => {
                  setTokenSelectionVisibility(false);
                }}
                className="cursor-pointer flex gap-[4px] px-[8px] py-[4px] rounded-[6px] bg-[#491C96] min-w-fit"
              >
                <h3 className="text-[#C3B5FD] min-w-fit">{fromToken}</h3>
                <Image
                  src={"/downArrow.svg"}
                  height={20}
                  width={20}
                  alt="dropdown"
                />
                {tokenSelectionVisibility && (
                  <ol
                    className="fixed mt-[27px] justify-right

                   flex flex-col 
              border-[1px] border-solid bg-[#491d97] border-[#bbafd5] rounded-[6px]
              text-[14px] text-[#DBD2EF] font-medium leading-[20px]"
                  >
                    {availableTokens.map((tokenName) => {
                      return (
                        <li
                          key={Math.random()}
                          onClick={handleFromTokenSelect}
                          className="hover:bg-[#3e2072] px-[10px] py-[8px]"
                        >
                          {tokenName}
                        </li>
                      );
                    })}
                  </ol>
                )}
              </div>
            </div>

            <input
              onChange={handleFromAmount}
              type="number"
              placeholder="Enter an amount"
              className="bg-[#00000000] text-[#A48AFB] py-[10px] w-full pl-4"
            />
          </div>
        </div>
        <Image
          src={"/swapArrows.svg"}
          alt="swap"
          height={24}
          width={24}
          className="self-center mb-[-21px]"
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
              onChange={handleToAmount}
              type="number"
              placeholder="0.00"
              className="bg-[#00000000] text-[#A48AFB] py-[10px] w-full pl-4"
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
              1 GHO = ${currentExchangeRate} USD
            </h6>
          </div>
          <div className="flex justify-between text-[16px] leading-[24px]">
            <div className="flex gap-2">
              <Image src={"/upload.svg"} alt="info" width={20} height={20} />
              <h3 className="text-left text-[#A48AFB]">Minimum Recieved</h3>
            </div>
            <h6 className="pr-[14px] min-w-fit text-right place-self-end text-[#C3B5FD]">
              ${minRecieved} USD
            </h6>
          </div>
          <div className="flex justify-between text-[16px] leading-[24px]">
            <div className="flex gap-2">
              <Image src={"/gas.svg"} alt="info" width={20} height={20} />
              <h3 className="text-left text-[#A48AFB]">Gas Fees</h3>
            </div>
            <h6 className="pr-[14px] min-w-fit text-right place-self-end text-[#C3B5FD]">
              {gasFee} GWEI
            </h6>
          </div>
          <h3 className="text-[14px] leading-[20px] text-[#DBD2EFCC]">
            End price is an estimate. You will receive at least {minGHORecieve}{" "}
            GHO ${usdOfMinGHORecieved} USD, or the transaction will be refunded.
          </h3>
        </div>
      </div>
      <BUTTONS.PURPLE
        text="Swap"
        style="px-[18px] py-[10px] text-[16px] w-full"
        onClick={handleSwap}
      />
    </div>
  );
};

export default Swap;
