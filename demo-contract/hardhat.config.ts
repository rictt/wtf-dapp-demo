import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    speolia: {
      url: "https://sepolia.infura.io/v3/privateKey",
      accounts: ['privateKey']
    }
  }
};

export default config;
