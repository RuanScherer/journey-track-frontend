import { SearchUsersResponseDTO, UserSearchResult } from "@/shared/dto/users/SearchUsersResponseDTO"

export interface InviteMembersContextData {
  handleSearchUsers: (data: UserSearchParams) => Promise<void>
  searchResults?: SearchUsersResponseDTO
  selectUserToInvite: (user: UserSearchResult) => void
  unselectUserToInvite: (user: UserSearchResult) => void
  selectedUsersToInvite: UserSearchResult[]
  sendInvitations: () => Promise<void>
}

export interface UserSearchParams {
  excludedProjectIds?: string[]
  email?: string
}

export interface InviteMembersProviderProps {
  children: React.ReactNode
  projectId: string
}
