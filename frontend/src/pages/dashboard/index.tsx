import Partner from "./partner/home";
import User from "./user";

const Dapp = () => {
  const isPartner = true;
  return <>{isPartner ? <Partner /> : <User />}</>;
};

export default Dapp;
