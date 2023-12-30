import { ethers } from "hardhat";
import { NFTMarketplace } from "../typechain-types";
const marketAddress = "0xC45f83120F848D047f94cC1883DA95F78fde867d";
describe("Marketplace", () => {
  let marketplace: NFTMarketplace;

  it("get Contact", async () => {
    const [signer] = await ethers.getSigners();
    marketplace = await ethers.getContractAt(
      "NFTMarketplace",
      marketAddress,
      signer
    );
  });
  it("get all NFTs", async () => {
    const tx = await marketplace.getAllNFTs();
    console.log(tx);
  });
  it("mint NFT", async () => {
    const price = ethers.parseUnits("0.0001", "ether");
    const tx = await marketplace.createToken(
      "https://lavender-cautious-ant-106.mypinata.cloud/ipfs/QmdKpwfWYmkZVBEiCDSSgXZwRAXWvaWnzawZzxAfWcEqid?pinataGatewayToken=hmcS97lnQbaQI8TIiAmLLpF7cRxrPDWW2N1KsMTqsE5SsKdG74eyTqqBKk4wTfME",
      price,
      { gasLimit: 40000000, value: ethers.parseUnits("0.01", "ether") }
    );
    await tx.wait();
  });
  it("get my NFTs", async () => {
    const tx = await marketplace.getMyNFTs();
    console.log(tx);
  });
});
