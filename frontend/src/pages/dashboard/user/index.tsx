import { useState } from "react";
import Swap from "../../../components/user/swap";
import Shop from "../../../components/user/shop";
import classNames from "classnames";
import { useAppProvider } from "@/hooks/context/AppProvider";
import PartnerOnboarding from "@/components/partner/partner-onboarding";
import { EDashboardNavSelected } from "@/types";

enum ENav {
  SHOP = "SHOP",
  SWAP = "SWAP",
}

export const User = () => {
  const { navSelected } = useAppProvider();

  const [subNavType, setSubNavType] = useState<ENav>(ENav.SHOP);

  return (
    <>
      {navSelected === EDashboardNavSelected.SHOP ? (
        <div>
          <div className="flex flex-col px-20 pt-[72px]">
            <div className="border-solid border-b-[1px] border-[#FFFFFF33] flex gap-[20px]  justify-start items-start">
              <button
                className={classNames(
                  "text-[14px] font-semibold leading-[20px] text-[#dbd2ef] cursor-pointer px-[4x] pb-[12px]",
                  {
                    "border-solid border-b-2": subNavType === ENav.SHOP,
                  }
                )}
                onClick={() => setSubNavType(ENav.SHOP)}
              >
                Shop
              </button>
              <button
                className={classNames(
                  "text-[14px] font-semibold leading-[20px] text-[#dbd2ef] cursor-pointer px-[4x] pb-[12px]",
                  {
                    "border-solid border-b-2": subNavType === ENav.SWAP,
                  }
                )}
                onClick={() => setSubNavType(ENav.SWAP)}
              >
                Swap
              </button>
            </div>
          </div>
          <div>
            {subNavType === ENav.SHOP ? (
              <Shop />
            ) : (
              <div className="flex w-full items-center justify-center py-[48px]">
                <Swap swapType="userSwap" />
              </div>
            )}
          </div>
        </div>
      ) : (
        <PartnerOnboarding />
      )}
    </>
  );
};
export default User;
