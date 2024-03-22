import { BackButton } from "@/components/BackButton";
import { ProjectSettingsNavigationBar } from "./_components/ProjectSettingsNavigationBar";

interface ProjectSettingsLayoutProps {
  children: React.ReactNode
  params: {
    id: string
  }
}

export default function ProjectSettingsLayout({ children, params }: ProjectSettingsLayoutProps) {
  return (
    <div className="my-5 mx-auto p-2 max-w-5xl">
      <BackButton />

      <div className="grid grid-cols-12 gap-5 mt-2">
        <header className="col-span-12">
          <span className="text-sm text-gray-700 font-medium">Project</span>
          <h1 className="text-3xl font-bold leading-none">Settings</h1>
        </header>

        <aside className="col-span-12 md:col-span-3 md:border-r-2 md:border-r-neutral-200">
          <ProjectSettingsNavigationBar projectId={params.id} />
        </aside>

        <main className="col-span-12 md:col-span-9 mb-5">
          {children}
        </main>
      </div>
    </div>
  )
}