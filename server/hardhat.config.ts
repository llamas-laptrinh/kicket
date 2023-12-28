import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    mainnet: {
      url: "https://rpc.tomochain.com",
      accounts: [
        process.env.PRIVATE_KEY ||
          "0666edd526c40ae29f42bd9baf9e1ca91b6b3d2018c39fa4744364b569d1dbd4",
      ],
    },
    testnet: {
      url: "https://rpc.testnet.tomochain.com",
      accounts: [
        process.env.PRIVATE_KEY ||
          "0666edd526c40ae29f42bd9baf9e1ca91b6b3d2018c39fa4744364b569d1dbd4",
      ],
    },
  },
  defaultNetwork: "testnet",
};

export default config;
