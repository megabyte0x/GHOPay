import Image from "next/image";
import { ConnectKitButton } from "connectkit";
import BUTTONS from "../landing/Buttons";
import { useAccount } from "wagmi";
import useAppNavigation from "@/hooks/useAppNavigation";
import WalletInfo from "./WalletInfo";
import { useAppProvider } from "@/hooks/context/AppProvider";
import { EDashboardNavSelected } from "@/types";
import classNames from "classnames";

const NavBar = () => {
  const { isConnected } = useAccount();
  const { goToHome, isDashboard, isLanding, handleLandingOpen } =
    useAppNavigation();
  const { navSelected, setNavSelected } = useAppProvider();

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

        {isDashboard && (
          <div className="flex items-center gap-[32px] text-[16px] leading-[24px] font-semibold text-[#A69DB9]">
            <p
              className={classNames(
                "text-[14px] font-semibold leading-[20px] text-[#dbd2ef] cursor-pointer px-[4x] pb-[12px]",
                {
                  "bg-[#491C96] border-[#6927DA] border-[1px] border-solid rounded-[6px] px-[8px] py-[4px] text-[14px] text-[#DDD6FE] leading-[20px] font-semibold cursor-pointer":
                    navSelected === EDashboardNavSelected.SHOP,
                },
                {
                  "hover:bg-[#491C96] hover:border-[#6927da95] hover:border-[1px] hover:border-solid hover:rounded-[6px] px-[8px] py-[4px] text-[14px] hover:text-[#DDD6FE] leading-[20px] font-medium cursor-pointer":
                    navSelected === EDashboardNavSelected.APPLY_AS_A_PARTNER,
                },
              )}
              onClick={() => {
                setNavSelected(EDashboardNavSelected.SHOP);
              }}
            >
              Shop
            </p>
            <p
              className={classNames(
                "text-[14px] font-semibold leading-[20px] text-[#dbd2ef] cursor-pointer px-[4x] pb-[12px]",
                {
                  "bg-[#491C96] border-[#6927DA] border-[1px] border-solid rounded-[6px] px-[8px] py-[4px] text-[14px] text-[#DDD6FE] leading-[20px] font-semibold cursor-pointer":
                    navSelected === EDashboardNavSelected.APPLY_AS_A_PARTNER,
                },
                {
                  "hover:bg-[#491C96] hover:border-[#6927da95] hover:border-[1px] hover:border-solid hover:rounded-[6px] px-[8px] py-[4px] text-[14px] hover:text-[#DDD6FE] leading-[20px] font-medium cursor-pointer":
                    navSelected === EDashboardNavSelected.SHOP,
                },
              )}
              onClick={() => {
                setNavSelected(EDashboardNavSelected.APPLY_AS_A_PARTNER);
              }}
            >
              Apply as a partner
            </p>
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
