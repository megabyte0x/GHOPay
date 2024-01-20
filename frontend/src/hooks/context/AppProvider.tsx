/* eslint-disable @typescript-eslint/no-unused-vars */
import { EDashboardNavSelected } from "@/types";
import React, { createContext, useState, useContext } from "react";

const AppContext = createContext({
  arrivedFromLandingPage: false,
  setArrivedFromLandingPage: (value: boolean) => {},

  // dashboard
  navSelected: EDashboardNavSelected.SHOP,
  setNavSelected: (value: EDashboardNavSelected) => {},
});

export const useAppProvider = () => useContext(AppContext);

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [arrivedFromLandingPage, setArrivedFromLandingPage] = useState(false);
  const [navSelected, setNavSelected] = useState<EDashboardNavSelected>(
    EDashboardNavSelected.SHOP,
  );

  return (
    <AppContext.Provider
      value={{
        arrivedFromLandingPage,
        setArrivedFromLandingPage,
        navSelected,
        setNavSelected,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
