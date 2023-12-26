'use client';
import { Card, Carousel, Flowbite, useTheme, Badge } from 'flowbite-react';
import { products } from '@wix/stores';
import { PLACEHOLDER_IMAGE } from '@app/constants';
import { WixMediaImage } from '@app/components/Image/WixMediaImage';
export function ImageGalleryClient({ items }: { items: products.MediaItem[] }) {
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
          <p>By DeLabs 10,000 of the most degenerate gods in the universe.</p>
          <p>By DeLabs 10,000 of the most degenerate gods in the universe.</p>
        </section>
        <section className="mt-4">
          <h2 className="my-2">Attributes</h2>
          <hgroup className="hide-scrollbar flex w-full flex-wrap overflow-y-auto h-full pb-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((attribute) => {
              return (
                <Card className="my-2 mr-2" key={attribute}>
                  <div className="flex flex-col gap-y-1">
                    <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                      Generation
                    </h5>
                    <p className="text-xs font-normal text-gray-700 dark:text-gray-400">
                      default
                    </p>
                    <Badge color="gray">0.01%</Badge>
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
