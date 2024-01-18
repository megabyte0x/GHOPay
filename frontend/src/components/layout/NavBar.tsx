import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ConnectKitButton, useModal } from "connectkit";
import BUTTONS from "../landing/Buttons";
import { useAccount } from "wagmi";
import { ROUTES } from "@/constants";
import { useRouter } from "next/router";
import WalletInfo from "./WalletInfo";

type _NavBarProps = {
  handleOpenDapp: () => void;
};

const _NavBar = ({ handleOpenDapp }: _NavBarProps) => {
  const { isConnected } = useAccount();
  const router = useRouter();
  const pathname = usePathname();
  const isLanding = pathname === ROUTES.LANDING;
  const isDashboard = pathname.startsWith(ROUTES.DASHBOARD);

  if (isDashboard && !isConnected) {
    router.push(ROUTES.LANDING);
  }

  return (
    <div className="border-b-[1px] border-[#DBD2EF1A] bg-[#14141B] h-[68px] px-20 flex items-center justify-between ">
      <div className="flex gap-[40px]">
        <div className="flex gap-[8px]">
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
        {isDashboard && (
          <ul className="flex flex-row gap-[32px] text-[16px] leading-[24px] font-semibold text-[#A69DB9]">
            <li>Shop</li>
            <li>Apply As Partner</li>
          </ul>
        )}
      </div>
      {isConnected ? (
        <WalletInfo />
      ) : isLanding ? (
        <BUTTONS.PURPLE
          text="Launch Dapp"
          style="text-[16px] px-[18px] py-[12px]"
          onClick={handleOpenDapp}
        />
      ) : (
        <ConnectKitButton />
      )}
    </div>
  );
};

type NavBarProps = {
  setHandleOpenDapp?: (handleOpenDapp: () => void) => void;
};

const NavBar = ({ setHandleOpenDapp }: NavBarProps) => {
  const { setOpen } = useModal();
  const { isConnected } = useAccount();
  const [dappOpen, setDappOpen] = useState<boolean>();
  const router = useRouter();
  const [handler, setHandler] = useState<boolean>();

  const handleOpenDapp = useCallback(() => {
    setOpen(true); // Open the modal to connect the wallet
    setDappOpen(true);
  }, [setOpen]); // Dependencies array

  useEffect(() => {
    if (handler || !setHandleOpenDapp) return;
    setHandler(true);
    setHandleOpenDapp(() => handleOpenDapp);
  }, [handleOpenDapp, setHandleOpenDapp, handler]);

  useEffect(() => {
    if (dappOpen && isConnected) {
      router.push(ROUTES.DASHBOARD);
    }
  }, [dappOpen, isConnected, router]);

  return <_NavBar handleOpenDapp={handleOpenDapp} />;
};

export default NavBar;
