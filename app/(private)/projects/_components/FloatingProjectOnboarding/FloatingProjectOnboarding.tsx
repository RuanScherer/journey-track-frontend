"use client"

import { backendClient } from "@/config/api/backend";
import { GetProjectStatsResponseDTO } from "@/shared/dto/projects/GetProjectStatsResponseDTO";
import { PlayCircle } from "@phosphor-icons/react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { useEffect, useState } from "react";
import { FloatingProjectOnboardingProps } from "./FloatingProjectOnboarding.types";
import { OnboardingStepButton } from "./OnboardingStepButton";

const STEPS_COUNT = 2

export function FloatingProjectOnboarding(props: FloatingProjectOnboardingProps) {
  const [onboardingStatus, setOnboardingStatus] = useState<GetProjectStatsResponseDTO>()
  useEffect(() => {
    async function getProjectOnboardingStatus(projectId: string) {
      try {
        const response = await backendClient.get<GetProjectStatsResponseDTO>(`v1/projects/${projectId}/stats`)
        setOnboardingStatus(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    getProjectOnboardingStatus(props.projectId)
  }, [props.projectId])

  if (!onboardingStatus) return null

  function getCompletedStepsCount() {
    let count = 0
    if (onboardingStatus!.events_count > 0) count++
    if (onboardingStatus!.invites_count > 0) count++
    return count
  }

  if (getCompletedStepsCount() === STEPS_COUNT) return null

  return (
    <Collapsible.Root className="fixed bottom-5 right-5 group">
      <Collapsible.Content className="CollapsibleContent">
        <div className="flex flex-col items-stretch gap-1 p-1 bg-white border border-gray-200 rounded-t shadow">
          <OnboardingStepButton
            isCompleted={onboardingStatus.events_count > 0}
            title="Track your first event"
            description="Use the SDK to track your first event"
            link={`/projects/${props.projectId}/onboarding/track-event`}
          />

          <OnboardingStepButton
            isCompleted={onboardingStatus.invites_count > 0}
            title="Invite members"
            description="Invite your team members to collaborate"
            link={`/projects/${props.projectId}/onboarding/invite-members`}
          />
        </div>
      </Collapsible.Content >

      <Collapsible.Trigger asChild>
        <button className="flex items-center gap-2 p-2.5 text-sm w-full text-white bg-primary-500 rounded shadow-md hover:bg-primary-600 group-data-[state=open]:rounded-b group-data-[state=open]:rounded-t-none transition-all">
          <PlayCircle size={24} weight="bold" />
          <div className="flex flex-col items-start gap-0.5">
            <span className="font-medium">Get started</span>
            <span className="text-xs font-normal leading-none">
              {getCompletedStepsCount()} of {STEPS_COUNT} steps completed
            </span>
          </div>
        </button>
      </Collapsible.Trigger>
    </Collapsible.Root >
  )
}