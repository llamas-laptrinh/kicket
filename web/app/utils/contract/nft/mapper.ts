import { CURRENTCY_TYPE } from '@app/common';
import { ethers } from 'ethers';

const mapMetaToProduct = (item: any, meta: any) => {
  let price = ethers.formatUnits(item.price.toString(), 'ether');
  return {
    seller: item.seller,
    owner: item.owner,
    name: meta?.name,
    description: meta?.description,
    currentlyListed: item.currentlyListed,
    id: Number(item.tokenId),
    collectionId: 'cyberpunk',
    external_url: meta?.external_url,
    media: {
      items: [
        {
          title: meta?.name,
          _id: Number(item.tokenId),
          image: { url: meta?.image },
        },
      ],
      altText: meta?.name,
      url: meta?.image,
    },
    price: {
      formatted: {
        price: `${price} ${CURRENTCY_TYPE.VIC}`,
      },
      currency: CURRENTCY_TYPE.VIC,
      price: price,
    },
    traits: meta.attributes,
    logs: { activities: [], priceHistory: [] },
  };
};

export { mapMetaToProduct };
