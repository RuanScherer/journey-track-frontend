import { Stepper } from "@/components/Stepper";
import { CreateProjectForm } from "./_components/CreateProjectForm";

export default function SetupProject() {
  return (
    <main className="flex flex-col items-center my-10 mx-auto p-2 max-w-2xl">
      <Stepper
        steps={[
          {
            id: "create-account",
            label: "Create an account",
            active: false,
          },
          {
            id: "create-project",
            label: "Create a project",
            active: true,
          },
        ]}
      />

      <div className="flex flex-col items-stretch mt-10">
        <h1 className="text-4xl font-bold text-center">
          Set up Trackr
        </h1>
        <p className="mt-5 leading-snug text-neutral-700">
          Start by creating a project. Once you have a project, you can track events and invite your team members to collaborate.
        </p>

        <CreateProjectForm />
      </div>
    </main>
  )
}