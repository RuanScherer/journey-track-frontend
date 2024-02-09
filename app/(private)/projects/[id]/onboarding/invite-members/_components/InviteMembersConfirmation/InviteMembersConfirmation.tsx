"use client"

import { BackendErrorUtils } from "@/shared/utils/backendError"
import { showDefaultErrorToast, showToast } from "@/shared/utils/toast"
import { PaperPlaneTilt, X } from "@phosphor-icons/react"
import { AxiosError } from "axios"
import { useParams, useRouter } from "next/navigation"
import { useInviteMembers } from "../../_contexts/InviteMembersContext"

export function InviteMembersConfirmation() {
  const router = useRouter()
  const routeParams = useParams<{ id: string }>()
  const { selectedUsersToInvite, unselectUserToInvite, sendInvitations } = useInviteMembers()

  async function handleSendInvitations() {
    try {
      await sendInvitations()
      showToast("Invitations sent successfully!", "success")
      router.push(`/projects/${routeParams.id}`)
    } catch (error) {
      if (error instanceof AxiosError) {
        BackendErrorUtils.showToast("create_project", error)
      } else {
        showDefaultErrorToast()
      }
      console.error(error)
    }
  }

  return (
    <>
      <h2>People to invite</h2>

      {selectedUsersToInvite.length === 0 &&
        <>
          <p className="text-gray-500 text-sm leading-tight mt-2">
            Add someone from the search results to appear here.
          </p>
          <p className="text-gray-500 text-sm leading-tight mt-2">
            Then, check your list and confirm to send the invitations.
          </p>
        </>
      }

      {selectedUsersToInvite.length > 0 &&
        <>
          <ul className="mt-2">
            {selectedUsersToInvite.map((user) => (
              <li key={user.id} className="flex items-center justify-between gap-0.5 border-b border-b-gray-200 last:border-b-0">
                <div className="py-1 my-1">
                  <h3 className="text-sm leading-tight">{user.name}</h3>
                  <p className="text-xs text-neutral-500 leading-snug break-all">{user.email}</p>
                </div>

                <button
                  onClick={() => unselectUserToInvite(user)}
                  className="flex items-center justify-center text-red-500 w-6 h-6 rounded bg-red-100 hover:bg-red-200 transition-all"
                >
                  <X weight="bold" />
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={handleSendInvitations}
            className="flex items-center justify-center w-full gap-1 text-sm text-center text-neutral-50 p-1.5 mt-2.5 bg-primary-400 rounded hover:bg-primary-500 transition-all"
          >
            <PaperPlaneTilt size={16} weight="bold" />
            Send invitations
          </button>
        </>
      }
    </>
  )
}