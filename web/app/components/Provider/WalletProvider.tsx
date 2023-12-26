'use client';
import React from 'react';
import { MetaMaskProvider } from '@metamask/sdk-react';

export default function WalletProvider({ children }: any) {
  return (
    <MetaMaskProvider
      debug={false}
      sdkOptions={{
        dappMetadata: {
          name: 'Kicket',
          url: typeof window !== 'undefined' ? window.location.host : '',
          iconUrl: '/favicon.ico',
        },
      }}
    >
      {children}
    </MetaMaskProvider>
  );
}
