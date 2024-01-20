"use client";

import type { AppProps } from "next/app";
import "../styles/globals.css";
import { WagmiConfig } from "wagmi";
import { ConnectKitProvider } from "connectkit";
import { useEffect, useState } from "react";
import { createWalletConfig } from "@/utils/createWalletConfig";
import { NavBar } from "@/components";
import { AppProvider } from "@/hooks/context/AppProvider";

function App({ Component, pageProps }: AppProps) {
  // setup to avoid hydration mismatch
  const [client, setClient] = useState<boolean>(false);
  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <WagmiConfig config={createWalletConfig()}>
      <ConnectKitProvider>
        {client && (
          <AppProvider>
            <main className="bg-[#14141B] min-h-[100vh]">
              <NavBar />
              <Component {...pageProps} />
            </main>
          </AppProvider>
        )}
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

export default App;
