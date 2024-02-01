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
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

const formSchema = z.object({
  name: z.string().min(1, { message: "Please enter your name" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Please enter the password" }),
  passwordConfirmation: z.string().min(1, { message: "Please enter the password confirmation" })
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Password confirmation must match the password",
  path: ["passwordConfirmation"]
})

export function SignUpForm() {
  const router = useRouter()
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })

  async function handleSignUp(data: FormData) {
    const { passwordConfirmation, ...payload } = data
    try {
      await backendClient.post("/v1/users/register", payload)
      router.push("/verify-account-advice")
    } catch (error) {
      if (error instanceof AxiosError) {
        BackendErrorUtils.showToast("register_user", error)
      } else {
        showDefaultErrorToast()
      }
      console.error(error)
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSignUp)} className="flex flex-col items-stretch gap-3 w-[350px] max-w-full">
        <Input
          name="name"
          label="Name"
          type="text"
          placeholder="John Doe"
        />

        <Input
          name="email"
          label="Email"
          type="text"
          placeholder="example@example.com"
        />

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
          Create account
        </button>
      </form>
    </FormProvider>
  )
}