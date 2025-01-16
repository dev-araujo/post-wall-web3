const getWalletColor = (walletAddress: string): string => {
  const address = walletAddress.startsWith("0x")
    ? walletAddress.substring(2)
    : walletAddress;

  const hexColor = `${address.substring(6, 12)}`;

  return hexColor;
};

const getAvatar = (walletAddress: string): string => {
  const AVATARDICEBAR = "https://api.dicebear.com/9.x/notionists/svg?seed=";

  return `${AVATARDICEBAR}${walletAddress}&backgroundColor=${getWalletColor(
    walletAddress
  )}`;
};

export default getAvatar;
