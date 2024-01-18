import Partner from "./partner/home";
import User from "./user";

const Dapp = () => {
  const isPartner = false;
  return <>{isPartner ? <Partner /> : <User />}</>;
};

export default Dapp;
