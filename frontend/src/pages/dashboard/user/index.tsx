import { useState } from "react";
import Swap from "../../../components/user/swap";
import Shop from "../../../components/user/shop";
import classNames from "classnames";

enum ENav {
  SHOP = "SHOP",
  SWAP = "SWAP",
}

export const User = () => {
  const [navType, setNavType] = useState<ENav>(ENav.SHOP);

  return (
    <>
      <div className="flex flex-col px-20 pt-[64px]">
        <div className="border-solid border-b-[1px] border-[#FFFFFF33] flex gap-[20px]  justify-start items-start">
          <button
            className={classNames(
              "text-[14px] font-semibold leading-[20px] text-[#dbd2ef] cursor-pointer px-[4x] pb-[12px]",
              {
                "border-solid border-b-2": navType === ENav.SHOP,
              },
            )}
            onClick={() => setNavType(ENav.SHOP)}
          >
            Shop
          </button>
          <button
            className={classNames(
              "text-[14px] font-semibold leading-[20px] text-[#dbd2ef] cursor-pointer px-[4x] pb-[12px]",
              {
                "border-solid border-b-2": navType === ENav.SWAP,
              },
            )}
            onClick={() => setNavType(ENav.SWAP)}
          >
            Swap
          </button>
        </div>
      </div>
      <div>{navType === ENav.SHOP ? <Shop /> : <Swap />}</div>
    </>
  );
};
export default User;
