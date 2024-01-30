"use client"

import { backendClient } from "@/config/api/backend"
import { ListProjectByMemberResponseDTO } from "@/shared/dto/projects/ListProjectByMemberResponseDTO"
import { createContext, useContext, useState } from "react"
import { ProjectsViewContextData, ProjectsViewProviderProps } from "./ProjectsViewContext.types"

const ProjectsViewContext = createContext({} as ProjectsViewContextData)

export function ProjectsViewProvider(props: ProjectsViewProviderProps) {
  const [projects, setProjects] = useState<ListProjectByMemberResponseDTO>(props.projects)

  async function refetchProjects() {
    const response = await backendClient.get<ListProjectByMemberResponseDTO>("/v1/projects")
    setProjects(response.data)
  }

  return (
    <ProjectsViewContext.Provider value={{ projects, refetchProjects }}>
      {props.children}
    </ProjectsViewContext.Provider>
  )
}

export function useProjectsView() {
  return useContext(ProjectsViewContext)
}