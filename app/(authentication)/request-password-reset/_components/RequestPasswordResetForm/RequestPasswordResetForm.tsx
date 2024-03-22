"use client"

import { Input } from "@/components/Input"
import { backendClient } from "@/config/api/backend"
import { BackendErrorUtils } from "@/shared/utils/backendError"
import { showDefaultErrorToast } from "@/shared/utils/toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { FormProvider, useForm } from "react-hook-form"
import * as z from "zod"

interface FormData {
  email: string
}

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
})

export function RequestPasswordResetForm() {
  const router = useRouter()
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })

  async function handleRequestPasswordReset(data: FormData) {
    try {
      await backendClient.post("/v1/users/request-password-reset", data)
      router.push("/password-reset-requested")
    } catch (error) {
      if (error instanceof AxiosError) {
        BackendErrorUtils.showToast("request_password_reset", error.response?.data?.code)
      } else {
        showDefaultErrorToast()
      }
      console.error(error)
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleRequestPasswordReset)} className="flex flex-col items-stretch gap-3 w-[350] max-w-full">
        <Input.WithValidation
          name="email"
          label="Email"
          type="text"
          placeholder="example@example.com"
        />

        <button type="submit" className="text-neutral-50 bg-primary-400 rounded p-2 mt-2 hover:bg-primary-500 transition">
          Send
        </button>
      </form>
    </FormProvider>
  )
}