import Partner from "./partner/home";
import User from "./user";
import { useAccount } from "wagmi";

const Dapp = () => {
  const isPartner = false;
  const { isConnected } = useAccount();

  return (
    <>
      {isConnected ? (
        isPartner ? (
          <Partner />
        ) : (
          <User />
        )
      ) : (
        "Please connect wallet first"
      )}
    </>
  );
};

export default Dapp;
