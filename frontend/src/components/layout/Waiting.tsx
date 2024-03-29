import { Loader } from "@/utils/loader";

type Props = {
  text1: string;
};

const Waiting = ({ text1 }: Props) => {
  return (
    // Overlay covering the entire viewport
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      {/* Modal Content */}
      <div
        className="border-solid border-[#5720b7] border-[1px] rounded-[12px] shadow-[0px_8px_8px_-4px_rgba(16,_24,_40,_0.04),_0px_20px_24px_-4px_rgba(16,_24,_40,_0.1)] bg-[#2e125e] 
        p-[24px] flex flex-col gap-[20px] h-fit max-w-[690px] w-full"
      >
        <div className="flex flex-col gap-[8px] w-full text-center items-center">
          {Loader}
          <div className="text-[20px] font-semibold leading-[28px] text-[#dbd2ef]">
            {text1}
          </div>
          <div className="text-[16px] leading-[28px] text-[#DBD2EFCC] w-full">
            You’ll be redirected in just a moment
          </div>
        </div>
      </div>
    </div>
  );
};

export default Waiting;
