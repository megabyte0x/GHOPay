import Image from "next/image";

type Props = {
  onClose: () => void;
  handleStakedGHO: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleStakeAll: () => void;
  handleBuyGHO: () => void;
  handleBack: () => void;
  message: string;
  availableGho: number;
  stakeGHO: number;
  rewardPoints: number;
  handleMintGHO: () => void;
};

const Step3 = ({
  onClose,
  handleStakedGHO,
  handleStakeAll,
  handleBuyGHO,
  handleBack,
  message,
  availableGho,
  stakeGHO,
  rewardPoints,
  handleMintGHO,
}: Props) => {
  return (
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
                  Available GHO: {availableGho}
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
                value={stakeGHO}
                onChange={handleStakedGHO}
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
          {stakeGHO > availableGho && (
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
              <h6
                className="hover:underline-offset-[2px] cursor-pointer
                      pr-[14px] min-w-fit underline font-semibold text-right place-self-end"
              >
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
          <h3 className="self-end text-[#ed8484cc] text-[12px]">{message}</h3>
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
              // onClick={handleCreate} TODO: Mint rp token function
              className="font-semibold leading-[24px] text-white text-[16px]
          border-solid border-[1px] rounded-[8px] border-[#a48afb] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] 
          bg-[#6941c6] 
          flex flex-row justify-center cursor-pointer px-[18px] py-[10px]
          hover:opacity-75"
              onClick={handleMintGHO}
            >
              Mint RP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3;
