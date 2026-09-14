export interface IFeedbackForm {
  topic: string
  desc: string
  email: string
}

export type TSteps = 'is-helpful' | 'form' | 'submitted';
