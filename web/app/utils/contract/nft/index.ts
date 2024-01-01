import { ethers } from 'ethers';
import axios from 'axios';
import abi from '@app/utils/contract/abi/NFTMarketplace.json';
import { mapMetaToProduct } from './mapper';

// const provider = new ethers.BrowserProvider(window.ethereum);
// const signer =  provider.getSigner();

export default class NftFactory {
  protected contract: ethers.Contract;
  constructor(signer: ethers.ContractRunner) {
    this.contract = new ethers.Contract(
      '0x22EadaAed94BF8EB79aD6fF97d961fC2a80373Ae',
      abi.abi,
      signer
    );
  }
  async mint(tokenURI: string): Promise<boolean> {
    try {
      const tx = await this.contract.createToken(tokenURI, {
        gasLimit: 3000000,
      });
      await tx.wait();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  async getAllNfts() {
    let transaction = await this.contract.getAllNFTs();
    //Fetch all the details of every NFT from the contract and display
    const items = await Promise.all(
      transaction.map(async (i: any) => {
        let tokenURI = await this.contract.tokenURI(i.tokenId);
        console.log('getting this tokenUri', tokenURI);
        // tokenURI = GetIpfsUrlFromPinata(tokenURI);
        let meta: any = await axios.get(tokenURI);
        meta = meta.data;
        console.log('meta', meta);

        return mapMetaToProduct(i, meta);
      })
    );
    return items;
  }
  async buyNFT(tokenId: string, salePrice: string) {
    let transaction = await this.contract.executeSale(tokenId, {
      value: salePrice,
    });
    return await transaction.wait();
  }
  async getNftData(tokenId: string) {}
  async getAllMyNfts() {
    const transaction = await this.contract.getMyNFTs();
    const items = await Promise.all(
      transaction.map(async (i: any) => {
        let tokenURI = await this.contract.tokenURI(i.tokenId);
        console.log('getting this tokenUri', tokenURI);
        // tokenURI = GetIpfsUrlFromPinata(tokenURI);
        let meta: any = await axios.get(tokenURI);
        meta = meta.data;
        console.log('meta', meta);

        return mapMetaToProduct(i, meta);
      })
    );
    return items;
  }
  async listToSale(tokenId: string, price: string) {}
}
