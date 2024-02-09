export interface ShowProjectResponseDTO {
  id: string;
  name: string;
  owner_id: string;
  members: ProjectMember[];
}

interface ProjectMember {
  id: string;
  name: string;
  email: string;
}