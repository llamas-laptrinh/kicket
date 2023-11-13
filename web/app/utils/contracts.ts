import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "./contractAddress";
import userStorageABI from "@/app/utils/abi/userStorage.json";
import nftABI from "@/app/utils/abi/nft.json";
import { metaDataType } from "../types/metadataType";

class Kicket {
  protected provider;
  protected wallet: ethers.Wallet;
  constructor() {
    this.provider = new ethers.JsonRpcProvider(process.env.PROVIDER_URL);
    this.wallet = new ethers.Wallet(
      process.env.PRIVATE_KEY || "",
      this.provider
    );
  }

  public loadContract(contractAddress: string, abi: any) {
    return new ethers.Contract(contractAddress, abi, this.wallet);
  }
}
class KicketNFT extends Kicket {
  contract;
  constructor() {
    super();
    this.contract = this.loadContract(CONTRACT_ADDRESS.NFT, nftABI);
  }
  async mintNFT(address: string, metaDataURI: string) {
    const mint = await this.contract.mintNFT(address, metaDataURI);
    const tx = await mint.wait();
  }
  verifyNFT() {}
  generateMetadata(): metaDataType {
    return {
      description:
        "Friendly OpenSea Creature that enjoys long swims in the ocean.",
      external_url: "https://openseacreatures.io/3",
      image:
        "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png",
      name: "Dave Starbelly",
      attributes: [],
    };
  }
}
class KicketUser extends Kicket {
  contract;
  constructor() {
    super();
    this.contract = this.loadContract(CONTRACT_ADDRESS.USERS, userStorageABI);
  }
  async createUser(address: string, userInfo: any) {
    const tx = await this.contract.addUser(address, userInfo);
    tx.wait();
    return tx;
  }
  async getUserByAddress(address: string) {
    return await this.contract.getUserByAddress(address);
  }
}

export { Kicket, KicketUser, KicketNFT };
