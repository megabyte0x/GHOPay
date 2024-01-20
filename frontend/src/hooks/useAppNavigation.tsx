// src/hooks/useAppNavigation.js
import { ROUTES } from "@/constants";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useAccount } from "wagmi";
import { useModal } from "connectkit";
import { useAppProvider } from "./context/AppProvider";

function useAppNavigation() {
  const router = useRouter();
  const { isConnected } = useAccount();
  const { setOpen } = useModal();
  const { arrivedFromLandingPage, setArrivedFromLandingPage } =
    useAppProvider();
  const pathname = usePathname();
  const isDashboard = pathname.startsWith(ROUTES.DASHBOARD);
  const isLanding = pathname === ROUTES.LANDING;

  useEffect(() => {
    if (isLanding && arrivedFromLandingPage) {
      router.push(ROUTES.DASHBOARD);
    }

    if (isDashboard && !isConnected) {
      setArrivedFromLandingPage(false);
      router.push(ROUTES.LANDING);
    }
  }, [
    isDashboard,
    isConnected,
    router,
    setArrivedFromLandingPage,
    isLanding,
    arrivedFromLandingPage,
  ]);

  const handleLandingOpen = useCallback(() => {
    setArrivedFromLandingPage(true);
    console.log("here");
    !isConnected && setOpen(true);
  }, [setArrivedFromLandingPage, isConnected, setOpen]);

  const goToDashboard = useCallback(() => {
    if (arrivedFromLandingPage && isConnected) {
      router.push(ROUTES.DASHBOARD);
    }
  }, [arrivedFromLandingPage, isConnected, router]);

  const goToHome = useCallback(() => {
    if (isDashboard && isConnected) {
      setArrivedFromLandingPage(false);
      router.push(ROUTES.LANDING);
    }
  }, [isConnected, isDashboard, router, setArrivedFromLandingPage]);

  return {
    goToDashboard,
    goToHome,
    handleLandingOpen,
    isDashboard,
    isLanding,
  };
}

export default useAppNavigation;
