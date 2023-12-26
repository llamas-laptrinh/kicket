'use client';
import React from 'react';

import ProfileHeader from './ProfileHeader';
import Filter from './Filter';
import Empty from '../Empty';

import { allNFTs } from '@app/common/NFTs';

import Image from 'next/image';
import { BsThreeDots } from 'react-icons/bs';
import ListModal from './ListModal';

export default function ProfileView() {
  const [isShow, setShow] = React.useState(false);
  const onToggleModal = () => {
    setShow((isShow) => !isShow);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formElements: any = form.elements as typeof form.elements;

    const amount = formElements[0].value;
    const duration = formElements[2].value;
    console.log(amount, duration);
  };

  return (
    <>
      <ListModal
        onSubmit={onSubmit}
        isShow={isShow}
        onCloseModal={onToggleModal}
      />
      <ProfileHeader />
      <Filter />
      <div className="content p-4">
        <h2>{allNFTs.length} items</h2>
        <section className="my-4 border rounded p-2">
          {allNFTs.length > 0 ? (
            <div className="flex gap-4">
              {allNFTs.map((nft) => {
                return (
                  <div
                    className="border rounded-lg pt-2 text-white bg-black"
                    key={nft.id}
                  >
                    <div className="px-2 image-container max-w-full max-h-full h-48 w-48">
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
                        onClick={onToggleModal}
                        className="w-full flex-1 border-r-2"
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
