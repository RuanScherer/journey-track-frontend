import { EInvitationStatus } from "./EInvitationStatus"

export interface ShowInvitationByProjectAndTokenResponseDTO {
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