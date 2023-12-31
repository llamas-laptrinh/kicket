import { ethers } from "hardhat";
import { NFTMarketplace } from "../typechain-types";
import { expect } from "chai";

const metadataURL =
  "https://lavender-cautious-ant-106.mypinata.cloud/ipfs/QmQQ6RCNCDphmnP45nnfAShRz1N3EqZygEVuKMLBmtdE1E?pinataGatewayToken=hmcS97lnQbaQI8TIiAmLLpF7cRxrPDWW2N1KsMTqsE5SsKdG74eyTqqBKk4wTfME";
const marketAddress = "0x5135dAE679EFf30285719B6D016f0F6035a52F8a";
describe("Marketplace", () => {
  let marketplace: NFTMarketplace;
  let tokenId: any = 1;
  it("get Contact", async () => {
    const [signer] = await ethers.getSigners();
    marketplace = await ethers.getContractAt(
      "NFTMarketplace",
      marketAddress,
      signer
    );
    expect(marketplace).not.equal(null);
  });

  it("get my NFTs before mint", async () => {
    const tx = await marketplace.getMyNFTs();
    console.log(tx);
  });

  it("mint NFT", async () => {
    let transaction = await marketplace.createToken(metadataURL, {
      gasLimit: 3000000,
    });
    await transaction.wait();
    const tx = await marketplace.getMyNFTs();
    console.log(tx);
    expect(tx.length).greaterThan(0);
  });

  it("list NFT", async () => {
    const price = ethers.parseUnits("0.0001", "ether");
    const [signer] = await ethers.getSigners();
    const tx = await marketplace.listToken(
      tokenId,
      price,
      new Date().getTime(),
      {
        gasLimit: 3000000,
        value: ethers.parseUnits("0.01", "ether"),
        nonce: await signer.getNonce(),
      }
    );
    await tx.wait();
  });
  it("get all NFTs", async () => {
    const tx = await marketplace.getAllNFTs();
    console.log(tx);
  });

  // it("unlist NFT", async () => {
  //   const tx = await marketplace.unListToken(tokenId, {
  //     gasLimit: 40000000,
  //     value: ethers.parseUnits("0.01", "ether"),
  //   });
  //   const res = await tx.wait();
  //   console.log(res);
  // });
});
