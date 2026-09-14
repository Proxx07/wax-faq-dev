import type { IFeedbackForm } from '../types';

export const setFeedbackForm = (value?: Partial<IFeedbackForm>): Required<IFeedbackForm> => {
  return {
    topic: value?.topic || '',
    desc: value?.desc || '',
    email: value?.email || '',
  };
};
