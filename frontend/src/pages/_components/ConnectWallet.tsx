'use client';

import { ConnectKitButton } from "connectkit";

const ConnectWallet = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, hide, address, ensName, chain }) => {
        return (
          <button onClick={show}>
            {isConnected ? address : "Custom Connect"}
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};

export const Buttons = {
    "ConnectWallet": ConnectWallet
}