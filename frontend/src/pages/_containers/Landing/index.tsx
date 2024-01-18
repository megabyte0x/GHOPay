import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import FeatureSection from "./FeatureSection";
import Partnered from "./Partnered";
import Team from "./Team";
import { Footer } from "@/pages/_components";

const LandingPage = () => {
  return (
    <div className="bg-[#14141B] pt-[64px] flex flex-col items-center justify-center md:px-20 px-6">
      <Hero />
      <HowItWorks />
      <FeatureSection />
      <Partnered />
      <Team />
      <Footer />
    </div>
  );
};

export default LandingPage;
