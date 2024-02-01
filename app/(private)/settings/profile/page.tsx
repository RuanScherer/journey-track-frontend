"use client"

import { Input } from "@/components/Input";
import { backendClient } from "@/config/api/backend";
import { useSession } from "@/contexts/Session";
import { BackendErrorUtils } from "@/shared/utils/backendError";
import { showDefaultErrorToast, showToast } from "@/shared/utils/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as zod from "zod";

const formSchema = zod.object({
  name: zod.string().min(1, { message: "Please enter your name" }),
  email: zod.string().email(),
})

interface FormData {
  name: string;
  email: string;
}

export default function ProfileSettings() {
  const session = useSession()
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  useEffect(() => {
    form.reset({
      name: session?.user?.name,
      email: session?.user?.email,
    })
  }, [session?.user])

  async function handleSaveChanges(data: FormData) {
    try {
      await backendClient.put("/v1/users/edit-profile", { name: data.name })
      showToast("Your profile has been updated", "success")
      session?.refreshUserProfile()
    } catch (error) {
      if (error instanceof AxiosError) {
        BackendErrorUtils.showToast("edit_profile", error)
      } else {
        showDefaultErrorToast()
      }
      console.error(error)
    }
  }

  if (!session?.user) {
    return (
      <div className="flex flex-col items-stretch">
        <h1 className="text-2xl font-medium">Profile</h1>

        <div className="max-w-md mt-4 flex flex-col items-stretch gap-3">
          <div className="w-full h-8 bg-gray-200 rounded animate-pulse" />
          <div className="w-full h-8 bg-gray-200 rounded animate-pulse" />

          <div className="mt-3 w-32 h-8 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-stretch">
      <h1 className="text-2xl font-medium">Profile</h1>

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(handleSaveChanges)}
          className="max-w-md mt-4 flex flex-col items-stretch gap-3"
        >
          <Input
            label="Name"
            name="name"
            placeholder="Your name"
            type="text"
            className="bg-gray-200 bg-opacity-70"
          />

          <Input
            label="Email"
            name="email"
            placeholder="Your email address"
            type="email"
            className="bg-gray-200 bg-opacity-70 text-gray-400"
            disabled
          />

          <button
            type="submit"
            className="w-fit text-sm text-neutral-50 bg-primary-400 rounded px-3 py-2 mt-3 hover:bg-primary-500 transition disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
            disabled={!form.formState.isDirty}
          >
            Save changes
          </button>
        </form>
      </FormProvider>
    </div>
  )
}