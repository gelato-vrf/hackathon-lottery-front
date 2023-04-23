import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, useAccount, WagmiConfig } from "wagmi";
import {
  mainnet,
  // polygon,
  // optimism,
  // arbitrum,
  goerli,
  // polygonMumbai,
  // optimismGoerli,
  // arbitrumGoerli,
  // polygonZkEvm,
  // polygonZkEvmTestnet,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { useRouter } from "next/router";
import "degen/styles";

const { chains, provider } = configureChains(
  [
    mainnet,
    goerli,
    // polygon,
    // polygonMumbai,
    // optimism,
    // optimismGoerli,
    // arbitrum,
    // arbitrumGoerli,
    // polygonZkEvm,
    // polygonZkEvmTestnet,
  ],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My Alchemy DApp",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export { WagmiConfig, RainbowKitProvider };

const Providers = ({ children }) => {
  //   const router = useRouter();
  //   const account = useAccount({
  //     onConnect({ address, connector, isReconnected }) {
  //       // if (!isReconnected) router.reload();
  //     },
  //   });
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        modalSize="compact"
        initialChain={process.env.NEXT_PUBLIC_DEFAULT_CHAIN}
        chains={chains}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Providers;
