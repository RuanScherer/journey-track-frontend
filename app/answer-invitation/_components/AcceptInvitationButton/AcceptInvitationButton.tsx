"use client"

import { backendClient } from "@/config/api/backend"
import { BackendErrorUtils } from "@/shared/utils/backendError"
import { showDefaultErrorToast, showToast } from "@/shared/utils/toast"
import { AxiosError } from "axios"
import { useRouter, useSearchParams } from "next/navigation"

export function AcceptInvitationButton() {
  const router = useRouter()
  const searchParams = useSearchParams()

  async function handleAcceptInvitation() {
    const projectId = searchParams.get("projectId")
    const token = searchParams.get("token")

    if (!projectId || !token) {
      showToast("Hey, the link you used to answer the invite is invalid.", "error")
      return
    }

    try {
      await backendClient.patch(`/v1/projects/${projectId}/invites/accept`, { invite_token: token })
      showToast("You have just accepted the invite!", "success")
      router.replace("/sign-in")
    } catch (error) {
      if (error instanceof AxiosError) {
        BackendErrorUtils.showToast("accept_project_invitation", error.response?.data?.code)
      } else {
        showDefaultErrorToast()
      }
      console.error(error)
    }
  }

  return (
    <button onClick={handleAcceptInvitation} className="text-neutral-50 bg-primary-400 rounded px-3 py-2 hover:bg-primary-500 transition">
      Accept invitation
    </button>
  )
}