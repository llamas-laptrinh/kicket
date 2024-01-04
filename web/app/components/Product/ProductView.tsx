'use client';
import { getProvier } from '@app/utils/contract/getProvider';
import { ProductSidebar } from './ProductSidebar/ProductSidebar';
import { ImageGalleryClient } from '@app/components/ImageGallery/ImageGallery.client';
import NftFactory from '@app/utils/contract/nft';
import testIds from '@app/utils/test-ids';
import { products } from '@wix/stores';
import React from 'react';

const getNftDetail = async (tokenId: string) => {
  const { signer } = await getProvier();
  if (signer) {
    try {
      return await new NftFactory(signer).getNftData(Number(tokenId));
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
  return {};
};

export function ProductView({
  tokenId,
}: {
  product?: products.Product;
  tokenId: string;
}) {
  const [product, setProduct] = React.useState<products.Product>();
  React.useEffect(() => {
    getNftDetail(tokenId).then((data: any) => {
      setProduct(data);
    });
  }, [tokenId]);
  return (
    <div className="mx-auto px-14 mt-12">
      {product ? (
        <div
          className="full-w overflow-hidden max-w-7xl mx-auto"
          data-testid={testIds.PRODUCT_DETAILS.CONTAINER}
        >
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="box-border flex flex-col lg:basis-1/2">
              <div className="w-full h-full">
                <ImageGalleryClient
                  product={product}
                  items={product.media!.items!}
                />
              </div>
            </div>
            <div className="flex flex-col w-full h-full lg:basis-1/2 text-left">
              <ProductSidebar key={product._id} product={product} />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-3xl w-full text-center p-9 box-border max-w-4xl mx-auto">
          Product Not Found
        </div>
      )}
    </div>
  );
}
