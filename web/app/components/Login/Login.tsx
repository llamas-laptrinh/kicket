'use client';
import { useWixClient } from '@app/hooks/useWixClient';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import { WIX_REFRESH_TOKEN } from '@app/constants';
import { useUI } from '@app/components/Provider/context';
import { Button } from 'flowbite-react';
import { IoMdWallet } from 'react-icons/io';
import { useSDK } from '@metamask/sdk-react';
import React from 'react';
import { shorterAddress } from '@app/utils/addrress-formatter';

const LoginComp = () => {
  const { openModalLogin } = useUI();
  // const wixClient = useWixClient();
  // const isLoggedIn = wixClient.auth.loggedIn();
  // const onLoginClick = async () => {
  //   if (isLoggedIn) {
  //     Cookies.remove(WIX_REFRESH_TOKEN);
  //     const { logoutUrl } = await wixClient.auth.logout(window.location.href);
  //     window.location.href = logoutUrl;
  //     return;
  //   }

  // openModalLogin();
  // };

  const [account, setAccount] = React.useState<string>('');
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  const connect = async () => {
    try {
      const accounts: any = await sdk?.connect();
      setAccount(accounts?.[0]);
    } catch (err) {
      console.warn(`failed to connect..`, err);
    }
  };

  React.useEffect(() => {
    if (connected) {
      sdk?.connect().then((accounts: any) => {
        setAccount(accounts?.[0]);
      });
    }
  }, [connected, sdk]);

  return (
    <Button onClick={connect} color="gray" outline>
      <IoMdWallet className="mr-2 h-5 w-5" />
      {connected ? shorterAddress(account) : 'Connect'}
    </Button>
    // <button onClick={onLoginClick} className="flex relative">
    //   {isLoggedIn ? 'Disconnect' : 'Connect'}
    // </button>
  );
};

export const Login = dynamic(() => Promise.resolve(LoginComp), {
  ssr: false,
});
