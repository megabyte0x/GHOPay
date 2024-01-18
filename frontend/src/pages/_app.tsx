"use client";

import type { AppProps } from "next/app";
import "../styles/globals.css";
import { WagmiConfig } from "wagmi";
import { ConnectKitProvider } from "connectkit";
import { useEffect, useState } from "react";
import { createWalletConfig } from "@/utils/createWalletConfig";
import { NavBar } from "@/components";

function App({ Component, pageProps }: AppProps) {
  // setup to avoid hydration mismatch
  const [client, setClient] = useState<boolean>(false);
  useEffect(() => {
    setClient(true);
  }, []);

  const [handleOpenDapp, setHandleOpenDapp] = useState<() => void>();

  return (
    <WagmiConfig config={createWalletConfig()}>
      <ConnectKitProvider>
        {client && (
          <main className="bg-[#14141B] min-h-[100vh]">
            <NavBar setHandleOpenDapp={setHandleOpenDapp} />
            <Component {...pageProps} handleOpenDapp={handleOpenDapp} />
          </main>
        )}
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

export default App;
