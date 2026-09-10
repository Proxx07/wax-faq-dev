import type { IAsideNavigationItem } from '../types';
import { discord, instagram, telegram, x } from '@/assets/icons/logos';

export const ASIDE_NAVIGATION_ITEMS: IAsideNavigationItem[] = [
  {
    groupName: 'aside.gettingStarted',
    isExpanded: true,
    children: [
      {
        name: 'aside.whatIsWaxpeer',
        link: '/how-does-it-work',
      },
      {
        name: 'aside.howP2PWorks',
        link: '/p2p-system-work',
      },
    ],
  },
  {
    groupName: 'aside.buyingSelling',
    isExpanded: true,
    children: [
      {
        name: 'aside.howToSell',
        link: '/how-to-sell',
      },
      {
        name: 'aside.howToBuy',
        link: '/how-to-buy',
      },
      {
        name: 'aside.tradeLock',
        link: '/trade-lock',
      },
      {
        name: 'aside.instantSale',
        link: '/instant-sell',
      },
      {
        name: 'aside.primeTime',
        link: '/prime-time',
      },
      {
        name: 'aside.holdBalance',
        link: '/hold-balance',
      },
    ],
  },
  {
    groupName: 'aside.fees',
    children: [
      {
        name: 'aside.sellingFees',
        link: '/fees-sell',
      },
      {
        name: 'aside.depositFees',
        link: '/fees-deposit',
      },
      {
        name: 'aside.withdrawalFees',
        link: '/fees-withdraw',
      },
    ],
  },
  {
    groupName: 'aside.other',
    children: [
      {
        name: 'aside.addFunds',
        link: '/how-to-add-funds',
      },
      {
        name: 'aside.referralProgram',
        link: '/referal-programm',
      },
      {
        name: 'aside.sellerNotSending',
        link: '/seller-does-not-send-the-item',
      },
      {
        name: 'aside.contactSupport',
        link: '/contact-support',
      },
      {
        name: 'aside.accountHistory',
        link: '/history-account',
      },
      {
        name: 'aside.scammed',
        link: '/safety-wax',
      },
    ],
  },
  {
    groupName: 'aside.desktopApp',
    children: [
      {
        name: 'aside.desktopAppInfo',
        link: '/peer-desktop-app',
      },
    ],
  },
  {
    groupName: 'aside.waxpeerPay',
    children: [
      {
        name: 'aside.depositSkinsWaxpeerPay',
        link: '/how-to-deposit-skins-via-peerpay',
      },
    ],
  },
];

export const FOOTER_NAVIGATION_ITEMS: Array<{ name: string, link: string }> = [
  { name: 'blog', link: 'https://waxpeer.com/blog' },
  { name: 'api', link: 'https://docs.waxpeer.com/' },
  { name: 'extension', link: 'https://chrome.google.com/webstore/detail/waxpeer-extension-for-p2p/pmfjgkjalfcnnipmgfkeipkbehecpjbk' },
  { name: 'privacy', link: 'https://waxpeer.com/privacy' },
  { name: 'terms', link: 'https://waxpeer.com/terms' },
];

export const FOOTER_SOCIAL_LINKS: Array<{ icon: string, link: string }> = [
  { icon: discord, link: 'https://discord.gg/Z4HzgSt' },
  { icon: x, link: 'https://x.com/waxpeer' },
  { icon: instagram, link: 'https://www.instagram.com/waxpeer_com' },
  { icon: telegram, link: 'https://t.me/waxpeer' },
];
