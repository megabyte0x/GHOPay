import { getDefaultConfig } from "connectkit";
import { createConfig  } from "wagmi";
import { env } from "./envVars";

export const createWalletConfig = () => createConfig(
  getDefaultConfig({
    walletConnectProjectId: env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,

    // Required
    appName: "GHOPay",

    // Optional
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);
