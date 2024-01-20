import Image from "next/image";
import { ConnectKitButton } from "connectkit";
import BUTTONS from "../landing/Buttons";
import { useAccount } from "wagmi";
import useAppNavigation from "@/hooks/useAppNavigation";
import WalletInfo from "./WalletInfo";
import useWalletInfo from "@/hooks/user/usePartnerInfo";

const NavBar = () => {
  const { isConnected } = useAccount();
  const { isUser } = useWalletInfo();
  const { goToHome, isDashboard, isLanding, handleLandingOpen } =
    useAppNavigation();
  const handleClickScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div
      className="fixed top-0 w-[100vw] backdrop-blur z-30
    border-b-[1px] border-[#DBD2EF1A] bg-[#14141b75] h-[68px] px-20 flex items-center justify-between "
    >
      <div className="flex gap-[40px]">
        <div className="flex gap-[8px] cursor-pointer" onClick={goToHome}>
          <Image src={"/logo.svg"} width={32} height={32} alt="logo" />{" "}
          <h1 className="text-[20px] leading-[24px] text-[#DBD2EF] font-semibold">
            GHOPay
          </h1>
        </div>
        {isLanding && (
          <ul className="flex flex-row gap-[32px] text-[16px] items-center font-semibold text-[#A69DB9]">
            <li
              className="hover:bg-[#c3b8db] hover:text-[#14141B] cursor-pointer px-[15px] py-[1px] rounded-md h-fit"
              onClick={() => {
                handleClickScroll("home-section");
              }}
            >
              Home
            </li>
            <li
              className="hover:bg-[#c3b8db] hover:text-[#14141B] cursor-pointer px-[15px] py-[1px] rounded-md h-fit"
              onClick={() => {
                handleClickScroll("how-section");
              }}
            >
              How it Works
            </li>
            <li
              className="hover:bg-[#c3b8db] hover:text-[#14141B] cursor-pointer px-[15px] py-[1px] rounded-md h-fit"
              onClick={() => {
                handleClickScroll("partner-section");
              }}
            >
              Partner
            </li>
            <li
              className="hover:bg-[#c3b8db] hover:text-[#14141B] cursor-pointer px-[15px] py-[1px] rounded-md h-fit"
              onClick={() => {
                handleClickScroll("feature-section");
              }}
            >
              Features
            </li>
            <li
              className="hover:bg-[#c3b8db] hover:text-[#14141B] cursor-pointer px-[15px] py-[1px] rounded-md h-fit"
              onClick={() => {
                handleClickScroll("team-section");
              }}
            >
              Team
            </li>
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
