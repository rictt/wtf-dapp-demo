import { createConfig, http, useReadContract, useWriteContract, useWatchContractEvent } from "wagmi";
import { goerli, mainnet, sepolia, polygon } from "wagmi/chains";
import { WagmiWeb3ConfigProvider, MetaMask, Goerli, Sepolia, WalletConnect, Polygon } from "@ant-design/web3-wagmi";
import { Address, NFTCard, Connector, ConnectButton, useAccount, useProvider } from "@ant-design/web3";
import { injected, walletConnect } from "wagmi/connectors";
import SendEth from "./SendEth";


const config = createConfig({
  chains: [mainnet, polygon],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
  },
  connectors: [
    injected({
      target: 'metaMask' as any
    }),
  ]

})

export default function TransactionDemo() {
  return (
    <WagmiWeb3ConfigProvider config={ config } wallets={ [MetaMask(), WalletConnect()] } chains={ [Polygon] }>
      <Connector>
        <ConnectButton></ConnectButton>
      </Connector>
      <SendEth />
    </WagmiWeb3ConfigProvider>
  )
}