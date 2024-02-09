"use client"

import { backendClient } from "@/config/api/backend"
import { useSession } from "@/contexts/Session"
import { BackendErrorUtils } from "@/shared/utils/backendError"
import { showDefaultErrorToast } from "@/shared/utils/toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import * as zod from "zod"

interface FormData {
  name: string
}

const formSchema = zod.object({
  name: zod.string().min(1, "Please enter a name for your project"),
})

export function CreateProjectForm() {
  const session = useSession()
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  async function handleCreateProject(data: FormData) {
    try {
      await backendClient.post("/v1/projects/create", {
        name: data.name,
        owner_id: session?.user?.id,
      })
      router.replace("/home")
    } catch (error) {
      if (error instanceof AxiosError) {
        BackendErrorUtils.showToast("create_project", error)
      } else {
        showDefaultErrorToast()
      }
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleCreateProject)} className="flex items-center justify-stretch flex-wrap gap-x-2 mt-6">
      <label htmlFor="name" className="w-full text-sm text-neutral-600 mb-1">
        Give a name to your project
      </label>
      <input
        type="text"
        id="name"
        placeholder="My awesome project"
        className="flex-1 font-normal text-lg bg-neutral-100 rounded p-3 focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50 transition-all"
        {...register("name")}
      />

      <button className="text-lg text-center text-neutral-50 p-3 bg-primary-400 rounded hover:bg-primary-500 transition-all">
        Go!
      </button>

      {errors.name && <span className="text-xs text-red-500 w-full mt-1">{errors.name.message as string}</span>}

      <span className="w-full text-xs text-neutral-500 text-center font-light mt-1.5">
        Don't worry, you can create as many projects as you want later.
      </span>
    </form>
  )
}