import Image from "next/image";

type Props = {
  onClose: () => void;
  onBack: () => void;
  handleVaultName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSymbol: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRatio1: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRatio2: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCreate: () => void;
  message: string;
  vaultName: string;
  symbol: string;
};

const Step1 = ({
  onClose,
  onBack,
  handleVaultName,
  handleSymbol,
  handleRatio1,
  handleRatio2,
  handleCreate,
  message,
  vaultName,
  symbol,
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
                onChange={handleVaultName}
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
                onChange={handleSymbol}
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
            <div className="flex gap-[12px] w-full items-center justify-center">
              <div
                className="rounded-[8px] border-solid border-[#6927da] border-[1px] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] bg-[#491c96] 
                text-[#A48AFB]
              flex justify-between items-center gap-[8px]"
              >
                <input
                  onChange={handleRatio1}
                  type="number"
                  placeholder="Enter XX"
                  className="bg-[#00000000] border-0 w-full
                  text-[16px] leading-[24px] py-[10px] px-[14px]"
                />
              </div>
              <h1 className="text-[24px] font-bold text-[#f5f3ff]">:</h1>
              <div
                className="rounded-[8px] border-solid border-[#6927da] border-[1px] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] bg-[#491c96] 
                text-[#A48AFB]
              flex justify-between items-center gap-[8px]"
              >
                <input
                  onChange={handleRatio2}
                  type="number"
                  placeholder="Enter XX"
                  className="bg-[#00000000] border-0 w-full
                  text-[16px] leading-[24px] py-[10px] px-[14px]"
                />
              </div>
            </div>
            <h3 className="text-[12px] leading-[20px] text-[#DBD2EFCC] self-center">
              Conversion ratio from Reward Points to GHO.
            </h3>
          </div>
        </form>
        <div className="flex flex-col">
          <h3 className="self-end text-[#ed8484cc] text-[12px]">{message}</h3>
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
              onClick={handleCreate}
              className="font-semibold leading-[24px] text-white text-[16px]
          border-solid border-[1px] rounded-[8px] border-[#a48afb] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] 
          bg-[#6941c6] 
          flex flex-row justify-center cursor-pointer px-[18px] py-[10px]
          hover:opacity-60"
            >
              Create Vault
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
