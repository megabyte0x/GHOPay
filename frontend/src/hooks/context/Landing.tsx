/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useState, useContext } from "react";

const LandingPageContext = createContext({
  arrivedFromLandingPage: false,
  setArrivedFromLandingPage: (value: boolean) => {},
});

export const useLandingPage = () => useContext(LandingPageContext);

type LandingPageProviderProps = {
  children: React.ReactNode;
};

export const LandingPageProvider = ({ children }: LandingPageProviderProps) => {
  const [arrivedFromLandingPage, setArrivedFromLandingPage] = useState(false);

  return (
    <LandingPageContext.Provider
      value={{ arrivedFromLandingPage, setArrivedFromLandingPage }}
    >
      {children}
    </LandingPageContext.Provider>
  );
};
