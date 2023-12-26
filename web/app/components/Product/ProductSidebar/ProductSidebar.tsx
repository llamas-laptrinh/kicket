'use client';
import { Accordion, Avatar, Card, Flowbite } from 'flowbite-react';
import { FC, useEffect, useMemo, useState } from 'react';
import { HiArrowDown } from 'react-icons/hi';
import { products } from '@wix/stores';
// import { ProductOptions } from '@app/components/Product/ProductOptions/ProductOptions';
// import { selectDefaultOptionFromProduct } from '@app/components/Product/ProductOptions/helpers';
import { ProductTag } from '@app/components/Product/ProductTag/ProductTag';
import { formatPrice } from '@app/utils/price-formatter';
import { useUI } from '@app/components/Provider/context';
import { useAddItemToCart } from '@app/hooks/useAddItemToCart';
import testIds from '@app/utils/test-ids';
import { BackInStockFormModal } from '@app/components/BackInStockFormModal/BackInStockFormModal';
import { STORES_APP_ID } from '@app/constants';
import ProductOwner from '../ProductOwner';
import ProductSaleCountdown from '../ProductSaleCountdown';
import ProductPriceHistory from '../ProducPriceHistory';
import { AVATAR_URL } from '@app/common';
import Image from 'next/image';

interface ProductSidebarProps {
  product: products.Product;
  className?: string;
}

const createProductOptions = (
  selectedOptions?: any,
  selectedVariant?: products.Variant
) =>
  Object.keys(selectedOptions ?? {}).length
    ? {
        options: selectedVariant?._id
          ? { variantId: selectedVariant!._id }
          : { options: selectedOptions },
      }
    : undefined;

