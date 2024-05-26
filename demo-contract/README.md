# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```

# 本地开发和调试
```shell
# 编译合约
npx hardhat compile 
# 测试
npx hardhat test
# 本地启动一个用于调试的测试网络
npx hardhat node
# 启动调试网络后，可以将合约部署到本地节点上
npx hard igition deploy ./ignition/modules/Lock.ts --network localhost
```