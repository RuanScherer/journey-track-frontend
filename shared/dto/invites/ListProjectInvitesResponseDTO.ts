import { EInvitationStatus } from "./EInvitationStatus"

export type ListProjectInvitesResponseDTO = ProjectInvite[]

export interface ProjectInvite {
  id: string
  project: InviteProject
  user: InviteUser
  status: EInvitationStatus
}

export interface InviteProject {
  id: string
  name: string
}

export interface InviteUser {
  id: string
  email: string
  name: string
}
