import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, mainnet, goerli, createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { Environment } from "@utils/types";

const environment = process.env.NODE_ENV;

const getAllowedChains = () => {
  const chains =
    environment === Environment.Development ? [goerli] : [mainnet, goerli];

  return chains;
};

const { chains, provider } = configureChains(getAllowedChains(), [
  alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID as string }),
  publicProvider(),
]);

const { connectors } = getDefaultWallets({
  appName: "Non Fungible Arcade",
  chains,
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID as string,
});

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export { chains, client };
