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

  protected loadContract(contractAddress: string, abi: any) {
    return new ethers.Contract(contractAddress, abi, this.wallet);
  }
}
class KicketNFT extends Kicket {
  private contract;
  constructor() {
    super();
    this.contract = this.loadContract(CONTRACT_ADDRESS.NFT, nftABI);
  }
  async mintNFT(address: string, metaDataURI: string) {
    console.log("address", address);
    const mint = await this.contract.mintNftTo(address, metaDataURI);
    const tx = await mint.wait();
    console.log(tx);
    return tx;
  }
  verifyNFT() {}
  generateMetadata(name: string, description: string): metaDataType {
    return {
      description,
      external_url: "https://openseacreatures.io/3",
      image:
        "https://raw.githubusercontent.com/llamas-laptrinh/kicket/main/web/public/ticket.png",
      name,
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
