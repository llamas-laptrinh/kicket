import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    mainnet: {
      url: "https://rpc.tomochain.com",
      accounts: [process.env.PRIVATE_KEY || ""],
    },
    testnet: {
      url: "https://rpc.testnet.tomochain.com",
      accounts: [process.env.PRIVATE_KEY || ""],
    },
  },
  defaultNetwork: "testnet",
};

export default config;
