import { shorterAddress } from '@app/utils/addrress-formatter';
import Image from 'next/image';
import React from 'react';

type ProfileHeaderProps = {
  address: string;
};

export default function ProfileHeader({ address }: ProfileHeaderProps) {
  return (
    <section>
      <div className="image-container pb-6 relative">
        <Image
          width={1024}
          height={500}
          className="w-full h-48 object-cover"
          src="https://image.lexica.art/full_webp/04e1e3a5-95c3-49fa-88f1-6a4b29688e02"
          alt="profile banner"
        />
        <div className="avatar-container absolute left-5 -bottom-2">
          <Image
            className="rounded-full border-2 p-1"
            width={150}
            height={150}
            src="https://storage.googleapis.com/opensea-static/opensea-profile/1.png"
            alt="profile-avatar"
          />
        </div>
      </div>
      <div className="profile-info p-4">
        <h2>UserNamed</h2>
        <div className="flex gap-4 flex-wrap">
          <Image
            width={64}
            height={64}
            className="w-6 h-6"
            src="/images/viction-token.webp"
            alt="viction token"
          />
          <p>{shorterAddress(address)}</p>
          <p className="text-gray-400 hidden lg:block">Joined October 2023</p>
        </div>
      </div>
    </section>
  );
}
