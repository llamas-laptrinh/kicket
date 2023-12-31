import { ethers } from "hardhat";
import { NFTMarketplace } from "../typechain-types";
import { expect } from "chai";

const marketAddress = "0x838591F33023F5719F740458a499DD6B33af8B66";
describe("Marketplace", () => {
  let marketplace: NFTMarketplace;
  let tokenId: any;
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
    const tx = await marketplace.createToken(
      "https://lavender-cautious-ant-106.mypinata.cloud/ipfs/QmdKpwfWYmkZVBEiCDSSgXZwRAXWvaWnzawZzxAfWcEqid?pinataGatewayToken=hmcS97lnQbaQI8TIiAmLLpF7cRxrPDWW2N1KsMTqsE5SsKdG74eyTqqBKk4wTfME",
      {
        gasLimit: 40000000,
      }
    );

    const id = await tx.wait();

    console.log("logs", id?.logs[1].toJSON().args[0]);

    tokenId = 2;
  });

  it("list NFT", async () => {
    const price = ethers.parseUnits("0.0001", "ether");
    const tx = await marketplace.listToken(tokenId, price, {
      gasLimit: 40000000,
      value: ethers.parseUnits("0.01", "ether"),
    });
    const res = await tx.wait();
  });
  it("get all NFTs", async () => {
    const tx = await marketplace.getAllNFTs();
    console.log(tx);
  });
  it("get my NFTs after mint", async () => {
    const tx = await marketplace.getMyNFTs();
    console.log(tx);
  });

  it("unlist NFT", async () => {
    const tx = await marketplace.unListToken(tokenId, {
      gasLimit: 40000000,
      value: ethers.parseUnits("0.01", "ether"),
    });
    const res = await tx.wait();
    console.log(res);
  });
});
