export function formatWalletAddress(walletAddress: string): string {
  const formattedAddress = walletAddress.match(/.{1,4}/g)?.join(' ') || '';

  return formattedAddress;
}

export const shorterAddress = (walletAddress: string) => {
  return `${walletAddress.slice(0, 5)}...${walletAddress.slice(
    walletAddress.length - 5,
    walletAddress.length - 1
  )}`;
};
