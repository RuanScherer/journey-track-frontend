"use client"

import { Input } from "@/components/Input"
import { backendClient } from "@/config/api/backend"
import { BackendErrorUtils } from "@/shared/utils/backendError"
import { showDefaultErrorToast, showToast } from "@/shared/utils/toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { useRouter, useSearchParams } from "next/navigation"
import { FormProvider, useForm } from "react-hook-form"
import * as z from "zod"

interface FormData {
  password: string
  passwordConfirmation: string
}

const formSchema = z.object({
  password: z.string().min(1, { message: "Please enter the password" }),
  passwordConfirmation: z.string().min(1, { message: "Please enter the password confirmation" })
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Password confirmation must match the password",
  path: ["passwordConfirmation"]
})

export function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })

  async function handleResetPassword(data: FormData) {
    const { password } = data
    const token = searchParams.get("token")
    const userId = searchParams.get("userId")

    if (!token || !userId) {
      showToast("Hey, the link you used to reset your password is invalid.", "error")
      return
    }

    try {
      await backendClient.patch(`/v1/users/${userId}/reset-password/${token}`, { password })
      showToast("Your password has been reset!", "success")
      router.replace("/sign-in")
    } catch (error) {
      if (error instanceof AxiosError) {
        BackendErrorUtils.showToast("reset_password", error)
      } else {
        showDefaultErrorToast()
      }
      console.error(error)
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleResetPassword)} className="flex flex-col items-stretch gap-3 w-[350px] max-w-full">
        <Input
          name="password"
          label="Password"
          type="password"
          placeholder="Your secret password"
        />

        <Input
          name="passwordConfirmation"
          label="Password confirmation"
          type="password"
          placeholder="Confirm your secret password"
        />

        <button type="submit" className="text-neutral-50 bg-primary-400 rounded p-2 mt-2 hover:bg-primary-500 transition">
          Confirm
        </button>
      </form>
    </FormProvider>
  )
}