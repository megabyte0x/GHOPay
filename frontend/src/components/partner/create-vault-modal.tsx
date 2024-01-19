"use client";
import Image from "next/image";
import React, { useState } from "react";

type CreateVaultModalProps = {
  onClose: () => void;
  onNext: () => void;
  step: number;
  onBack: () => void;
};

const CreateVaultModal = ({
  onClose,
  onNext,
  step,
  onBack,
}: CreateVaultModalProps) => {
  const [vaultName, setVaultName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [message, setMessage] = useState("");
  const [stakeGHO, setStakeGHO] = useState(0);
  const handleNext = () => {
    if (vaultName && symbol) {
      onNext();
    } else {
      setMessage("Please Fill all fields");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };
  const handleBack = () => {
    onBack();
  };
  const handleCreate = () => {
    if (stakeGHO) {
      onNext();
      setTimeout(() => {
        onClose();
      }, 500);
    } else {
      setMessage("Please Enter GHO to Stake");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };
  const handleBuyGHO = () => {};
  const handleStakeAll = () => {};
  return (
    <>
      {step > 0 && (
        <div className="items-center justify-center bg-[#21212198] backdrop-blur-md fixed inset-0 flex">
          {/* STEP1 */}
          {step == 1 && (
            <div
              className="border-solid border-[#5720b7] border-[1px] rounded-[12px] shadow-[0px_8px_8px_-4px_rgba(16,_24,_40,_0.04),_0px_20px_24px_-4px_rgba(16,_24,_40,_0.1)] bg-[#2e125e] 
p-[24px] flex flex-col gap-[20px] h-fit max-w-[690px] w-full"
            >
              <div className="flex justify-between w-full">
                <div className="flex gap-[24px] items-center justify-center">
                  <div
                    className="bg-[#5720b7] border-solid border-[1px] border-[#6927da] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)]
            flex items-center justify-center p-[12px] rounded-[10px] h-fit w-fit"
                  >
                    <Image
                      src={"/fingerPrint.svg"}
                      height={24}
                      width={24}
                      alt="Fingerprint"
                    />
                  </div>
                  <div className="flex flex-col gap-[4px] justify-start items-start text-start">
                    <h2 className="text-[18px] font-semibold leading-[28px] text-[#dbd2ef]">
                      Create a Vault
                    </h2>
                    <h4 className="text-[14px] leading-[20px] text-[#c3b5fd] border-solid border-[1px] rounded-[4px] border-[#5720b7] flex items-center justify-center px-[8px] py-[4px]">
                      Step 1 of 2
                    </h4>
                  </div>
                </div>
                <Image
                  onClick={onClose}
                  src={"/x-close.svg"}
                  alt="Xclose"
                  width={24}
                  height={24}
                  className=" self-start hover:opacity-90 p-[1px] hover:bg-[#5720b7d3] rounded-full"
                />
              </div>
              <div className="flex flex-col gap-[32px] w-full">
                <form className="flex flex-col gap-[16px] text-left">
                  <div className="flex flex-col gap-[6px]">
                    <label className="text-[14px] font-medium leading-[20px] text-[#f5f3ff]">
                      Name of Vault*
                    </label>
                    <div
                      className="rounded-[8px] border-solid border-[#6927da] border-[1px] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] bg-[#491c96] 
                text-[#A48AFB]
              flex justify-between items-center gap-[8px]"
                    >
                      <input
                        maxLength={30}
                        onChange={(e) => {
                          setVaultName(e.target.value);
                        }}
                        type="text"
                        placeholder="Enter a Name for your Vault"
                        className="bg-[#00000000] border-0 w-full
                  text-[16px] leading-[24px] py-[10px] pl-[14px]"
                      />
                      <h6 className="pr-[14px]">{vaultName.length}/30</h6>
                    </div>
                    <h3 className="text-[12px] leading-[20px] text-[#DBD2EFCC]">
                      This cannot be changed later.
                    </h3>
                  </div>
                  <div className="flex flex-col gap-[6px]">
                    <label className="text-[14px] font-medium leading-[20px] text-[#f5f3ff]">
                      Symbol for Reward Point*
                    </label>
                    <div
                      className="rounded-[8px] border-solid border-[#6927da] border-[1px] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] bg-[#491c96] 
                text-[#A48AFB]
              flex justify-between items-center gap-[8px]"
                    >
                      <input
                        onChange={(e) => {
                          setSymbol(e.target.value);
                        }}
                        maxLength={4}
                        type="text"
                        placeholder="Enter a 4 letter Symbol name for your vault e.g. GHOV, SHAR"
                        className="bg-[#00000000] border-0 w-full
                  text-[16px] leading-[24px] py-[10px] pl-[14px]"
                      />
                      <h6 className="pr-[14px]">{symbol.length}/4</h6>
                    </div>
                    <h3 className="text-[12px] leading-[20px] text-[#DBD2EFCC]">
                      This cannot be changed later.
                    </h3>
                  </div>
                  <div className="flex flex-col gap-[6px]">
                    <label className="text-[14px] font-medium leading-[20px] text-[#f5f3ff]">
                      Ratio*
                    </label>
                    <div
                      className="rounded-[8px] border-solid border-[#6927da] border-[1px] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] bg-[#491c96] 
                text-[#A48AFB]
              flex justify-between items-center gap-[8px]"
                    >
                      <input
                        type="text"
                        placeholder="Enter a ratio"
                        className="bg-[#00000000] border-0 w-full
                  text-[16px] leading-[24px] py-[10px] px-[14px]"
                      />
                    </div>
                    <h3 className="text-[12px] leading-[20px] text-[#DBD2EFCC]">
                      Conversion ratio from Reward Points to GHO.
                    </h3>
                  </div>
                </form>
                <div className="flex flex-col">
                  <div className="grid grid-cols-2 gap-[12px]">
                    <button
                      onClick={onBack}
                      className="font-semibold leading-[24px] text-[#a48afb] text-[16px]
        border-solid border-[1px] rounded-[8px] border-[#a48afb] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] 
        flex flex-row justify-center cursor-pointer px-[18px] py-[10px]
        hover:opacity-60 "
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleNext}
                      className="font-semibold leading-[24px] text-white text-[16px]
          border-solid border-[1px] rounded-[8px] border-[#a48afb] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] 
          bg-[#6941c6] 
          flex flex-row justify-center cursor-pointer px-[18px] py-[10px]
          hover:opacity-60"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* STEP2 */}
          {step == 2 && (
            <div
              className="border-solid border-[#5720b7] border-[1px] rounded-[12px] shadow-[0px_8px_8px_-4px_rgba(16,_24,_40,_0.04),_0px_20px_24px_-4px_rgba(16,_24,_40,_0.1)] bg-[#2e125e] 
p-[24px] flex flex-col gap-[20px] h-fit max-w-[690px] w-full"
            >
              <div className="flex justify-between w-full">
                <div className="flex gap-[24px] items-center justify-center">
                  <div
                    className="bg-[#5720b7] border-solid border-[1px] border-[#6927da] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)]
            flex items-center justify-center p-[12px] rounded-[10px] h-fit w-fit"
                  >
                    <Image
                      src={"/fingerPrint.svg"}
                      height={24}
                      width={24}
                      alt="Fingerprint"
                    />
                  </div>
                  <div className="flex flex-col gap-[4px] justify-start items-start text-start">
                    <h2 className="text-[18px] font-semibold leading-[28px] text-[#dbd2ef]">
                      Create a Vault
                    </h2>
                    <h4 className="text-[14px] leading-[20px] text-[#c3b5fd] border-solid border-[1px] rounded-[4px] border-[#5720b7] flex items-center justofy-center px-[8px] py-[4px]">
                      Step 2 of 2
                    </h4>
                  </div>
                </div>
                <Image
                  onClick={onClose}
                  src={"/x-close.svg"}
                  alt="Xclose"
                  width={24}
                  height={24}
                  className=" self-start hover:opacity-90 p-[1px] hover:bg-[#5720b7d3] rounded-full"
                />
              </div>
              <div className="flex flex-col gap-[32px] w-full">
                <form className="flex flex-col gap-[16px] text-left">
                  <div className="flex flex-col gap-[6px]">
                    <label className="flex justify-between w-full">
                      <h1 className="text-[14px] font-medium leading-[20px] text-[#f5f3ff]">
                        Enter the amount of GHO to stake
                      </h1>
                      <div className="flex gap-2">
                        <h3 className="text-right text-[14px] leading-[20px] text-[#DBD2EFCC]">
                          Available GHO: {availableGHO}
                        </h3>
                        <h4
                          onClick={handleBuyGHO}
                          className="text-right text-[14px] underline font-semibold leading-[20px] text-[#c3b5fd] hover:underline-offset-[2px]"
                        >
                          Buy more GHO
                        </h4>
                      </div>
                    </label>
                    <div
                      className="rounded-[8px] border-solid border-[#6927da] border-[1px] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] bg-[#491c96] 
                text-[#A48AFB]
              flex justify-between items-center gap-[8px]"
                    >
                      <input
                        type="number"
                        onChange={(e) => {
                          // setStakeGHO(e.target.value);
                        }}
                        placeholder="0"
                        className="bg-[#00000000] border-0 w-full
                  text-[16px] leading-[24px] py-[10px] pl-[14px]"
                      />
                      <h6
                        onClick={handleStakeAll}
                        className="pr-[14px] min-w-fit hover:underline cursor-pointer"
                      >
                        Stake All
                      </h6>
                    </div>
                  </div>
                  {stakeGHO > availableGHO && (
                    <div
                      className="rounded-[8px] border-solid border-[#6927da] border-[1px] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] 
                text-[#A48AFB]
              flex justify-between gap-[8px] w-full
                  text-[16px] leading-[24px] py-[10px] pl-[14px]"
                    >
                      <div className="flex gap-2">
                        <Image
                          src={"/info-circle.svg"}
                          alt="info"
                          width={20}
                          height={20}
                        />
                        <h3 className="text-left">
                          You don’t have enough GHO to stake.
                        </h3>
                      </div>
                      <h6 className="pr-[14px] min-w-fit underline font-semibold text-right place-self-end">
                        Buy GHO
                      </h6>
                    </div>
                  )}

                  <div className="border-b-[1px] border-solid border-[#491C96]"></div>
                  <div className="flex flex-col gap-[6px]">
                    <h3 className="text-[14px] font-medium leading-[20px] text-[#f5f3ff]">
                      Mint Reward Points
                    </h3>
                    {stakeGHO == 0 && (
                      <div
                        className="rounded-[8px] border-dashed border-[#6927da] border-[1px] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] 
                text-[#A48AFB]
               w-full
                  text-[16px] leading-[24px] py-[10px] pl-[14px]"
                      >
                        Stake GHO first to receive reward points
                      </div>
                    )}
                    {stakeGHO > 0 && (
                      <div
                        className="rounded-[8px] border-dashed border-[#6927da] border-[1px] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] 
                text-[#A48AFB]
               w-full
                  text-[16px] leading-[24px] py-[10px] pl-[14px]"
                      >
                        You’ll be eligible to mint {rewardPoints} Reward Points
                      </div>
                    )}
                  </div>
                </form>
                <div className="flex flex-col">
                  <h3 className="self-end text-[#ed8484cc] text-[12px]">
                    {message}
                  </h3>
                  <div className="grid grid-cols-2 gap-[12px]">
                    <button
                      onClick={handleBack}
                      className="font-semibold leading-[24px] text-[#a48afb] text-[16px]
        border-solid border-[1px] rounded-[8px] border-[#a48afb] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] 
        flex flex-row justify-center cursor-pointer px-[18px] py-[10px]
        hover:opacity-60"
                    >
                      Go Back
                    </button>
                    <button
                      onClick={handleCreate}
                      className="font-semibold leading-[24px] text-white text-[16px]
          border-solid border-[1px] rounded-[8px] border-[#a48afb] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] 
          bg-[#6941c6] 
          flex flex-row justify-center cursor-pointer px-[18px] py-[10px]
          hover:opacity-75"
                    >
                      Create Vault
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* FINAL vault create Loader */}
          {step == 3 && (
            <div
              className="border-solid border-[#5720b7] border-[1px] rounded-[12px] shadow-[0px_8px_8px_-4px_rgba(16,_24,_40,_0.04),_0px_20px_24px_-4px_rgba(16,_24,_40,_0.1)] bg-[#2e125e] 
p-[24px] flex flex-col gap-[20px] h-fit max-w-[690px] w-full"
            >
              <div className="flex flex-col gap-[8px] w-full text-center">
                <div className=" text-[20px] font-semibold leading-[28px] text-[#dbd2ef]">
                  Your vault is being created
                </div>
                <div className="text-[16px] leading-[28px] text-[#DBD2EFCC] w-full">
                  You’ll be redirected in just a moment
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CreateVaultModal;

const availableGHO = 0.0;
const rewardPoints = 0;
