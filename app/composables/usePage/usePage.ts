import type { PageContentElement } from './types';
import type { I18nModuleType } from '@/composables/useModuleI18n';
import {
  contactSupport,
  feesDeposit, feesSell, feesWithdraw, historyAccount, howDepositSkins,
  howItWorks, howToAddFunds, howToBuy, howToSell, p2pSystemWork, peerDesktopApp, safetyWax,
  sellerDoesntSentItem,
} from './model';

export const usePage = () => {
  const getPageContent = (page: I18nModuleType): PageContentElement[] | undefined => {
    if (page === 'how-does-it-work') return howItWorks;
    if (page === 'p2p-system-work') return p2pSystemWork;
    if (page === 'how-to-sell') return howToSell;
    if (page === 'how-to-buy') return howToBuy;
    if (page === 'fees-sell') return feesSell;
    if (page === 'fees-deposit') return feesDeposit;
    if (page === 'fees-withdraw') return feesWithdraw;
    if (page === 'how-to-add-funds') return howToAddFunds;
    if (page === 'seller-does-not-send-the-item') return sellerDoesntSentItem;
    if (page === 'contact-support') return contactSupport;
    if (page === 'history-account') return historyAccount;
    if (page === 'safety-wax') return safetyWax;
    if (page === 'peer-desktop-app') return peerDesktopApp;
    if (page === 'how-to-deposit-skins-via-peerpay') return howDepositSkins;

    if (page === 'trade-lock') return [];
    if (page === 'instant-sell') return [];
    if (page === 'prime-time') return [];
    if (page === 'hold-balance') return [];
    if (page === 'referal-programm') return [];
  };

  return {
    getPageContent,
  };
};
