'use client';
import { Card, Carousel, Flowbite, useTheme, Badge } from 'flowbite-react';
import { products } from '@wix/stores';
import { PLACEHOLDER_IMAGE } from '@app/constants';
import { WixMediaImage } from '@app/components/Image/WixMediaImage';
export function ImageGalleryClient({
  items,
  product,
}: {
  items: products.MediaItem[];
  product: any;
}) {
  const { theme } = useTheme();
  const images = items.length ? items : [{ image: { url: PLACEHOLDER_IMAGE } }];
  return (
    <div className="h-56 sm:h-96 max-h-96 max-w-xl mx-auto">
      <Flowbite
        theme={{
          theme: {
            carousel: {
              scrollContainer: {
                ...theme.carousel.scrollContainer,
                base: theme.carousel.scrollContainer.base + ' rounded-none',
              },
            },
          },
        }}
      >
        <Carousel slide={false}>
          {images.map((media, index) => (
            <WixMediaImage
              key={index}
              media={media.image?.url || ''}
              alt={media.image?.altText ?? ''}
              width={600}
              height={400}
            />
          ))}
        </Carousel>
        <section className="mt-4">
          <h2 className="my-2">Description</h2>
          <p> {product.description}</p>
        </section>
        <section className="mt-4">
          <h2 className="my-2">Attributes</h2>
          <hgroup className="hide-scrollbar flex w-full flex-wrap overflow-y-auto h-full pb-4">
            {product.traits.map((attribute: any) => {
              return (
                <Card className="my-2 mr-2" key={attribute.type}>
                  <div className="flex flex-col gap-y-1">
                    <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                      {attribute.type}
                    </h5>
                    <p className="text-xs font-normal text-gray-700 dark:text-gray-400">
                      {attribute.name}
                    </p>
                    {/* <Badge color="gray">0.01%</Badge> */}
                  </div>
                </Card>
              );
            })}
          </hgroup>
        </section>
      </Flowbite>
    </div>
  );
}
