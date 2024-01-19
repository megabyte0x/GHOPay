import { createPublicClient, createWalletClient, http } from "viem";
import { sepolia } from "wagmi";

const clientConfig = {
  chain: sepolia,
  transport: http(),
};

const publicClient = createPublicClient(clientConfig);

const walletClient = createWalletClient(clientConfig);

export { publicClient, walletClient };
