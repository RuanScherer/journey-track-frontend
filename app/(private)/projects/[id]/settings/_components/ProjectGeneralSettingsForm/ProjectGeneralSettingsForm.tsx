"use client"

import { Input } from "@/components/Input"
import { ShowProjectResponseDTO } from "@/shared/dto/projects/ShowProjectResponseDTO"
import { BackendErrorUtils } from "@/shared/utils/backendError"
import { showToast } from "@/shared/utils/toast"
import { useEffect } from "react"
import { useFormState } from "react-dom"
import { editProject } from "../../_actions/editProject"
import { SubmitButton } from "./SubmitButton"

interface ProjectGeneralSettingsFormProps {
  project: ShowProjectResponseDTO
}

export function ProjectGeneralSettingsForm({ project }: ProjectGeneralSettingsFormProps) {
  const [state, formAction] = useFormState(editProject, undefined)

  useEffect(() => {
    if (state?.status === "success") {
      showToast("Project updated successfully", "success")
    }

    if (!state?.serverError) return
    BackendErrorUtils.showToast("edit_project", state.serverError)
  }, [state])

  return (
    <form
      action={formAction}
      className="max-w-md flex flex-col items-stretch gap-3"
    >
      {/* used to send the project id to the server action */}
      <input
        name="id"
        type="hidden"
        value={project.id}
      />

      <Input.Raw
        label="Name"
        id="name"
        name="name"
        placeholder="Your name"
        type="text"
        defaultValue={project.name}
        className="bg-gray-200 bg-opacity-70"
        errorMessage={state?.formErrors?.["name"]?.[0]}
      />

      <SubmitButton />
    </form>
  )
}