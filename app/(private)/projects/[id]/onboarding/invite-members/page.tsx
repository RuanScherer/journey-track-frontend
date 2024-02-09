import { BackButton } from "@/components/BackButton";
import { Stepper } from "@/components/Stepper";
import { backendServerSideClient } from "@/config/api/backend";
import { ShowProjectResponseDTO } from "@/shared/dto/projects/ShowProjectResponseDTO";
import { showToast } from "@/shared/utils/toast";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { InviteMembersConfirmation } from "./_components/InviteMembersConfirmation";
import { InviteMembersForm } from "./_components/InviteMembersForm";
import { InviteMembersProvider } from "./_contexts/InviteMembersContext";

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

export default async function ProjectOnboardingInviteMembersPage({ params }: ProjectPageProps) {
  const project = await getProject(params.id)

  if (!project) {
    showToast("Sorry, we couldn't find the project you were looking for.", "error")
    return redirect("/projects")
  }

  return (
    <main className="grid grid-cols-12 gap-3 my-5 mx-auto p-2 max-w-5xl">
      <div className="col-span-12">
        <BackButton />
      </div>

      <div className="col-span-12 flex justify-center">
        <Stepper
          showDots={false}
          steps={[
            {
              id: "create-project",
              label: "Create a project",
              active: false,
            },
            {
              id: "invite-members",
              label: "Invite members",
              active: true,
            },
          ]}
        />
      </div>

      <InviteMembersProvider projectId={project.id}>
        <div className="col-span-9 py-5">
          <h1 className="text-4xl font-bold">
            Invite members to {project.name}
          </h1>
          <p className="mt-5 leading-snug text-neutral-700 text-justify">
            Invite your team members to join and collaborate on your project. You
            can invite as many members as you want. They will be able to see all
            the events tracked by your project.
          </p>

          <InviteMembersForm />
        </div>

        <div className="col-span-3 py-5 pl-5 border-l border-gray-300 h-fit">
          <InviteMembersConfirmation />
        </div>
      </InviteMembersProvider>
    </main>
  )
}