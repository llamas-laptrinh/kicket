import Image from 'next/image';
import React from 'react';
import { FaArrowRight, FaImages } from 'react-icons/fa';

export default function Studio() {
  return (
    <div className="flex items-center">
      <div className="basis-1/2 px-12">
        <header className="mb-6">
          <h1>Create</h1>
        </header>

        <section className="flex items-center p-6 rounded shadow-md mb-6">
          <div className="info flex-1">
            <h3 className="font-bold mb-2">Drop a Collection</h3>
            <p>Launch your NFT collection for others to mint.</p>
          </div>
          <FaArrowRight className="w-4 h-4" />
        </section>

        <a href="studio/mint">
          <section className="flex items-center p-6 rounded shadow-md mb-6">
            <div className="info flex-1">
              <h3 className="font-bold flex gap-2 items-center mb-2">
                <FaImages /> Mint an NFT
              </h3>
              <p>Create a collection and mint NFTs directly to your wallet.</p>
            </div>
            <FaArrowRight className="w-4 h-4" />
          </section>
        </a>
        <p>
          <a className="text-blue-400" href="#">
            Learn more
          </a>{' '}
          about each section{' '}
        </p>
      </div>
      <div className="basis-1/2 h-full">
        <Image
          className="w-full h-full"
          src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
          width={500}
          height={500}
          alt="Banner"
        />
      </div>
    </div>
  );
}
