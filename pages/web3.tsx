import { createConfig, http, useReadContract, useWriteContract, useWatchContractEvent } from "wagmi";
import { goerli, mainnet, sepolia, polygon, hardhat } from "wagmi/chains";
import { WagmiWeb3ConfigProvider, MetaMask, Goerli, Sepolia, Hardhat, WalletConnect, Polygon } from "@ant-design/web3-wagmi";
import { Address, NFTCard, Connector, ConnectButton, useAccount, useProvider } from "@ant-design/web3";
import { injected, walletConnect } from "wagmi/connectors";
import { Button, message } from 'antd'
import { parseEther } from 'viem'


const config = createConfig({
  chains: [mainnet, polygon, hardhat],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [hardhat.id]: http("http://127.0.0.1:8545"),
    // [sepolia.id]: http(),
    // [mainnet.id]: http("https://eth-mainnet.g.alchemy.com/v2/4fjyGSbuZ7RgldDMpvSKmlv9cUAziQFm")
  },
  connectors: [
    injected({
      target: 'metaMask' as any
    }),
    // walletConnect({
    //   // 去官方申请自己的应用ID
    //   //  https://cloud.walletconnect.com/
    //   projectId: 'c07c0051c2055890eade3556618e38a6',
    //   showQrModal: true
    // })
  ]

})

const contractInfo = [
  {
    id: 1,
    name: "Ethereum",
    contractAddress: "0xEcd0D12E21805803f70de03B72B1C162dB0898d9",
  },
  {
    id: 137,
    name: "Polygon",
    contractAddress: "0x418325c3979b7f8a17678ec2463a74355bdbe72c",
  },
  {
    id: hardhat.id,
    name: "Hardhat",
    contractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  }
]

const CallTest = () => {
  const { account } = useAccount()
  console.log("account: ", account)
  const { chain } = useProvider()

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
    // address: '0xc2b965B02ee38157E99c88c917C5F816D9d97292',
    address: contractInfo.find(e => e.id === chain?.id)?.contractAddress as `0x${string}`,
    functionName: 'balanceOf',
    args: [account?.address as `0x${string}`],
    // args: [`0xEcd0D12E21805803f70de03B72B1C162dB0898d9` as `0x${string}`],
  })
  console.log('result: ', result)

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
      // address: "0xEcd0D12E21805803f70de03B72B1C162dB0898d9",
      // address: "0xc2b965B02ee38157E99c88c917C5F816D9d97292",
      address: contractInfo.find(e => e.id === chain?.id)?.contractAddress as `0x${string}`,
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

  // useWatchContractEvent({
  //   address: '0xEcd0D12E21805803f70de03B72B1C162dB0898d9',
  //   abi: [
  //     {
  //       anonymous: false,
  //       inputs: [
  //         {
  //           indexed: false,
  //           internalType: "address",
  //           name: "minter",
  //           type: "address",
  //         },
  //         {
  //           indexed: false,
  //           internalType: "uint256",
  //           name: "amount",
  //           type: "uint256",
  //         },
  //       ],
  //       name: "Minted",
  //       type: "event",
  //     },
  //   ],
  //   eventName: "Minted",
  //   onLogs() {
  //     message.success("new minted!");
  //   },
  // })

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
  // return <WagmiWeb3ConfigProvider config={ config } wallets={ [MetaMask(), WalletConnect()] } chains={[Polygon, Hardhat]}>
  return <WagmiWeb3ConfigProvider config={ config } wallets={ [MetaMask()] } chains={[Polygon, Hardhat]}>
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