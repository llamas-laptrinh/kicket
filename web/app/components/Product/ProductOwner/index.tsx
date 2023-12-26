import { AVATAR_URL } from '@app/common';
import { shorterAddress } from '@app/utils/addrress-formatter';
import { Avatar } from 'flowbite-react';
import React from 'react';

export default function ProductOwner() {
  const shortWallet = shorterAddress(
    '0x3e45A0808D74a6Bb380A431660516559FE6ae988'
  );
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
