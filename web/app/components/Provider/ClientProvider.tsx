'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createContext, ReactNode } from 'react';
import { ManagedUIContext } from './context';
import { createClient, OAuthStrategy } from '@wix/sdk';
import { collections, products } from '@wix/stores';
import { currentCart, backInStockNotifications } from '@wix/ecom';
import { wixEvents, checkout } from '@wix/events';
import { redirects } from '@wix/redirects';
import Cookies from 'js-cookie';
import { WIX_REFRESH_TOKEN } from '@app/constants';
const queryClient = new QueryClient();

const refreshToken = JSON.parse(Cookies.get(WIX_REFRESH_TOKEN) || '{}');

const wixClient = createClient({
  modules: {
    products,
    collections,
    currentCart,
    backInStockNotifications,
    wixEvents,
    checkout,
    redirects,
  },
  auth: OAuthStrategy({
    clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
    tokens: { refreshToken, accessToken: { value: '', expiresAt: 0 } },
  }),
});
const client = {
  products: typeof products,
  collections: typeof collections,
  currentCart: typeof currentCart,
  backInStockNotifications: typeof backInStockNotifications,
  wixEvents: typeof wixEvents,
  checkout: typeof checkout,
  redirects: typeof redirects,
  auth: {
    setTokens: async (tokens: any) => {},
    login: async ({ email, password }: any) => {},
    register: async ({
      email,
      password,
      captchaTokens: { recaptchaToken: captcha },
      profile: { nickname: username },
    }: any) => {
      return { loginState: 'SUCCESS', data: {} };
    },
    loggedIn: async () => {
      return false;
    },
    logout: (url: string) => {
      return { logoutUrl: '' };
    },
    sendPasswordResetEmail: async (email: string, host: string) => {},
    processVerification: async ({ verificationCode }: any) => {},
    captchaVisibleSiteKey: '',
  },
};

export type WixClient = typeof client;

export const WixClientContext = createContext<WixClient>(client);

export const ClientProvider = ({ children }: { children: ReactNode }) => (
  <WixClientContext.Provider value={client}>
    <ManagedUIContext>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ManagedUIContext>
  </WixClientContext.Provider>
);
