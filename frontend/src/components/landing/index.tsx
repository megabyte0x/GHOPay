import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import FeatureSection from "./FeatureSection";
import Partnered from "./Partnered";
import Team from "./Team";
import { Footer } from "@/components";

const LandingPage = () => {
  return (
    <div
      id="home-section"
      className="bg-[#14141B] pt-[96px] flex flex-col items-center justify-center md:px-20 px-6"
    >
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
