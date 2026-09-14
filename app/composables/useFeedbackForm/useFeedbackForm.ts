import type { TSteps } from './types';
import { setFeedbackForm } from './model';

export const useFeedbackForm = (pageName?: string) => {
  const { $request } = useNuxtApp();

  const loading = ref(false);

  const step = ref<TSteps>('is-helpful');

  const feedbackForm = ref(setFeedbackForm({ topic: `Useless article ( ${pageName} )` }));
  const isFormInvalid = ref(false);

  const setStep = (value: TSteps) => {
    step.value = value;
  };

  const postForm = async () => {
    if (loading.value) return;
    loading.value = true;

    const { error } = await $request('/api/site/contact/', {
      method: 'POST',
      body: feedbackForm.value,
    });

    loading.value = false;

    if (error) return;

    setStep('submitted');
  };

  const submitForm = async () => {
    isFormInvalid.value = !feedbackForm.value.desc;
    if (isFormInvalid.value) return;
    await postForm();
    if (step.value === 'submitted') {
      feedbackForm.value = setFeedbackForm({ topic: pageName });
    }
  };

  return {
    step,
    isFormInvalid,
    setStep,
    feedbackForm,
    submitForm,
  };
};
