import User from "./user";
import { useAccount } from "wagmi";
import useAppNavigation from "@/hooks/useAppNavigation";
import useWalletInfo from "@/hooks/user/useWalletInfo";
import Partner from "./partner";

const Dapp = () => {
  const { isPartner, isUser } = useWalletInfo();
  const { isConnected } = useAccount();
  const { goToHome } = useAppNavigation();

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
