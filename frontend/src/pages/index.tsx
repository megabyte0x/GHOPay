"use client";
import Image from "next/image";
import { useAccount } from "wagmi";
import {
  FeatureSection,
  Hero,
  HowItWorks,
  Partnered,
  Team,
} from "@/pages/_containers";
import { Footer } from "./_components";

const WalletInfo = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  if (isConnecting) return <div>Connecting...</div>;
  if (isDisconnected) return <div>Disconnected</div>;
  return (
    <div className="bg-[#14141B] pt-[64px] flex flex-col items-center justify-center px-20">
      {/* Connected Wallet: {address} */}

      <Hero />
      <HowItWorks />
      <FeatureSection />
      <Partnered />
      <Team />
      <Footer />
    </div>
  );
};

export default WalletInfo;
