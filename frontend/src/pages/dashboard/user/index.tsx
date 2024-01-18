import { useState } from "react";
import Swap from "./swap";
import Shop from "./shop";

enum ENav {
  SHOP = "shop",
  SWAP = "swap",
}

export const User = () => {
  const [navType, setNavType] = useState<ENav>(ENav.SHOP);

  return <>{navType === ENav.SHOP ? <Shop /> : <Swap />}</>;
};
export default User;