export const ProductSidebar: FC<ProductSidebarProps> = ({ product }) => {
  const addItem = useAddItemToCart();
  const { openSidebar, openModalBackInStock } = useUI();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedVariant, setSelectedVariant] = useState<products.Variant>({});
  const [selectedOptions, setSelectedOptions] = useState<any>({});

  const price = formatPrice({
    amount: selectedVariant?.variant?.priceData?.price || product.price!.price!,
    currencyCode: product.price!.currency!,
  });

  const usdPrice = 166;
  // useEffect(() => {
  //   if (
  //     product.manageVariants &&
  //     Object.keys(selectedOptions).length === product.productOptions?.length
  //   ) {
  //     const variant = product.variants?.find((variant) =>
  //       Object.keys(variant.choices!).every(
  //         (choice) => selectedOptions[choice] === variant.choices![choice]
  //       )
  //     );
  //     setSelectedVariant(variant!);
  //   }
  //   setQuantity(1);
  // }, [
  //   selectedOptions,
  //   product.manageVariants,
  //   product.productOptions?.length,
  //   product.variants,
  // ]);

  // useEffect(() => {
  //   selectDefaultOptionFromProduct(product, setSelectedOptions);
  // }, [product]);

  const isAvailableForPurchase = useMemo(() => {
    if (!product.manageVariants && product.stock?.inStock) {
      return true;
    }
    if (!product.manageVariants && !product.stock?.inStock) {
      return false;
    }

    return selectedVariant?.stock?.inStock;
  }, [selectedVariant, product]);

  const addToCart = async () => {
    setLoading(true);
    try {
      await addItem({
        quantity,
        catalogReference: {
          catalogItemId: product._id!,
          appId: STORES_APP_ID,
          ...createProductOptions(selectedOptions, selectedVariant),
        },
      });
      setLoading(false);
      openSidebar();
    } catch (err) {
      setLoading(false);
    }
  };

  const notifyWhenAvailable = async () => {
    openModalBackInStock();
  };

  const buyNowLink = useMemo(() => {
    const productOptions = createProductOptions(
      selectedOptions,
      selectedVariant
    );
    return `/api/quick-buy/${product._id}?quantity=${quantity}&productOptions=${
      productOptions
        ? decodeURIComponent(JSON.stringify(productOptions.options))
        : ''
    }`;
  }, [selectedOptions, selectedVariant, product._id, quantity]);

  return (
    <>
      <ProductTag
        name={product.name!}
        price={price}
        sku={product.sku ?? undefined}
      />
      <section className="mt-2">
        <ProductOwner />
      </section>

      <section className="my-2">
        <h3 className="text-sm text-gray-500">Current Price</h3>
        <p className="text-md font-semibold inline-block tracking-wide py-1">
          {price} <span className="text-gray-500">${usdPrice}</span>
        </p>
      </section>

      {/* <div className="mb-6">
        <span className="text-xs tracking-wide">Quantity</span>
        <div className="mt-2">
          <Quantity
            value={quantity}
            max={
              (selectedVariant?.stock?.trackQuantity
                ? selectedVariant?.stock?.quantity
                : product.stock?.quantity!) ?? 9999
            }
            handleChange={(e) => setQuantity(Number(e.target.value))}
            increase={() => setQuantity(1 + quantity)}
            decrease={() => setQuantity(quantity - 1)}
          />
        </div>
      </div> */}
      {isAvailableForPurchase ? (
        <div className="flex my-2">
          <button
            data-testid={testIds.PRODUCT_DETAILS.ADD_TO_CART_CTA}
            aria-label="Add to Cart"
            className="btn-main my-1 mr-2 rounded"
            type="button"
            onClick={addToCart}
            disabled={loading}
          >
            Buy Now
          </button>
          {/* <div className="w-full pt-2"> */}
          <a
            data-testid={testIds.PRODUCT_DETAILS.BUY_NOW_CTA}
            className="btn-main my-1 rounded block text-center"
            href={buyNowLink}
          >
            Place a bid
          </a>
          {/* </div> */}
        </div>
      ) : null}
      <ProductSaleCountdown />
      <ProductPriceHistory />
      {!isAvailableForPurchase ? (
        <div>
          <BackInStockFormModal
            product={product}
            variantId={selectedVariant._id}
          />
          <button
            data-testid={testIds.PRODUCT_DETAILS.ADD_TO_CART_CTA}
            aria-label="Notify When Available"
            className="btn-main w-full my-1 rounded-2xl"
            type="button"
            onClick={notifyWhenAvailable}
            disabled={loading}
          >
            Notify When Available
          </button>
        </div>
      ) : null}

      <div className="mt-6">
        <h2 className="my-2">Activity</h2>
        <hgroup className="hide-scrollbar flex flex-col w-full overflow-y-auto h-96 pb-4">
          {[1, 2, 3, 4, 5, 6, 7].map((item) => {
            return (
              <div className="mb-4" key={item}>
                <div className="flex w-full">
                  <div className="mr-4">
                    <Avatar size="md" rounded img={`${AVATAR_URL}`} />
                  </div>
                  <hgroup className="mr-8">
                    <h5 className="text-md font-bold tracking-tight text-gray-500 dark:text-white">
                      Buy now price set by{' '}
                      <span className="text-black">0x3e45...ae988</span>
                    </h5>
                    <p className="text-xs font-normal text-gray-500 dark:text-gray-400">
                      Dec 7, 2023 at 14:52 pm
                    </p>
                  </hgroup>
                  <hgroup className="flex items-center">
                    <span className="mr-4 text-end">
                      <p>2.0 VIC</p>
                      <span className="text-gray-500">$166</span>
                    </span>
                    <a href="#">
                      <Image
                        className="text-black w-5"
                        width={24}
                        height={24}
                        src="/open-outline.svg"
                        alt="open"
                      />
                    </a>
                  </hgroup>
                </div>
              </div>
            );
          })}
        </hgroup>
        {/* <Flowbite
          theme={{
            theme: {
              accordion: {
                content: { base: 'bg-transparent p-5' },
                title: {
                  heading: 'text-black',
                  arrow: {
                    base: 'text-black',
                  },
                },
              },
            },
          }}
        >
          <Accordion flush={true}>
            {product.additionalInfoSections!.map((info) => (
              <Accordion.Panel>
                <Accordion.Title>
                  <span className="text-sm">Activities</span>
                </Accordion.Title>
                <Accordion.Content></Accordion.Content>
              </Accordion.Panel>
            ))}
          </Accordion>
        </Flowbite> */}
      </div>
    </>
  );
};
