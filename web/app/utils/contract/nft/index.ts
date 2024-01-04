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
      '0x5135dAE679EFf30285719B6D016f0F6035a52F8a',
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
    const items = await Promise.all(
      transaction.map(async (i: any) => {
        const tokenURI = await this.contract.tokenURI(i.tokenId);
        let meta: any = await axios.get(tokenURI);
        meta = meta.data;
        console.log('meta', meta);

        return mapMetaToProduct(i, meta);
      })
    );
    return items;
  }
  async buyNFT(tokenId: number, salePrice: number) {
    const transaction = await this.contract.executeSale(tokenId, {
      value: salePrice,
    });
    return await transaction.wait();
  }
  async getNftData(tokenId: number) {
    const tokenURI = await this.contract.tokenURI(tokenId);
    const listedToken = await this.contract.getListedTokenForId(tokenId);
    let meta = await axios.get(tokenURI);
    meta = meta.data;
    return mapMetaToProduct(listedToken, meta);
  }
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
  async listToSale(tokenId: number, price: number, endSaleTime: number) {
    const tx = await this.contract.listToken(tokenId, price, endSaleTime, {
      gasLimit: 3000000,
      value: ethers.parseUnits('0.01', 'ether'),
    });
    return tx.wait();
  }
}
