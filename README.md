## 本地部署合约
```shell
# 先进行启动本地节点，启动后会得到一个rpc地址，比如http://127.0.0.1:8545/
npx hardhat node
# 部署本地合约
npx hardhat ignition deploy ./ignition/modules/MyToken.ts --network localhost
# 部署成功后会得到一个合约地址
```

接着在nextjs中导入对应的harthat容器和设置http的地址即可