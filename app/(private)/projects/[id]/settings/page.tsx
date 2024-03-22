import { redirect } from "next/navigation"
import { getProject } from "./_cache/getProject"

interface ProjectSettingsPageProps {
  params: {
    id: string
  }
}

export default async function ProjectSettings({ params }: ProjectSettingsPageProps) {
  const project = await getProject(params.id)

  if (!project) {
    return redirect(`/projects`)
  }

  if (!project.is_owner) {
    return redirect(`/projects/${params.id}`)
  }

  return redirect(`/projects/${params.id}/settings/general`)
}