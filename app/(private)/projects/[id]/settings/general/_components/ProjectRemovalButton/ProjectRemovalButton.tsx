"use client"

import { backendClient } from "@/config/api/backend"
import { BackendErrorUtils } from "@/shared/utils/backendError"
import { showDefaultErrorToast } from "@/shared/utils/toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { CircleNotch, X } from "@phosphor-icons/react"
import * as Dialog from "@radix-ui/react-dialog"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as zod from "zod"

interface ProjectRemovalButtonProps {
  project: {
    id: string
    name: string
  }
}

interface FormData {
  name: string
}

const formSchema = zod.object({
  name: zod.string(),
})

export function ProjectRemovalButton(props: ProjectRemovalButtonProps) {
  const { register, formState: { errors }, handleSubmit, setError, watch, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })
  const projectName = watch("name")
  const [isRemoving, setIsRemoving] = useState(false)
  const router = useRouter()

  async function handleRemoveProject(data: FormData) {
    if (data.name !== props.project.name) {
      setError("name", { message: "The project name is incorrect" })
      return
    }

    try {
      setIsRemoving(true)
      await backendClient.delete(`v1/projects/${props.project.id}`)
      router.replace("/home")
    } catch (error) {
      if (error instanceof AxiosError) {
        BackendErrorUtils.showToast("delete_project", error.response?.data?.code)
      } else {
        showDefaultErrorToast()
      }
      console.error(error)
    } finally {
      setIsRemoving(false)
    }
  }

  return (
    <>
      <Dialog.Root onOpenChange={(isOpen) => !isOpen && reset()}>
        <Dialog.Trigger asChild>
          <button className="w-fit text-sm text-red-500 bg-red-100 rounded px-3 py-2 mt-3 hover:bg-red-200 transition">
            Delete project
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />

          <Dialog.Content className="DialogContent max-w-lg">
            <Dialog.Title className="DialogTitle">
              Confirm project deletion
            </Dialog.Title>

            <Dialog.Description className="DialogDescription">
              If you confirm this action the project will be deleted and it will be impossible to recover it.
            </Dialog.Description>

            <Dialog.Description className="DialogDescription">
              Enter the project name (<b>{props.project.name}</b>) and click the button below to confirm the deletion.
            </Dialog.Description>

            <form onSubmit={handleSubmit(handleRemoveProject)} className="flex flex-col items-stretch mt-4">
              <input
                type="text"
                placeholder="Project name"
                className="w-full bg-neutral-100 rounded px-3 py-2 focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50 transition-all"
                {...register("name")}
              />
              {errors.name && <span className="text-xs text-red-500 w-full mt-1">{errors.name.message as string}</span>}

              {isRemoving ? (
                <CircleNotch className="self-end animate-spin w-6 h-6 mt-4 mr-2 text-red-500" weight="bold" />
              ) : (
                <button
                  type="submit"
                  className="self-end font-medium text-center text-neutral-50 mt-4 px-3 py-2 bg-red-500 rounded hover:bg-red-600 transition-all disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                  disabled={projectName !== props.project.name}
                >
                  Confirm
                </button>
              )}
            </form>

            <Dialog.Close asChild>
              <button className="DialogCloseButton" aria-label="Close">
                <X />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}