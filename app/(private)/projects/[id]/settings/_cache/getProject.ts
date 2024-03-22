import { backendServerSideClient } from "@/config/api/backend"
import { ShowProjectResponseDTO } from "@/shared/dto/projects/ShowProjectResponseDTO"
import { cookies } from "next/headers"
import { cache } from "react"

export const getProject = cache(async (projectId: string) => {
  const response = await backendServerSideClient.get<ShowProjectResponseDTO>(`v1/projects/${projectId}`, {
    headers: {
      Cookie: cookies().toString(),
    },
  })
  return response.data
})
