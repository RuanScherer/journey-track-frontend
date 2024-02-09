export interface StepperProps {
  showDots?: boolean;
  steps: {
    id: string;
    label: string;
    active?: boolean;
  }[]
}