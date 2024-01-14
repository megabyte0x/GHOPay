'use client';

import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { WagmiConfig, createConfig } from 'wagmi';
import { ConnectKitButton, ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { useEffect, useState } from 'react';
import {createWalletConfig} from '@/utils/createWalletConfig';



function App({ Component, pageProps }: AppProps) {
  // setup to avoid hydration mismatch
  const [client, setClient] = useState<boolean>(false)
  useEffect(() => {
    setClient(true)
  }, []);
  
  return <WagmiConfig config={createWalletConfig()}>
      <ConnectKitProvider>
      {client && (
        <>
          <Component {...pageProps} />
          <ConnectKitButton />
        </>
      )}
      </ConnectKitProvider>
    </WagmiConfig>
}

export default App;
