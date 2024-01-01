'use client';
import React from 'react';
import { MetaMaskProvider } from '@metamask/sdk-react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {children}
    </MetaMaskProvider>
  );
}
