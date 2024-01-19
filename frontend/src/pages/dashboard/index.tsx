import useWalletInfo from "@/hooks/user/useWalletInfo";
import User from "./user";
import { useAccount } from "wagmi";
import useAppNavigation from "@/hooks/useAppNavigation";
import PartnerOnboarding from "../../components/partner/partner-onboarding";
import VaultInfo from "@/components/partner/vault-info";

const Dapp = () => {
  const { isPartner, isUser } = useWalletInfo();
  const { isConnected } = useAccount();
  const { goToHome } = useAppNavigation();

  if (!isConnected) {
    return goToHome();
  }

  if (isPartner) {
    if (isPartner.registered) {
      return <VaultInfo />;
    } else {
      return <PartnerOnboarding />;
    }
  }

  if (isUser) {
    return <User />;
  }
};

export default Dapp;
