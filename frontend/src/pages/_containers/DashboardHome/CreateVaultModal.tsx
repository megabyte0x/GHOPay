import React from "react";

const CreateVaultModal = () => {
  return (
    <div>
      <div
        className="border-solid border-[#5720b7] border-1 rounded-[12px] shadow-[0px_8px_8px_-4px_rgba(16,_24,_40,_0.04),_0px_20px_24px_-4px_rgba(16,_24,_40,_0.1)] bg-[#2e125e] 
      p-[24px] flex flex-col"
      >
        <div className="flex flex-row w-full items-start">
          <div className="flex justify-between w-full">
            <div className="flex flex-row mt-6 gap-6 w-1/3 items-start">
              <div className="border-solid border-[#6927da] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] bg-[#5720b7] flex flex-row justify-center mt-1 pt-3 w-12 h-12 items-start border rounded-lg">
                <img
                  src="https://file.rendit.io/n/V27DMsDKADJGKg3qtqt2.svg"
                  alt="Fingerprint"
                  id="Fingerprint"
                  className="w-6"
                />
              </div>
              <div className="flex flex-col gap-1 w-3/5 font-['Inter'] items-start">
                <div
                  id="Text1"
                  className="text-lg font-semibold leading-[28px] text-[#dbd2ef]"
                >
                  Create a Vault
                </div>
                <div className="text-sm leading-[20px] text-[#c3b5fd] border-solid border-[#5720b7] bg-[#2e125e] flex flex-row w-20 items-start pt-1 px-2 border rounded">
                  Step 1 of 2
                </div>
              </div>
            </div>
            <img
              src="https://file.rendit.io/n/8gACPWHtjvv0UKeFVWxB.svg"
              alt="Xclose"
              id="Xclose"
              className="mt-6 w-6"
            />
          </div>

          <div className="flex flex-col justify-between ml-0 gap-4 w-full items-start">
            <div className="flex flex-col justify-between gap-1 w-full items-start">
              <div
                id="Label"
                className="text-sm font-medium leading-[20px] text-[#f5f3ff] ml-6"
              >
                Name of Vault*
              </div>
            </div>
            <div
              id="Input"
              className="border-solid border-[#6927da] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] bg-[#491c96] flex flex-row justify-between ml-6 w-full h-10 font-['Inter'] items-start pt-2 px-3 border rounded-lg"
            >
              <div id="Text2" className="leading-[24px] text-[#c3b5fd]">
                Enter a name for your vault
              </div>
              <div id="Text3" className="leading-[24px] text-[#a48afb]">
                0/30
              </div>
            </div>
            <div
              id="HintText"
              className="text-sm leading-[20px] text-[rgba(219,_210,_239,_0.8)] ml-6"
            >
              This cannot be changed later.
            </div>
          </div>
          <div className="flex flex-col justify-between ml-6 gap-1 w-full items-start">
            <div
              id="Label1"
              className="text-sm font-medium leading-[20px] text-[#f5f3ff]"
            >
              Symbol for Reward Point*
            </div>
            <div
              id="Input1"
              className="border-solid border-[#6927da] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] bg-[#491c96] flex flex-row justify-center pt-2 gap-20 w-full h-10 font-['Inter'] items-start border rounded-lg"
            >
              <div id="Text4" className="leading-[24px] text-[#c3b5fd]">
                Enter a 4 letter Symbol name for your vault e.g. GHOV, SHAR{" "}
              </div>
              <div id="Text5" className="leading-[24px] text-[#a48afb]">
                0/4
              </div>
            </div>
            <div
              id="HintText1"
              className="text-sm leading-[20px] text-[rgba(219,_210,_239,_0.8)]"
            >
              This cannot be changed later.
            </div>
          </div>
          <div className="flex flex-col justify-between ml-6 gap-1 w-full font-['Inter'] items-start">
            <div
              id="Label2"
              className="text-sm font-medium leading-[20px] text-[#f5f3ff]"
            >
              Ratio*
            </div>
            <div
              id="Input2"
              className="leading-[24px] text-[#c3b5fd] border-solid border-[#6927da] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] bg-[#491c96] flex flex-row w-full h-10 items-start pt-2 px-3 border rounded-lg"
            >
              Enter a ratio
            </div>
            <div
              id="HintText2"
              className="text-sm leading-[20px] text-[rgba(219,_210,_239,_0.8)]"
            >
              Conversion ratio from Reward Points to GHO.
            </div>
          </div>
        </div>
        <div className="flex flex-row ml-6 gap-3 w-full items-start">
          <button
            id="Button1"
            className="font-semibold leading-[24px] text-[#a48afb] border-solid border-[#a48afb] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] flex flex-row justify-center pt-2 w-1/2 h-10 cursor-pointer items-start border rounded-lg"
          >
            Cancel
          </button>
          <button
            id="Button2"
            className="font-semibold leading-[24px] text-white border-solid border-[#a48afb] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] bg-[#6941c6] flex flex-row justify-center pt-2 w-1/2 h-10 cursor-pointer items-start border rounded-lg"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateVaultModal;
