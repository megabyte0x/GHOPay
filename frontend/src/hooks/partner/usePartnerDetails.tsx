import { CONTRACTS } from "@/constants";
import { PartnerInfo, TAddress } from "@/types";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { readContract } from "wagmi/actions";

const getVaultInfo = async (partnerVaultAddr: TAddress) => {
  const promises = ["name", "symbol", "totalAssets", "rpTokenBalance"].map(
    (funcName) => {
      return readContract({
        abi: CONTRACTS.PARTNER.PartnerVault.ABI,
        address: partnerVaultAddr,
        functionName: funcName,
        ...(funcName === "rpTokenBalance" && {
          args: [CONTRACTS.PUBLIC.RPool.address],
        }),
      });
    },
  );

  const [name, symbol, rpTokenBalance, totalAssets] = (await Promise.all(
    promises,
  )) as unknown as [string, string, number, number];

  return {
    name,
    symbol,
    rpTokenBalance: Number(rpTokenBalance) / 10e17,
    totalAssets: Number(totalAssets) / 10e17,
  };
};

export const getPartnerDetails = async () => {
  const [partnerAddrs, partnerVaultAddrs, partnerPaymentAddrs] =
    (await readContract({
      abi: CONTRACTS.PUBLIC.Utils.ABI,
      address: CONTRACTS.PUBLIC.Utils.address,
      functionName: "getAllDetails",
    })) as [Array<TAddress>, Array<TAddress>, Array<TAddress>];

  if (!partnerVaultAddrs) {
    return [];
  }

  const promises = partnerVaultAddrs.map((partnerVaultAddr) =>
    getVaultInfo(partnerVaultAddr),
  );

  const _partnerDetails = await Promise.all(promises);

  return _partnerDetails.map((partnerDetail, index) => ({
    addrs: {
      partner: partnerAddrs[index] as TAddress,
      vault: partnerVaultAddrs[index] as TAddress,
      payment: partnerPaymentAddrs[index] as TAddress,
    },
    name: partnerDetail.name,
    symbol: partnerDetail.symbol,
    tokenBalance: partnerDetail.rpTokenBalance,
    totalSupply: partnerDetail.totalAssets,
  })) as PartnerInfo[];
};

const usePartnerDetails = () => {
  const { address } = useAccount();
  const [partnerAddrs, setPartnerAddrs] = useState<TAddress[]>();
  const [partnerPaymentAddrs, setPartnerPaymentAddrs] = useState<TAddress[]>();
  const [partnerVaultAddrs, setPartnerVaultAddrs] = useState<TAddress[]>();
  const [details, setDetails] = useState<PartnerInfo[]>();

  useEffect(() => {
    if (!address) return;

    (async () => {
      const details = await getPartnerDetails();

      // Initialize arrays to hold the addresses
      const _partnerAddrs: TAddress[] = [];
      const _partnerPaymentAddrs: TAddress[] = [];
      const _partnerVaultAddrs: TAddress[] = [];

      // Use a single map to populate the arrays
      details.forEach((partnerInfo) => {
        _partnerAddrs.push(partnerInfo.addrs.partner);
        _partnerPaymentAddrs.push(partnerInfo.addrs.payment);
        _partnerVaultAddrs.push(partnerInfo.addrs.vault);
      });

      setDetails(details);
      setPartnerAddrs(_partnerAddrs);
      setPartnerPaymentAddrs(_partnerPaymentAddrs);
      setPartnerVaultAddrs(_partnerVaultAddrs);
    })();
  }, [address]);

  return {
    partnerAddrs,
    partnerPaymentAddrs,
    partnerVaultAddrs,
    details,
  };
};

export default usePartnerDetails;
