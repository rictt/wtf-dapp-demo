import React, { useEffect } from "react";
import { ConnectButton, Connector, useAccount } from "@ant-design/web3";
import { useSignMessage } from "wagmi";
import { Button, message, Space } from "antd";

const SignDemo: React.FC = () => {
  const { signMessageAsync } = useSignMessage()
  const { account } = useAccount()

  const checkSignature = async (params: { address?: string, signature: string }) => {
    const response = await fetch('/api/signatureCheck', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params)
    })
    const result = await response.json();
    console.log("result: ", result)
  }

  const doSignature = async () => {
    try {
      const signature = await signMessageAsync({
        message: 'test message for demo'
      })
      console.log('signature: ', signature)
      await checkSignature({
        address: account?.address,
        signature
      })
      message.success(`sign result: `, signature as any)
    } catch (error: any) {
      message.error(`Signature failed: ${error?.message}`)
    }
  }

  return (
    <Space>
      <Connector>
        <ConnectButton />
      </Connector>
      <Button disabled={!account?.address} onClick={doSignature}>Sign message</Button>
    </Space>
  );
};

export default SignDemo;