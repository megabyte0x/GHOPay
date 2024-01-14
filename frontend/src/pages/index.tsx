"use client";
import Image from "next/image";
import { useAccount } from "wagmi";
import { Hero } from "@/containers";

const WalletInfo = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  if (isConnecting) return <div>Connecting...</div>;
  if (isDisconnected) return <div>Disconnected</div>;
  return (
    <div className="bg-[#14141B] pt-[64px] pb-[96px] flex flex-col items-center justify-center">
      {/* Connected Wallet: {address} */}
      <Hero />
      <div className="py-[96px] flex flex-col gap-[64px] items-center">
        <div className="text-center">
          <h6 className="text-[#dbd2efa5] text-[16px] font-semibold leading-[24px]">
            How it Works
          </h6>
          <h1 className="text-[#DBD2EF] text-[36px] leading-[44px] font-semibold tracking-[-0.72px] pt-[12px] pb-[20px]">
            GHOPay: Your Passport to Rewarding Transactions
          </h1>
          <h4 className="text-[20px] leading-[30px] text-[#dbd2efa5]">
            Learn how payments with GHO can earn you incredible rewards.
          </h4>
        </div>
        <div className="flex gap-[32px]">
          <div className="flex gap-[20px] flex-col items-center justify-center">
            <Image
              src={"/credit-card-icon.svg"}
              height={48}
              width={48}
              alt="credit-card"
              className="bg-[#393149] p-[12px] rounded-[10px]"
            />
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-[#F5F5F6] text-[20px] leading-[30px] font-semibold">
                Pay with GHO Stablecoin
              </h2>
              <h5 className="text-[#94969C] text-[16px] leading-[24px]">
                Make everyday transactions. Every payment brings you closer to
                fantastic rewards.
              </h5>
            </div>
          </div>
          <Image src={"/arrow-right.svg"} height={32} width={32} alt="arrow" />
          <div className="flex gap-[20px] flex-col items-center justify-center">
            <Image
              src={"/credit-card-icon.svg"}
              height={48}
              width={48}
              alt="credit-card"
              className="bg-[#393149] p-[12px] rounded-[10px]"
            />
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-[#F5F5F6] text-[20px] leading-[30px] font-semibold">
                Pay with GHO Stablecoin
              </h2>
              <h5 className="text-[#94969C] text-[16px] leading-[24px]">
                Make everyday transactions. Every payment brings you closer to
                fantastic rewards.
              </h5>
            </div>
          </div>
          <Image src={"/arrow-right.svg"} height={32} width={32} alt="arrow" />
          <div className="flex gap-[20px] flex-col items-center justify-center">
            <Image
              src={"/credit-card-icon.svg"}
              height={48}
              width={48}
              alt="credit-card"
              className="bg-[#393149] p-[12px] rounded-[10px]"
            />
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-[#F5F5F6] text-[20px] leading-[30px] font-semibold">
                Pay with GHO Stablecoin
              </h2>
              <h5 className="text-[#94969C] text-[16px] leading-[24px]">
                Make everyday transactions. Every payment brings you closer to
                fantastic rewards.
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletInfo;
