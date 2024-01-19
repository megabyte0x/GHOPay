export type IsPartner = {
  registered: boolean;
};

function usePartnerInfo() {
  const isPartner: undefined | IsPartner = {
    registered: false,
  };

  return { isPartner };
}

export default usePartnerInfo;
