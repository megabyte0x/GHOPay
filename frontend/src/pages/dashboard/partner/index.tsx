import PartnerOnboarding from "../../../components/partner/partner-onboarding";
import useWalletInfo from "@/hooks/user/useWalletInfo";
import VaultInfo from "@/components/partner/vault-info";

const Partner = () => {
  const { isPartner } = useWalletInfo();

  return <>{!isPartner ? <PartnerOnboarding /> : <VaultInfo />}</>;
};

export default Partner;
