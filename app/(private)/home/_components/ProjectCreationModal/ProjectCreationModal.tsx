"use client"

import { backendClient } from "@/config/api/backend";
import { useSession } from "@/contexts/Session";
import { BackendErrorUtils } from "@/shared/utils/backendError";
import { showDefaultErrorToast } from "@/shared/utils/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleNotch, X } from "@phosphor-icons/react";
import * as Dialog from '@radix-ui/react-dialog';
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { useProjectsView } from "../../_contexts/ProjectsViewContext/ProjectsViewContext";

interface FormData {
  name: string
}

const formSchema = zod.object({
  name: zod.string().min(1, "Please enter a name for your project"),
})

export function ProjectCreationModal(props: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const session = useSession()
  const { refetchProjects } = useProjectsView()
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  async function handleCreateProject(data: FormData) {
    try {
      setIsCreating(true)
      await backendClient.post("/v1/projects/create", {
        name: data.name,
        owner_id: session?.user?.id,
      })
      await refetchProjects()
      setIsOpen(false)
    } catch (error) {
      if (error instanceof AxiosError) {
        BackendErrorUtils.showToast("create_project", error)
      } else {
        showDefaultErrorToast()
      }
      console.error(error)
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        {props.children}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />

        <Dialog.Content className="DialogContent max-w-lg">
          <Dialog.Title className="DialogTitle">
            Create a new project
          </Dialog.Title>

          <Dialog.Description>
            Give a name to your project
          </Dialog.Description>

          <form onSubmit={handleSubmit(handleCreateProject)} className="flex flex-col items-stretch mt-4">
            <input
              type="text"
              placeholder="My awesome project"
              className="w-full bg-neutral-100 rounded px-3 py-2 focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50 transition-all"
              {...register("name")}
            />
            {errors.name && <span className="text-xs text-red-500 w-full mt-1">{errors.name.message as string}</span>}

            {isCreating ? (
              <CircleNotch className="self-end animate-spin w-6 h-6 mt-4 mr-2 text-primary-400" weight="bold" />
            ) : (
              <button className="self-end font-medium text-center text-neutral-50 mt-4 px-3 py-2 bg-primary-400 rounded hover:bg-primary-500 transition-all">
                Create
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
  )
}