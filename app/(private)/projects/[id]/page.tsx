import { BackButton } from "@/components/BackButton"
import { backendServerSideClient } from "@/config/api/backend"
import { ShowProjectResponseDTO } from "@/shared/dto/projects/ShowProjectResponseDTO"
import { showToast } from "@/shared/utils/toast"
import { Gear } from "@phosphor-icons/react/dist/ssr"
import { cookies } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"
import { FloatingProjectOnboarding } from "../_components/FloatingProjectOnboarding"

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

        {/* must be hidden for anyone who is not the project owner */}
        <Link
          href={`/projects/${project.id}/settings`}
          className="flex items-center gap-1 p-1.5 text-gray-700 text-sm font-medium cursor-pointer rounded bg-gray-200 hover:bg-gray-300 transition"
        >
          <Gear size={16} weight="bold" />
          Settings
        </Link>
      </header>

      <FloatingProjectOnboarding projectId={project.id} />
    </main>
  )
}