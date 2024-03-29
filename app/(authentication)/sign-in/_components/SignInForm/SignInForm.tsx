"use client"

import { Input } from "@/components/Input"
import { useSession } from "@/contexts/Session"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import * as z from "zod"

interface FormData {
  email: string
  password: string
}

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Please enter the password" }),
})

export function SignInForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })
  const session = useSession()

  async function handleSignIn(data: FormData) {
    session?.signIn(data.email, data.password)
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSignIn)} className="flex flex-col items-stretch gap-3 w-[350px] max-w-full">
        <Input.WithValidation
          name="email"
          label="Email"
          type="text"
          placeholder="example@example.com"
        />

        <Input.WithValidation
          name="password"
          label="Password"
          type="password"
          placeholder="Your secret password"
        />

        <button type="submit" className="text-neutral-50 bg-primary-400 rounded p-2 mt-2 hover:bg-primary-500 transition">
          Sign in
        </button>
      </form>
    </FormProvider>
  )
}