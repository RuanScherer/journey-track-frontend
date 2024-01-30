import { ListProjectByMemberResponseDTO } from "@/shared/dto/projects/ListProjectByMemberResponseDTO";

export interface ProjectsViewContextData {
  projects: ListProjectByMemberResponseDTO;
  refetchProjects: () => Promise<void>;
}

export interface ProjectsViewProviderProps {
  children: React.ReactNode;
  projects: ListProjectByMemberResponseDTO;
}