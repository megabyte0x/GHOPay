import LandingPage from "@/components/landing";

type LandingProps = {
  handleOpenDapp: () => void;
};

export const Landing = ({ handleOpenDapp }: LandingProps) => {
  return (
    <>
      <LandingPage handleOpenDapp={handleOpenDapp} />
    </>
  );
};

export default Landing;
