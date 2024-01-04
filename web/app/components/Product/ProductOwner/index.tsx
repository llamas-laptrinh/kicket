import { AVATAR_URL } from '@app/common';
import { shorterAddress } from '@app/utils/addrress-formatter';
import { Avatar } from 'flowbite-react';
import React from 'react';

type ProductOwnerProps = {
  ownerAddress: string;
};

export default function ProductOwner({ ownerAddress }: ProductOwnerProps) {
  const shortWallet = shorterAddress(ownerAddress);
  return (
    <div className="flex flex-wrap">
      <p className="text-gray-500 hidden lg:block">Owner by</p>
      <Avatar
        className="lg:mx-4 mr-4 ml-2"
        color="warning"
        rounded
        bordered
        size="xs"
        img={`${AVATAR_URL}${shortWallet}`}
      />
      <p>{shortWallet}</p>
    </div>
  );
}
