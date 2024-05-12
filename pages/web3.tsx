import { createConfig, http, useReadContract, useWriteContract, useWatchContractEvent } from "wagmi";
import { mainnet } from "wagmi/chains";
import { WagmiWeb3ConfigProvider, MetaMask } from "@ant-design/web3-wagmi";
import { Address, NFTCard, Connector, ConnectButton, useAccount } from "@ant-design/web3";
import { injected } from "wagmi/connectors";
import { Button, message } from 'antd'
import { parseEther } from 'viem'


const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http()
    // [mainnet.id]: http("https://eth-mainnet.g.alchemy.com/v2/4fjyGSbuZ7RgldDMpvSKmlv9cUAziQFm")
  },
  connectors: [
    injected({
      target: 'metaMask' as any
    })
  ]

})

const CallTest = () => {
  const { account } = useAccount()
  console.log("account: ", account)
  const result = useReadContract({
    abi: [
      {
        type: 'function',
        name: 'balanceOf',
        stateMutability: 'view',
        inputs: [{ name: 'account', type: 'address' }],
        outputs: [{ type: 'uint256' }],
      },
    ],
    address: '0xEcd0D12E21805803f70de03B72B1C162dB0898d9',
    functionName: 'balanceOf',
    args: [account?.address as `0x${string}`],
    // args: [`0xEcd0D12E21805803f70de03B72B1C162dB0898d9` as `0x${string}`],
  })

  const { writeContract } = useWriteContract()

  const mintNFT = () => {
    writeContract({
      abi: [
        {
          type: "function",
          name: "mint",
          stateMutability: "payable",
          inputs: [
            {
              internalType: "uint256",
              name: "quantity",
              type: "uint256",
            },
          ],
          outputs: [],
        },
      ],
      address: "0xEcd0D12E21805803f70de03B72B1C162dB0898d9",
      functionName: "mint",
      args: [1],
      value: parseEther("0.01"),
    }, {
      onSuccess: () => {
        message.success("Mint success")
      },
      onError: (error) => {
        console.log(error)
        message.error(error.message)
      }
    })
  }

  useWatchContractEvent({
    address: '0xEcd0D12E21805803f70de03B72B1C162dB0898d9',
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "minter",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "Minted",
        type: "event",
      },
    ],
    eventName: "Minted",
    onLogs() {
      message.success("new minted!");
    },
  })

  return (
    <div>
      <p>{ result.data?.toString() }</p>
      <Button onClick={ mintNFT }>
        mint
      </Button>
    </div>
  );
}


export default function Web3() {
  return <WagmiWeb3ConfigProvider config={ config } wallets={ [MetaMask()] }>
    <Address format address="0xEcd0D12E21805803f70de03B72B1C162dB0898d9" />
    <NFTCard
      address="0xEcd0D12E21805803f70de03B72B1C162dB0898d9"
      tokenId={ 641 }
    />
    <Connector>
      <ConnectButton></ConnectButton>
    </Connector>
    <CallTest />
  </WagmiWeb3ConfigProvider>
}