"use client"

import { backendClient } from "@/config/api/backend"
import { ListProjectInvitesResponseDTO, ProjectInvite } from "@/shared/dto/invites/ListProjectInvitesResponseDTO"
import { BackendErrorUtils } from "@/shared/utils/backendError"
import { showToast } from "@/shared/utils/toast"
import { X } from "@phosphor-icons/react/dist/ssr"
import { useEffect, useState } from "react"

export interface InvitationsViewProps {
  projectId: string
}

export function InvitationsView(props: InvitationsViewProps) {
  const [invitations, setInvitations] = useState<ListProjectInvitesResponseDTO>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getProjectInvites(props.projectId)
  }, [props.projectId])

  async function getProjectInvites(projectId: string) {
    setIsLoading(true)
    try {
      const response = await backendClient.get<ListProjectInvitesResponseDTO>(`/v1/projects/${projectId}/invites?status=pending`)
      setInvitations(response.data)
    } catch (error: any) {
      BackendErrorUtils.showToast("list_project_invites", error.response?.data?.code)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleRevokeInvite(invite: ProjectInvite) {
    try {
      await backendClient.delete(`/v1/projects/invites/${invite.id}/revoke`)
      showToast(`The invitation for ${invite.user.name} has been revoked`, "success")

      getProjectInvites(props.projectId)
    } catch (error: any) {
      BackendErrorUtils.showToast("revoke_invite", error.response?.data?.code)
      console.error(error)
    }
  }

  if (isLoading) {
    return (
      <ul className="space-y-1 animate-pulse">
        <li className="h-8 bg-gray-200 rounded"></li>
        <li className="h-8 bg-gray-200 rounded"></li>
        <li className="h-8 bg-gray-200 rounded"></li>
      </ul>
    )
  }

  if (invitations?.length === 0) {
    return (
      <>
        <p className="text-gray-500 text-sm">
          Hmm... It looks like there are no invitations to this project.
        </p>
        <p className="text-gray-500 text-sm">
          Try inviting someone to collaborate!
        </p>
      </>
    )
  }

  return (
    <ul className="flex flex-col items-stretch border-y-2 border-gray-200 py-1">
      {invitations?.map(invitation => (
        <div className="group" key={invitation.id}>
          <li className="flex items-center justify-between gap-1.5 text-sm rounded p-2 cursor-default hover:bg-gray-100 transition">
            <div className="flex items-center flex-wrap gap-1.5">
              {invitation.user.name}
              <span className="text-xs text-gray-700">({invitation.user.email})</span>
            </div>

            <button
              className="inline-flex gap-0.5 text-xs font-medium text-gray-700 hover:text-red-500 transition"
              onClick={() => handleRevokeInvite(invitation)}
            >
              <X className="w-4 h-4" weight="bold" />
              Revoke
            </button>
          </li>

          <hr className="border-t-2 border-gray-200 my-1 group-last:hidden" />
        </div>
      ))}
    </ul>
  )
}
