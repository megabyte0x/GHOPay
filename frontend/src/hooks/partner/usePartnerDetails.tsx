import { CONTRACTS } from "@/constants";
import { PartnerInfo, TAddress } from "@/types";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { readContract } from "wagmi/actions";

const getVaultInfo = async (partnerVaultAddr: TAddress) => {
  const promises = [
    "name",
    "symbol",
    "totalSupply",
    "totalAssets",
    "rpTokenBalance",
  ].map((funcName) => {
    return readContract({
      abi: CONTRACTS.PARTNER.PartnerVault.ABI,
      address: partnerVaultAddr,
      functionName: funcName,
      ...(funcName === "rpTokenBalance" && {
        args: [CONTRACTS.PUBLIC.RPool.address],
      }),
    });
  });

  const [name, symbol, totalSupply, stakedGho, partnerTokenBalance] =
    (await Promise.all(promises)) as unknown as [
      string,
      string,
      number,
      number,
      number,
    ];

  return {
    name,
    symbol,
    partnerTokenBalance: Number(partnerTokenBalance) / 10e17,
    stakedGho: Number(stakedGho) / 10e17,
    totalSupply: Number(totalSupply) / 10e17,
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
    tokenBalance: partnerDetail.partnerTokenBalance,
    totalSupply: partnerDetail.totalSupply,
    stakedGho: partnerDetail.stakedGho,
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
