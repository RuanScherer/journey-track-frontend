import { Plus } from "@phosphor-icons/react/dist/ssr"
import { MembersTabsView } from "./_components/MembersTabsView"
import Link from "next/link"

interface ProjectMembersSettingsPageProps {
  params: {
    id: string
  }
}

export default async function ProjectMembersSettings({ params }: ProjectMembersSettingsPageProps) {
  return (
    <div className="flex flex-col items-stretch gap-2">
      <section className="flex items-center justify-between gap-1">
        <h1 className="text-2xl font-medium">Members</h1>

        <Link
          href={`/projects/${params.id}/invite-members`}
          className="flex items-center gap-1 text-sm font-medium px-1.5 py-1 rounded hover:bg-primary-100 hover:text-primary-500 transition"
        >
          <Plus weight="bold" />
          Invite members
        </Link>
      </section>

      <section className="mt-1">
        <MembersTabsView projectId={params.id} />
      </section>
    </div>
  )
}
