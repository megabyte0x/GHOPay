"use client";
import Image from "next/image";
import { ConnectKitButton } from "connectkit";
import BUTTONS from "../landing/Buttons";
import { useAccount } from "wagmi";
import useAppNavigation from "@/hooks/useAppNavigation";
import WalletInfo from "./WalletInfo";
import { useAppProvider } from "@/hooks/context/AppProvider";
import { EDashboardNavSelected } from "@/types";
import classNames from "classnames";
import { useState } from "react";
import useWalletInfo from "@/hooks/user/useWalletInfo";

const NavBar = () => {
  const [dropdownVis, setDropdownVis] = useState(false);
  const { isConnected } = useAccount();
  const { goToHome, isDashboard, isLanding, handleLandingOpen } =
    useAppNavigation();
  const { navSelected, setNavSelected } = useAppProvider();

  const { isUser } = useWalletInfo();

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
      <div className="flex items-center gap-[40px] lg:w-fit w-full">
        <div
          className="flex gap-[8px] cursor-pointer items-center"
          onClick={goToHome}
        >
          <Image src={"/logo.svg"} width={32} height={32} alt="logo" />{" "}
          <h1 className="text-[20px] leading-[24px] text-[#DBD2EF] font-semibold">
            GHOPay
          </h1>
        </div>
        {isLanding && (
          <>
            <ul
              className="lg:flex hidden flex-row gap-[32px] 
          text-[16px] items-center font-semibold text-[#A69DB9]
          "
            >
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
                  handleClickScroll("feature-section");
                }}
              >
                Features
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
                  handleClickScroll("team-section");
                }}
              >
                Team
              </li>
            </ul>
            <ul
              onClick={() => {
                setDropdownVis(!dropdownVis);
              }}
              className="lg:hidden flex flex-col gap-[9px] hover:gap-[6px] cursor-pointer"
            >
              <li className="py-[1px] px-4 bg-[#DBD2EF] rounded-full"></li>
              <li className="py-[1px] px-4 bg-[#DBD2EF] rounded-full"></li>
              <li className="py-[1px] px-4 bg-[#DBD2EF] rounded-full"></li>
            </ul>
            {dropdownVis && (
              <ul
                className="fixed right-0 flex lg:hidden flex-col gap-[32px] 
       text-[16px] items-left font-semibold text-[#A69DB9]
       mt-[345px] bg-[#14141bb3] w-[100%] px-12 py-4 backdrop-blur z-30"
              >
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
                    handleClickScroll("feature-section");
                  }}
                >
                  Features
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
                    handleClickScroll("team-section");
                  }}
                >
                  Team
                </li>
              </ul>
            )}
          </>
        )}
        {isDashboard && isUser && (
          <ul className="flex items-center gap-[32px] text-[16px] leading-[24px] font-semibold text-[#A69DB9]">
            <li
              className={classNames(
                "text-[14px] text-[#dbd2ef] cursor-pointer px-[18px] py-[4px]",
                {
                  "bg-[#491C96] border-[#6927DA] border-[1px] border-solid rounded-[6px]  text-[14px] text-[#DDD6FE]  font-semibold ":
                    navSelected === EDashboardNavSelected.SHOP,
                },
                {
                  "hover:bg-[#491C96] hover:border-[#6927da95] hover:border-[1px] hover:border-solid hover:rounded-[6px]  text-[14px] hover:text-[#DDD6FE] font-medium ":
                    navSelected === EDashboardNavSelected.APPLY_AS_A_PARTNER,
                },
              )}
              onClick={() => {
                setNavSelected(EDashboardNavSelected.SHOP);
              }}
            >
              Shop
            </li>
            <li
              className={classNames(
                "text-[14px] text-[#dbd2ef] cursor-pointer px-[18px] py-[4px]",
                {
                  "bg-[#491C96] border-[#6927DA] border-[1px] border-solid rounded-[6px]  text-[14px] text-[#DDD6FE] font-semibold ":
                    navSelected === EDashboardNavSelected.APPLY_AS_A_PARTNER,
                },
                {
                  "hover:bg-[#491C96] hover:border-[#6927da95] hover:border-[1px] hover:border-solid hover:rounded-[6px] text-[14px] hover:text-[#DDD6FE]  font-medium":
                    navSelected === EDashboardNavSelected.SHOP,
                },
              )}
              onClick={() => {
                setNavSelected(EDashboardNavSelected.APPLY_AS_A_PARTNER);
              }}
            >
              Apply as a partner
            </li>
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
