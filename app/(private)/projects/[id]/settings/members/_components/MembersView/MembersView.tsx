"use client"

import { backendClient } from "@/config/api/backend";
import { ShowProjectResponseDTO } from "@/shared/dto/projects/ShowProjectResponseDTO";
import { BackendErrorUtils } from "@/shared/utils/backendError";
import { useEffect, useState } from "react";

interface MembersViewProps {
  projectId: string
}

export function MembersView(props: MembersViewProps) {
  const [project, setProject] = useState<ShowProjectResponseDTO>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getProjectMembers(projectId: string) {
      setIsLoading(true)
      try {
        const response = await backendClient.get<ShowProjectResponseDTO>(`/v1/projects/${projectId}`)
        const project = response.data
        project.members = project.members.sort((a, b) => {
          // sort by owner first, then by name
          if (a.id === project.owner_id) return -1
          if (b.id === project.owner_id) return 1
          return a.name.localeCompare(b.name)
        })
        setProject(response.data)
      } catch (error: any) {
        BackendErrorUtils.showToast("show_project", error.response?.data?.code)
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    getProjectMembers(props.projectId)
  }, [props.projectId])

  if (isLoading) {
    return (
      <ul className="space-y-1 animate-pulse">
        <li className="h-8 bg-gray-200 rounded"></li>
        <li className="h-8 bg-gray-200 rounded"></li>
        <li className="h-8 bg-gray-200 rounded"></li>
      </ul>
    )
  }

  return (
    <ul className="flex flex-col items-stretch border-y-2 border-gray-200 py-1">
      {project?.members.map(member => (
        <div className="group" key={member.id}>
          <li className="flex items-center gap-1.5 text-sm rounded p-2 cursor-default hover:bg-gray-100 transition">
            {member.name}
            {member.id === project.owner_id && (
              <span className="text-xs font-medium text-secondary-500">
                Owner
              </span>
            )}
          </li>

          <hr className="border-t-2 border-gray-200 my-1 group-last:hidden" />
        </div>
      ))}
    </ul>
  )
}
