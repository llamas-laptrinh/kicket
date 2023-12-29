import { ethers } from "hardhat";
import { NFTMarketplace } from "../typechain-types";
const marketAddress = "0xC45f83120F848D047f94cC1883DA95F78fde867d";
describe("Marketplace", () => {
  let marketplace: NFTMarketplace;

  it("get Contact", async () => {
    marketplace = await ethers.getContractAt("NFTMarketplace", marketAddress);
  });
  it("get all NFTs", async () => {
    const tx = await marketplace.getAllNFTs();
    console.log(tx);
  });
  it("mint NFT", async () => {
    marketplace.createToken("", 200);
  });
  it("get my NFTs", async () => {});
});
