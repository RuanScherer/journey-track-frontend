import { getProject } from "../_cache/getProject"
import { ProjectGeneralSettingsForm } from "../_components/ProjectGeneralSettingsForm"
import { ProjectRemovalButton } from "./_components/ProjectRemovalButton"

interface ProjectGeneralSettingsPageProps {
  params: {
    id: string
  }
}

export default async function ProjectGeneralSettings({ params }: ProjectGeneralSettingsPageProps) {
  const project = await getProject(params.id)

  if (!project) {
    return (
      <div className="flex flex-col items-stretch gap-4">
        <h1 className="text-2xl font-medium">General</h1>

        <div className="max-w-md flex flex-col items-stretch gap-3">
          <div className="w-full h-8 bg-gray-200 rounded animate-pulse" />

          <div className="mt-3 w-32 h-8 bg-gray-200 rounded animate-pulse" />
        </div>

        <hr className="border-t-2 border-neutral-200" />

        <section>
          <h2 className="text-xl font-medium text-red-500">
            Danger zone
          </h2>

          <p className="text-sm text-gray-600">
            Once you delete a project, there is no going back. Please be certain.
          </p>

          <div className="mt-3 w-32 h-8 bg-gray-200 rounded animate-pulse" />
        </section>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-stretch gap-4">
      <h1 className="text-2xl font-medium">General</h1>

      <section>
        <ProjectGeneralSettingsForm project={project} />
      </section>

      <hr className="border-neutral-200" />

      <section>
        <h2 className="text-xl font-medium text-red-500">
          Danger zone
        </h2>

        <p className="text-sm text-gray-600">
          Once you delete a project, there is no going back. Please be certain.
        </p>

        <div className="max-w-md flex flex-col items-stretch gap-3">
          <ProjectRemovalButton project={project} />
        </div>
      </section>
    </div>
  )
}
