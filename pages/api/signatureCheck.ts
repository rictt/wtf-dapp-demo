import type { NextApiRequest, NextApiResponse } from "next"
import { createPublicClient, http } from "viem"
import { mainnet } from "viem/chains"


export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body = req.body;
    console.log('body: ', body)
    const valid = await publicClient.verifyMessage({
      address: body.address,
      message: "test message for demo",
      signature: body.signature,
    })
    res.status(200).json({ data: valid })
  } catch (error) {
    res.status(500).json({ error })
  }
}

// const verifyMessage = async (signerAddress, signature) => {
//   const recoveredAddress = ethers.utils.verifyMessage(
//     "test message for WTF-DApp demo",
//     signature
//   );
//   return recoveredAddress === signerAddress;
// };