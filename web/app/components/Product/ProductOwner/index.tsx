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
    <div className="flex">
      <p className="text-gray-500">Owner by</p>
      <Avatar
        className="mx-4"
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
