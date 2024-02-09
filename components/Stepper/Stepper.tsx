"use client"

import { CaretRight } from "@phosphor-icons/react";
import { StepperProps } from "./Stepper.types";

export function Stepper({ showDots = true, ...props }: StepperProps) {
  return (
    <div className="flex items-center gap-1">
      {props.steps.map((step, index) => {
        const isLastStep = index === props.steps.length - 1
        let stepElement = (
          <div className="flex items-center gap-1 text-sm text-neutral-400">
            {showDots &&
              <div className="bg-neutral-200 rounded-full w-5 h-5 flex items-center justify-center text-xs leading-none">
                {index + 1}
              </div>
            }
            {step.label}
          </div>
        )

        if (step.active) {
          stepElement = (
            <div className="flex items-center gap-1 text-sm text-primary-400 font-medium">
              {showDots &&
                <div className="bg-primary-400 rounded-full w-5 h-5 flex items-center justify-center text-xs leading-none text-neutral-50">
                  {index + 1}
                </div>
              }
              {step.label}
            </div>
          )
        }

        return (
          <div className="flex items-center gap-1" key={step.id}>
            {stepElement}
            {!isLastStep && (
              <CaretRight className="w-3 h-3 text-neutral-400" weight="bold" />
            )}
          </div>
        )
      })}
    </div>
  )
}