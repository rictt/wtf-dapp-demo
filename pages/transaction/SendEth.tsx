import { useProvider } from "@ant-design/web3"
import { Button, Form, FormProps, Input } from "antd"
import { parseEther } from "viem"
import { useSendTransaction, useTransaction, useWaitForTransactionReceipt } from "wagmi"

type FiledType = {
  to: `0x${string}`,
  value: string
}

export default function SendEth() {
  const { account } = useProvider()
  const { data: hash, error, isPending, sendTransaction } = useSendTransaction()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const onFinish: FormProps<FiledType>['onFinish'] = (values) => {
    console.log("Success: ", values)
    sendTransaction({ to: values.to, value: parseEther(values.value) })
  }
  const onFinishFailed: FormProps<FiledType>['onFinishFailed'] = (errorInfo) => {
    console.log("Failed: ", errorInfo)
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FiledType>
        label="to"
        name="to"
        rules={[{ required: true, message: 'Please input!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FiledType>
        label="value"
        name="value"
        rules={[{ required: true, message: 'Please input!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" disabled={!account?.address}>
          {isPending ? 'Confirming...' : 'Send'} 
        </Button>
      </Form.Item>

      {hash && <div>Transaction hash: {hash}</div>}
      {isConfirming && <div>Wait for confirmation...</div>}
      {isConfirmed && <div>Transaction confirmed.</div>}
      {error && (
        <div>Error: {(error as any)?.shortMessage || error?.message}</div>
      )}

    </Form>
  )
}