import { CaretRight, CheckCircle, Clock } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { OnboardingStepButtonProps } from "./OnboardingStepButton.types";

export function OnboardingStepButton(props: OnboardingStepButtonProps) {
  if (props.isCompleted) {
    return (
      <div className="flex items-center justify-between gap-3 p-2.5 text-sm rounded cursor-default bg-green-100 transition-all">
        <div className="flex items-center gap-2">
          <CheckCircle size={20} className="text-green-500" weight="bold" />

          <div className="flex flex-col items-start gap-0.5">
            <span className="font-medium">{props.title}</span>
            <span className="text-xs font-normal leading-none">{props.description}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Link
      href={props.link}
      className="flex items-center justify-between gap-3 p-2.5 text-sm rounded hover:bg-gray-100 transition-all"
    >
      <div className="flex items-center gap-2">
        <Clock size={20} className="text-gray-500" weight="bold" />

        <div className="flex flex-col items-start gap-0.5">
          <span className="font-medium">{props.title}</span>
          <span className="text-xs font-normal leading-none">{props.description}</span>
        </div>
      </div>

      <CaretRight size={18} weight="bold" />
    </Link>
  )
}