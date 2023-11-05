import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "./contractAddress";
import userStorage from "@/app/utils/abi/userStorage.json";

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

class KicketUser extends Kicket {
  contract;
  constructor() {
    super();
    this.contract = this.loadContract(CONTRACT_ADDRESS.USERS, userStorage);
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

export { Kicket, KicketUser };
