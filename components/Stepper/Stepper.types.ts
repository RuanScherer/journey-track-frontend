export interface StepperProps {
  steps: {
    id: string;
    label: string;
    active?: boolean;
  }[]
}