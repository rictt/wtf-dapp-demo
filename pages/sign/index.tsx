import { createConfig, http, useReadContract, useWriteContract, useWatchContractEvent } from "wagmi";
import { goerli, mainnet, sepolia, polygon } from "wagmi/chains";
import { WagmiWeb3ConfigProvider, MetaMask, Goerli, Sepolia, WalletConnect, Polygon } from "@ant-design/web3-wagmi";
import { Address, NFTCard, Connector, ConnectButton, useAccount, useProvider } from "@ant-design/web3";
import { injected, walletConnect } from "wagmi/connectors";
import { Button, message } from 'antd'
import { parseEther } from 'viem'
import SignDemo from "./components/SignDemo";


const config = createConfig({
  chains: [mainnet, polygon],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    // [sepolia.id]: http(),
    // [mainnet.id]: http("https://eth-mainnet.g.alchemy.com/v2/4fjyGSbuZ7RgldDMpvSKmlv9cUAziQFm")
  },
  connectors: [
    injected({
      target: 'metaMask' as any
    }),
    walletConnect({
      // 去官方申请自己的应用ID
      //  https://cloud.walletconnect.com/
      projectId: 'c07c0051c2055890eade3556618e38a6',
      showQrModal: true
    })
  ]

})

export default function Web3() {
  return (
    <WagmiWeb3ConfigProvider config={ config } wallets={ [MetaMask(), WalletConnect()] } chains={ [Polygon] }>
      <SignDemo />
    </WagmiWeb3ConfigProvider>
  )
}