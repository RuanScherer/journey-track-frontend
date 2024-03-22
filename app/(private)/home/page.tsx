import { backendServerSideClient } from "@/config/api/backend"
import { ListProjectByMemberResponseDTO } from "@/shared/dto/projects/ListProjectByMemberResponseDTO"
import { Plus } from "@phosphor-icons/react/dist/ssr"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { ProjectCreationModal } from "./_components/ProjectCreationModal"
import { ProjectsList } from "./_components/ProjectsList"
import { ProjectsViewProvider } from "./_contexts/ProjectsViewContext/ProjectsViewContext"

async function getProjects() {
  const response = await backendServerSideClient.get<ListProjectByMemberResponseDTO>("/v1/projects", {
    headers: {
      Cookie: cookies().toString(),
    },
  })
  return response.data
}

export default async function Home() {
  const projects = await getProjects()

  if (!projects || projects.length === 0) {
    redirect("/welcome/setup-project")
  }

  return (
    <main className="flex flex-col items-stretch my-5 mx-auto p-2 max-w-5xl">
      <ProjectsViewProvider projects={projects}>
        <div className="flex items-center justify-between gap-3 flex-wrap mb-2.5">
          <div>
            <h1 className="text-2xl font-bold">Projects</h1>
            <p className="text-sm mt-1 leading-tight text-neutral-700">
              Here are all the projects you own or are a member of.
            </p>
          </div>

          <ProjectCreationModal>
            <button className="flex items-center gap-1 w-fit text-sm text-neutral-50 px-2 py-1 bg-primary-400 rounded hover:bg-primary-500 transition-all">
              <Plus weight="bold" />
              New project
            </button>
          </ProjectCreationModal>
        </div>

        <ProjectsList />
      </ProjectsViewProvider>
    </main>
  )
}
