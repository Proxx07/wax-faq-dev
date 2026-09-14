<script setup lang="ts">
import { dislike, like } from '@/assets/icons/actions';
import { Button } from '@/components/ui';
import { useFeedbackForm } from '@/composables/useFeedbackForm';

const props = defineProps<{
  title: string
}>();

const { step, setStep, feedbackForm, isFormInvalid, submitForm } = useFeedbackForm(props.title);
const stepTitle = computed(() => {
  if (step.value === 'submitted') return '💙 Thank you for the feedback!';
  if (step.value === 'form') return 'Sorry about that! Care to tell us more?';
  return 'Was this article helpful?';
});
</script>

<template>
  <div class="form-wrapper">
    <div class="font-18-m">
      {{ stepTitle }}
    </div>

    <div class="transition-container">
      <transition name="fade">
        <div v-if="step === 'is-helpful'" class="flex gap justify-center transition-element">
          <Button
            label="Yes"
            severity="tertiary"
            variant="outlined"
            :icon-right="like"
            @click="setStep('submitted')"
          />
          <Button
            label="No"
            severity="tertiary"
            variant="outlined"
            :icon-right="dislike"
            @click="setStep('form')"
          />
        </div>
      </transition>
      <transition name="fade">
        <form v-if="step === 'form'" class="transition-element" @submit.prevent="submitForm">
          <textarea
            v-model="feedbackForm.desc"
            placeholder="What was unhelpful? Tell us more..."
            :class="[isFormInvalid && 'error']"
            @input="isFormInvalid = Boolean(!feedbackForm.desc)"
          />

          <Button
            label="Send feedback"
            type="submit"
            severity="tertiary"
            class="align-self-start"
          />
        </form>
      </transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
.form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  align-items: center;
  width: 100%;
  max-width: 32rem;
  margin: 0 auto;
  min-height: 20rem;
  @include media-max($tablet) {
    gap: 1.6rem;
  }
}
form {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.2rem;
  textarea {
    padding: 1.6rem;
    width: 100%;
    max-width: 100%;
    border: 1px solid var(--outline);
    color: var(--on-surface);
    border-radius: var(--radius-sm);
    background: var(--surface-low-container);
    font: var(--font-16-n);
    outline: none;
    @include transition(color border-color);
    &::placeholder {
      color: var(--on-surface-secondary);
    }

    &.error {
      color: var(--error);
      border-color: var(--error);
      &::placeholder {
        color: var(--error);
      }
    }
  }
}

.transition-container {
  position: relative;
  width: 100%;
  .transition-element + .transition-element {
    position: absolute;
    top: 0;
    width: 100%;
  }
}
</style>
