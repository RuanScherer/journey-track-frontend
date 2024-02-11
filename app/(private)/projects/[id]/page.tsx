import { BackButton } from "@/components/BackButton"
import { backendServerSideClient } from "@/config/api/backend"
import { ShowProjectResponseDTO } from "@/shared/dto/projects/ShowProjectResponseDTO"
import { showToast } from "@/shared/utils/toast"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { FloatingProjectOnboarding } from "../_components/FloatingProjectOnboarding"
import { ProjectSettingsLink } from "./_components/ProjectSettingsLink"

interface ProjectPageProps {
  params: {
    id: string
  }
}

async function getProject(projectId: string) {
  const response = await backendServerSideClient.get<ShowProjectResponseDTO>(`v1/projects/${projectId}`, {
    headers: {
      Cookie: cookies().toString(),
    },
  })
  return response.data
}

export default async function Project({ params }: ProjectPageProps) {
  const project = await getProject(params.id)

  if (!project) {
    showToast("Sorry, we couldn't find the project you were looking for.", "error")
    return redirect("/projects")
  }

  return (
    <main className="flex flex-col items-stretch my-5 mx-auto p-2 max-w-5xl">
      <BackButton />

      <header className="flex items-center justify-between gap-2 mt-2">
        <div>
          <span className="text-sm text-gray-700 font-medium">Project</span>
          <h1 className="text-3xl font-bold leading-none">{project.name}</h1>
        </div>

        <ProjectSettingsLink project={project} />
      </header>

      <FloatingProjectOnboarding projectId={project.id} />
    </main>
  )
}