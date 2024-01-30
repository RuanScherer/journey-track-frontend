export type ListProjectByMemberResponseDTO = ProjectByMember[]

export interface ProjectByMember {
  id: string
  name: string
  owner_id: string
}