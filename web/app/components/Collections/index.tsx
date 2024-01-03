'use client';
import React from 'react';
import {
  Dropdown,
  Badge,
  Accordion,
  Checkbox,
  Label,
  Select,
} from 'flowbite-react';
import Image from 'next/image';
import { filterCollections, filterInfo, types } from '@app/common/filters';
import { allNFTs } from '@app/common/NFTs';
import NftFactory from '@app/utils/contract/nft';
import { getProvier } from '@app/utils/contract/getProvider';

export default function Collections({ collectionId }: any) {
  const [traits, setTraits] = React.useState<typeof types>([]);
  const [collection, setCollection] = React.useState<typeof allNFTs>([]);
  const [collectionID, setCollectionID] = React.useState<string>(collectionId);

  const loadData = React.useCallback(async () => {
    const keyTraits: any[] = [];
    const valuesTraits: any[] = [];
    const { signer } = await getProvier();
    if (!signer) return;
    const nfts = new NftFactory(signer);
    const allNFTs = await nfts.getAllMyNfts();

    const filterNftCollection = allNFTs.filter(
      (nft) => collectionID.includes(nft.collectionId) && nft.currentlyListed
    );

    filterNftCollection.forEach((nft) => {
      nft.traits.forEach((t: { type: any }) => {
        keyTraits.push(t.type);
        valuesTraits.push(t);
      });
    });
    const data: typeof types = [];
    const uniqueKeyTraits: any[] = [...new Set(keyTraits)];

    uniqueKeyTraits.forEach((key) => {
      const values: any[] = [];
      valuesTraits.forEach((v) => {
        if (key === v.type) {
          values.push(v.name);
        }
      });
      const uniqueValue = [...new Set(values)];
      data.push({ type: key, values: uniqueValue });
    });
    setTraits(data);
    setCollection(filterNftCollection);
  }, [collectionID]);

  React.useEffect(() => {
    loadData();
  }, [collectionID]);

  const onSort = (value: string) => {
    setCollection(
      [...collection].sort((a, b) => {
        if (value === 'low') {
          return a.price.price - b.price.price;
        }
        if (value === 'high') {
          return b.price.price - a.price.price;
        }
        if (value === 'listed') {
          return 0;
        }
        return 0;
      })
    );
  };

  return (
    <div className="flex">
      <div className="basis-1/5 p-4">
        <div className="flex flex-col">
          <Accordion>
            {filterInfo.map(({ name, values }) => {
              return (
                <Accordion.Panel key={name}>
                  <Accordion.Title className="p-2">{name}</Accordion.Title>
                  <Accordion.Content>
                    {values.map((value) => {
                      return (
                        <div
                          key={value}
                          className="flex items-center gap-2 mb-2"
                        >
                          <Checkbox
                            id={value}
                            defaultChecked={value == 'All'}
                          />
                          <Label htmlFor={value} className="flex">
                            {value}
                          </Label>
                        </div>
                      );
                    })}
                  </Accordion.Content>
                </Accordion.Panel>
              );
            })}
          </Accordion>
          <h2 className="my-4">Traits</h2>
          <Accordion>
            {traits.map(({ type, values }) => {
              return (
                <Accordion.Panel key={type}>
                  <Accordion.Title className="p-2 outline-none">
                    {type}
                  </Accordion.Title>
                  <Accordion.Content>
                    {values.map((value) => {
                      return (
                        <div
                          key={value}
                          className="flex items-center gap-2 mb-2"
                        >
                          <Checkbox id={value} />
                          <Label htmlFor={value} className="flex">
                            {value}
                          </Label>
                        </div>
                      );
                    })}
                  </Accordion.Content>
                </Accordion.Panel>
              );
            })}
          </Accordion>
        </div>
      </div>
      <div className="basis-4/5 p-4 w-full">
        <section className="flex border gap-4 mb-4 rounded px-4 py-2">
          <Select
            onChange={(value) => onSort(value.target.value)}
            style={{ backgroundColor: 'white' }}
            required
          >
            {filterCollections.Price.map(({ key, value }) => {
              return (
                <option key={key} value={key}>
                  {value}
                </option>
              );
            })}
          </Select>
          <Dropdown color="gray" label="Collections">
            {filterCollections.Collections.map(({ key, value }) => {
              return (
                <Dropdown.Item onClick={() => setCollectionID(key)} key={key}>
                  {value}
                </Dropdown.Item>
              );
            })}
          </Dropdown>
        </section>
        <section className="border rounded px-8 py-4">
          <div className="flex justify-start">
            <p className="mb-4">
              Results: 1 - {collection.length}
              <span className="text-gray-400">of {allNFTs.length}</span>
            </p>
          </div>
          <div className="h-[800px] overflow-y-auto hide-scrollbar">
            <div className="grid grid-cols-4 gap-4">
              {collection.map(({ id, description, name, media, price }) => {
                return (
                  <a
                    href={`/product-page/${name}`}
                    key={id}
                    className="flex flex-col max-w-sm bg-black text-white rounded"
                  >
                    <div className="flex-1 overflow-hidden">
                      <Image
                        width={500}
                        height={500}
                        className="h-48 hover:scale-110 transition object-cover"
                        src={media.url}
                        alt={media.altText}
                      />
                      <div className="flex flex-col justify-center info my-2 p-2">
                        <h5 className="text-sm font-bold tracking-tight dark:text-white">
                          {name}
                        </h5>
                        <p className="font-normal mt-4 text-xs dark:text-gray-400">
                          {description}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="flex p-2 justify-between">
                      <p className="text-sm">Fixed Price</p>
                      <Badge color="gray">{price.formatted.price}</Badge>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
