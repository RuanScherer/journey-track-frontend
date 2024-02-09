"use client"

import { backendClient } from "@/config/api/backend";
import { SearchUsersResponseDTO, UserSearchResult } from "@/shared/dto/users/SearchUsersResponseDTO";
import { showToast } from "@/shared/utils/toast";
import { createContext, useContext, useState } from "react";
import { InviteMembersContextData, InviteMembersProviderProps, UserSearchParams } from "./InviteMembersContext.types";

const InviteMembersContext = createContext({} as InviteMembersContextData);

export function InviteMembersProvider({ children, projectId }: InviteMembersProviderProps) {
  const [searchResults, setSearchResults] = useState<SearchUsersResponseDTO>()
  const [selectedUsersToInvite, setSelectedUsersToInvite] = useState<UserSearchResult[]>([])

  async function handleSearchUsers(data: UserSearchParams) {
    try {
      const response = await backendClient.get<SearchUsersResponseDTO>(`v1/users/search`, {
        params: {
          email: data.email,
          page: 1, // fixed so user need to aprimorate the search, no pagination
          page_size: 10,
        }
      })
      setSearchResults(response.data)
    } catch (error) {
      console.error(error)
      showToast("Sorry, we ran into an error while searching for users. Please, try again.", "error")
    }
  }

  function selectUserToInvite(user: UserSearchResult) {
    const userAlreadySelected = selectedUsersToInvite.findIndex(selectedUser => selectedUser.id === user.id) > -1
    if (userAlreadySelected) return

    setSelectedUsersToInvite(selectedUsersToInvite => [...selectedUsersToInvite, user])
  }

  function unselectUserToInvite(user: UserSearchResult) {
    const isUserSelected = selectedUsersToInvite.findIndex(selectedUser => selectedUser.id === user.id) > -1
    if (!isUserSelected) return

    setSelectedUsersToInvite(selectedUsersToInvite =>
      selectedUsersToInvite.filter(selectedUser => selectedUser.id !== user.id)
    )
  }

  async function sendInvitations() {
    await backendClient.post(`v1/projects/${projectId}/invite`, {
      users: selectedUsersToInvite.map(user => user.id)
    })
  }

  return (
    <InviteMembersContext.Provider value={{
      handleSearchUsers,
      searchResults,
      selectUserToInvite,
      unselectUserToInvite,
      selectedUsersToInvite,
      sendInvitations
    }}>
      {children}
    </InviteMembersContext.Provider>
  )
}

export function useInviteMembers() {
  return useContext(InviteMembersContext)
}
