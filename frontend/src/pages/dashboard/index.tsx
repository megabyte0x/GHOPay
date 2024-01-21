import User from "./user";
import { useAccount } from "wagmi";
import useAppNavigation from "@/hooks/useAppNavigation";
import useWalletInfo from "@/hooks/user/useWalletInfo";
import Partner from "./partner";
import usePartnerDetails from "@/hooks/partner/usePartnerDetails";
import useBalances from "@/hooks/useBalances";

const Dapp = () => {
  const { isPartner, isUser } = useWalletInfo();
  const { isConnected } = useAccount();
  const { goToHome } = useAppNavigation();
  usePartnerDetails();
  useBalances();

  if (!isConnected) {
    return goToHome();
  }

  if (isPartner) {
    return <Partner />;
  }

  if (isUser) {
    return <User />;
  }
};

export default Dapp;
