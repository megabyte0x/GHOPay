"use client";
import { useAccount } from "wagmi";
import {
  FeatureSection,
  Hero,
  HowItWorks,
  Partnered,
  Team,
} from "@/pages/_containers";

const WalletInfo = () => {
  const { isConnecting, isDisconnected } = useAccount();
  if (isConnecting) return <div>Connecting...</div>;
  if (isDisconnected) return <div>Disconnected</div>;
  return (
    <div className="bg-[#14141B] pt-[64px] flex flex-col items-center justify-center md:px-20 px-6">
      <Hero />
      <HowItWorks />
      <FeatureSection />
      <Partnered />
      <Team />
    </div>
  );
};

export default WalletInfo;
