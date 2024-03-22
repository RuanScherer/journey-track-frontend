"use client"

import { UserSearchResult } from "@/shared/dto/users/SearchUsersResponseDTO"
import { Plus, X } from "@phosphor-icons/react"
import { useInviteMembers } from "../../_contexts/InviteMembersContext"

interface UserSearchResultItemProps {
  user: UserSearchResult
}

export function UserSearchResultItem({ user }: UserSearchResultItemProps) {
  const { selectUserToInvite, unselectUserToInvite, selectedUsersToInvite } = useInviteMembers()

  const userAlreadySelected = selectedUsersToInvite.findIndex(selectedUser => selectedUser.id === user.id) > -1

  return (
    <li className="border-b border-b-gray-200 last:border-b-0">
      <div className="flex items-center justify-between gap-2 p-2 my-1 rounded hover:bg-gray-100 transition">
        <div>
          <span className="text-sm">{user.name}</span>
          <p className="text-sm text-neutral-500 leading-none">{user.email}</p>
        </div>

        {userAlreadySelected ? (
          <button
            onClick={() => unselectUserToInvite(user)}
            className="flex items-center gap-1 text-sm text-center text-red-500 px-2 py-1 rounded bg-red-100 hover:bg-red-200 transition-all"
          >
            <X weight="bold" />
            Remove
          </button>
        ) : (
          <button
            onClick={() => selectUserToInvite(user)}
            className="flex items-center gap-1 text-sm text-center text-gray-800 px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 transition-all"
          >
            <Plus weight="bold" />
            Add
          </button>
        )}
      </div>
    </li>
  )
}
