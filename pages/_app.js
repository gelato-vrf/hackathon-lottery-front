import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import "../styles/animations.css";

// import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
// import { configureChains, createClient, useAccount, WagmiConfig } from "wagmi";
// import {
//   mainnet,
//   // polygon,
//   // optimism,
//   // arbitrum,
//   goerli,
//   // polygonMumbai,
//   // optimismGoerli,
//   // arbitrumGoerli,
//   // polygonZkEvm,
//   // polygonZkEvmTestnet,
// } from "wagmi/chains";
// import { alchemyProvider } from "wagmi/providers/alchemy";
// import { publicProvider } from "wagmi/providers/public";
import MainLayout from "../layout/mainLayout";
import Providers from "../providers";
// import { useRouter } from "next/router";
// import "degen/styles";

// const { chains, provider } = configureChains(
//   [
//     mainnet,
//     goerli,
//     // polygon,
//     // polygonMumbai,
//     // optimism,
//     // optimismGoerli,
//     // arbitrum,
//     // arbitrumGoerli,
//     // polygonZkEvm,
//     // polygonZkEvmTestnet,
//   ],
//   [alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY }), publicProvider()]
// );

// const { connectors } = getDefaultWallets({
//   appName: "My Alchemy DApp",
//   chains,
// });

// const wagmiClient = createClient({
//   autoConnect: true,
//   connectors,
//   provider,
// });

// export { WagmiConfig, RainbowKitProvider };

function MyApp({ Component, pageProps }) {
  // const router = useRouter();
  // const account = useAccount({
  //   onConnect({ address, connector, isReconnected }) {
  //     // if (!isReconnected) router.reload();
  //   },
  // });
  return (
    <Providers>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Providers>
  );
}

export default MyApp;
