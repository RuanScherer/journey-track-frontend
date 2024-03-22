export interface ShowProjectResponseDTO {
  id: string;
  name: string;
  owner_id: string;
  is_owner: boolean;
  members: ProjectMember[];
}

interface ProjectMember {
  id: string;
  name: string;
  email: string;
}