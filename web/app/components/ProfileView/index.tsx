'use client';
import React from 'react';

import ProfileHeader from './ProfileHeader';
import Filter from './Filter';
import Empty from '../Empty';

import Image from 'next/image';
import { BsThreeDots } from 'react-icons/bs';
import ListModal from './ListModal';
import NftFactory from '@app/utils/contract/nft';
import { getProvier } from '@app/utils/contract/getProvider';
import { Label, TextInput, Select } from 'flowbite-react';
import { toast } from 'react-toastify';

const getMyNFTs = async () => {
  const { signer } = await getProvier();
  if (signer) {
    const nftFactory = new NftFactory(signer);
    const nfts = await nftFactory.getAllMyNfts();

    return { nfts, nftFactory };
  }
};
type ProfileViewProps = { address: string };
export default function ProfileView({ address }: ProfileViewProps) {
  const [duration, setDuration] = React.useState<Date>(new Date());
  const [amount, setAmount] = React.useState<string>('');
  const [tokenId, setTokenId] = React.useState<number>(0);
  const [isReady, setReady] = React.useState(false);

  const [factoryInstance, setFactoryInstance] = React.useState<NftFactory>();

  const onChangeText = (e: any) => {
    const value = e.target.value;
    if (value > 0 || value !== '') {
      setReady(true);
    } else {
      setReady(false);
    }
    setAmount(value);
  };

  const [myNfts, setMyNfts] = React.useState<any[]>([]);
  const [isShow, setShow] = React.useState(false);
  const onToggleModal = () => {
    setShow((isShow) => !isShow);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const form = e.currentTarget;
    // const formElements: any = form.elements as typeof form.elements;
    // const amount = formElements[0].value;
    // const duration = formElements[2].value;
    // console.log(amount, duration);
    await handleListNft();
    setShow(false);
  };

  const handleListNft = async () => {
    try {
      await factoryInstance?.listToSale(
        tokenId,
        Number(amount),
        duration.getTime()
      );
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  React.useEffect(() => {
    getMyNFTs().then((data) => {
      setMyNfts(data?.nfts || []);
      setFactoryInstance(data?.nftFactory);
    });
  }, []);

  return (
    <>
      <ListModal isShow={isShow} onCloseModal={onToggleModal}>
        <form onSubmit={onSubmit}>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Quick List
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="amount" value="Set a price *" />
              </div>
              <TextInput
                className="appearance-none forced-colors:appearance-auto"
                key="amount"
                autoFocus
                type="number"
                id="amount"
                placeholder="amount"
                required
                onBlur={onChangeText}
                // onChange={onChangeText}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="duration" value="Duration" />
              </div>
              <div className="flex gap-2">
                <Select
                  onChange={(e) => {
                    const value = e.target.value;
                    const date = new Date();
                    date.setHours(date.getHours() + Number(value));
                    setDuration(date);
                  }}
                  className="basis-1/3"
                >
                  {[
                    { id: '1', key: '1 hour', value: 1 },
                    { id: '2', key: '6 hour', value: 6 },
                    { id: '3', key: '3 days', value: 72 },
                    { id: '4', key: '1 month', value: 24 * 30 },
                  ].map(({ id, value, key }) => {
                    return (
                      <option key={id} value={value}>
                        {key}
                      </option>
                    );
                  })}
                </Select>
                <TextInput
                  className="basis-2/3"
                  id="duration"
                  type="datetime-local"
                  value={duration
                    .toISOString()
                    .slice(-duration.toISOString().length, -8)}
                  readOnly
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 justify-between">
              <div className="flex items-center gap-2">
                <h3 className="flex-1">Listing price</h3>
                <p>{amount ? amount : '--'} VIC</p>
              </div>

              <div className="flex items-center gap-2">
                <h3 className="flex-1">fee</h3>
                <p>2.0%</p>
              </div>

              <div className="flex items-center gap-2">
                <h3 className="flex-1 font-bold">Total potential earnings</h3>
                <p>
                  {amount ? Number(amount) - (Number(amount) * 2) / 100 : '--'}{' '}
                  VIC
                </p>
              </div>
            </div>
            <div>
              <button
                disabled={!isReady}
                className="disabled:opacity-75 w-full bg-rose-500 px-4 py-2 text-white text-center"
                type="submit"
              >
                Complete Listing
              </button>
            </div>
          </div>
        </form>
      </ListModal>
      <ProfileHeader address={address} />
      <Filter />
      <div className="content p-4">
        <h2>{myNfts.length} items</h2>
        <section className="my-4 border rounded p-2">
          {myNfts.length > 0 ? (
            <div className="flex gap-4 flex-wrap lg:justify-start justify-center ">
              {myNfts.map((nft) => {
                return (
                  <div
                    className="border rounded-lg pt-2 text-white bg-black"
                    key={nft.id}
                  >
                    <div className="px-2 image-container max-w-full max-h-full w-full h-48 lg:w-48">
                      <Image
                        className="w-full h-full object-contain transition hover:scale-125"
                        width={300}
                        height={200}
                        src={nft.media.url}
                        alt={nft.media.altText}
                      />
                    </div>
                    <article className="info px-2 my-2 text-pretty">
                      <h3>{nft.name}</h3>
                      <h3>{nft.collectionId}</h3>
                    </article>
                    <div className="flex rounded-b-lg mt-2 gap-4 bg-rose-500 px-4 py-2">
                      <button
                        disabled={nft.currentlyListed}
                        onClick={() => {
                          onToggleModal();
                          setTokenId(nft.id);
                        }}
                        className="w-full flex-1 border-r-2 disabled:opacity-40"
                      >
                        List for Sale
                      </button>
                      <button className="hover:opacity-70">
                        <BsThreeDots className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <Empty />
          )}
        </section>
      </div>
    </>
  );
}
