import Image from "next/image";
import { ConnectKitButton } from "connectkit";
import BUTTONS from "../landing/Buttons";
import { useAccount } from "wagmi";
import useAppNavigation from "@/hooks/useAppNavigation";
import WalletInfo from "./WalletInfo";
import useWalletInfo from "@/hooks/user/useWaleltInfo";
import Link from "next/link";

const NavBar = () => {
  const { isConnected } = useAccount();
  const { isUser } = useWalletInfo();
  const { isPartner } = useWalletInfo();
  const {
    goToHome,
    isDashboard,
    isLanding,
    handleLandingOpen,
    userPartner,
    userShopSwap,
    partnerShop,
    partnerVault,
  } = useAppNavigation();
  const handleClickScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  console.log(isUser);
  console.log(isPartner);
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
        {isDashboard && isUser && userShopSwap && (
          <div className="flex items-center gap-[32px] text-[16px] leading-[24px] font-semibold text-[#A69DB9]">
            <Link
              href={"/dashboard/user"}
              className="bg-[#491C96] border-[#6927DA] border-[1px] border-solid rounded-[6px]
            px-[8px] py-[4px] text-[14px] text-[#DDD6FE] leading-[20px] font-semibold
            cursor-pointer"
            >
              Shop
            </Link>
            <Link
              href={"/dashboard/user/applyAsPartner"}
              className="hover:bg-[#491C96] hover:border-[#6927da95] hover:border-[1px] hover:border-solid hover:rounded-[6px]
            px-[8px] py-[4px] text-[14px] hover:text-[#DDD6FE] leading-[20px] font-medium
            cursor-pointer"
            >
              Apply as a partner
            </Link>
          </div>
        )}
        {isDashboard && isUser && userPartner && (
          <div className="flex items-center gap-[32px] text-[16px] leading-[24px] font-semibold text-[#A69DB9]">
            <Link
              href={"/dashboard/user"}
              className="hover:bg-[#491C96] hover:border-[#6927da95] hover:border-[1px] hover:border-solid hover:rounded-[6px]
            px-[8px] py-[4px] text-[14px] hover:text-[#DDD6FE] leading-[20px] font-medium
            cursor-pointer"
            >
              Shop
            </Link>
            <Link
              href={"/dashboard/user/applyAsPartner"}
              className="bg-[#491C96] border-[#6927DA] border-[1px] border-solid rounded-[6px]
            px-[8px] py-[4px] text-[14px] text-[#DDD6FE] leading-[20px] font-semibold
            cursor-pointer"
            >
              Apply as a partner
            </Link>
          </div>
        )}
        {isDashboard && partnerShop && (
          <div className="flex items-center gap-[32px] text-[16px] leading-[24px] font-semibold text-[#A69DB9]">
            <Link
              href={"/dashboard/partner"}
              className="bg-[#491C96] border-[#6927DA] border-[1px] border-solid rounded-[6px]
            px-[8px] py-[4px] text-[14px] text-[#DDD6FE] leading-[20px] font-semibold
            cursor-pointer"
            >
              Shop
            </Link>
            <Link
              href={"/dashboard/user/applyAsPartner"}
              className="hover:bg-[#491C96] hover:border-[#6927da95] hover:border-[1px] hover:border-solid hover:rounded-[6px]
            px-[8px] py-[4px] text-[14px] hover:text-[#DDD6FE] leading-[20px] font-medium
            cursor-pointer"
            >
              Apply as a partner
            </Link>
          </div>
        )}
        {isDashboard && partnerVault && (
          <div className="flex items-center gap-[32px] text-[16px] leading-[24px] font-semibold text-[#A69DB9]">
            <Link
              href={"/dashboard/partner/shop"}
              className="hover:bg-[#491C96] hover:border-[#6927da95] hover:border-[1px] hover:border-solid hover:rounded-[6px]
            px-[8px] py-[4px] text-[14px] hover:text-[#DDD6FE] leading-[20px] font-medium
            cursor-pointer"
            >
              Shop
            </Link>
            <Link
              href={"/dashboard/user/applyAsPartner"}
              className="bg-[#491C96] border-[#6927DA] border-[1px] border-solid rounded-[6px]
            px-[8px] py-[4px] text-[14px] text-[#DDD6FE] leading-[20px] font-semibold
            cursor-pointer"
            >
              Apply as a partner
            </Link>
          </div>
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
