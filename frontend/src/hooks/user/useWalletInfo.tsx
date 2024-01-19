import usePartnerInfo from "./usePartnerInfo";
import useUserInfo from "./useUserInfo";

function useWalletInfo() {
  const { isUser } = useUserInfo();
  const { isPartner } = usePartnerInfo();

  return { isUser, isPartner };
}

export default useWalletInfo;
