import Image from "next/image";
import { ConnectKitButton } from "connectkit";
import BUTTONS from "../landing/Buttons";
import { useAccount } from "wagmi";
import useAppNavigation from "@/hooks/useAppNavigation";
import WalletInfo from "./WalletInfo";
import useWalletInfo from "@/hooks/user/useWalletInfo";

const NavBar = () => {
  const { isConnected } = useAccount();
  const { isUser } = useWalletInfo();
  const { goToHome, isDashboard, isLanding, handleLandingOpen } =
    useAppNavigation();

  return (
    <div className="border-b-[1px] border-[#DBD2EF1A] bg-[#14141B] h-[68px] px-20 flex items-center justify-between ">
      <div className="flex gap-[40px]">
        <div className="flex gap-[8px] cursor-pointer" onClick={goToHome}>
          <Image src={"/logo.svg"} width={32} height={32} alt="logo" />{" "}
          <h1 className="text-[20px] leading-[24px] text-[#DBD2EF] font-semibold">
            GHOPay
          </h1>
        </div>
        {isLanding && (
          <ul className="flex flex-row gap-[32px] text-[16px] leading-[24px] font-semibold text-[#A69DB9]">
            <li>Home</li>
            <li>How it Works</li>
            <li>Partner</li>
            <li>Features</li>
            <li>Team</li>
          </ul>
        )}
        {isDashboard && isUser && (
          <ul className="flex flex-row gap-[32px] text-[16px] leading-[24px] font-semibold text-[#A69DB9]">
            <li>Shop</li>
            <li>Apply as a partner</li>
          </ul>
        )}
      </div>
      {isConnected ? (
        <WalletInfo />
      ) : isLanding ? (
        <BUTTONS.PURPLE
          text="Launch Dapp"
          style="text-[16px] px-[18px] py-[12px]"
          onClick={handleLandingOpen}
        />
      ) : (
        <ConnectKitButton />
      )}
    </div>
  );
};

export default NavBar;
