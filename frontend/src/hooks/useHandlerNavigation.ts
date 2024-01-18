import { ROUTES } from "@/constants";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useAccount } from "wagmi";

function useHandleNavigation() {
  const router = useRouter();
  const { isConnected } = useAccount();
  const pathname = usePathname();
  const isDashboard = pathname.startsWith(ROUTES.DASHBOARD);
  const isLanding = pathname === ROUTES.LANDING;

  useEffect(() => {
    if (isDashboard && !isConnected) {
      router.push(ROUTES.LANDING);
    }
  }, [isConnected, isDashboard, router]);

  const goToHome = useCallback(() => {
    router.push("/");
  }, [router]);

  return { goToHome, isDashboard, isLanding };
}

export default useHandleNavigation;
