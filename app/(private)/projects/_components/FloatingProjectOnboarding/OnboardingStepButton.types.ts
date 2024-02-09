export type OnboardingStepButtonProps = {
  isCompleted: false;
  title: string;
  description: string;
  link: string;
} | {
  isCompleted: true;
  title: string;
  description: string;
}